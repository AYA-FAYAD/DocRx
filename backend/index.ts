import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index";
import { createContext } from "./context";
import { clerkMiddleware } from "./auth";
import { Webhook } from "svix";
import bodyParser from "body-parser";
import { db } from "./db/db";
import { users } from "./db/schema/schema";
import { eq } from "drizzle-orm";
import {
  ClerkExpressWithAuth,
  requireAuth,
  clerkClient,
} from "@clerk/clerk-sdk-node";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
const clerkMiddleware = ClerkExpressWithAuth({
  secretkey: process.env.CLERK_PUBLISHABLE_KEY,
});

app.use(clerkMiddleware);

export type AppRouter = typeof appRouter;
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY;
if (!webhookSecret) {
  throw new Error(
    "CLERK_WEBHOOK_SECRET_KEY is not defined in the environment variables"
  );
}

app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const svixWebhook = new Webhook(webhookSecret);

    const payload = req.body;
    const headers = req.headers;

    let msg;
    try {
      msg = svixWebhook.verify(JSON.stringify(payload), headers);
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    const event = payload.type;
    try {
      if (event === "user.created") {
        await db
          .insert(users)
          .values({
            name: payload.data.first_name + " " + payload.data.last_name,
            email: payload.data.email_addresses[0].email_address,
            role: "defaultRole", // update it later
            clerkUserId: payload.data.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          .execute();
      } else if (event === "session.created") {
        const clerkUserId = payload.data.user_id;
        if (clerkUserId) {
          const user = await db
            .select()
            .from(users)
            .where(eq(users.clerkUserId, clerkUserId))
            .execute();

          if (user.length > 0) {
            console.log(`Found user: ${JSON.stringify(user[0])}`);
            console.log("User already has a clerkUserId");
          } else {
            console.log("User not found by clerkUserId");
          }

          const clerkUser = await clerkClient.users.getUser(clerkUserId);
          if (clerkUser) {
            const email = clerkUser.emailAddresses[0].emailAddress;

            const userByEmail = await db
              .select()
              .from(users)
              .where(eq(users.email, email))
              .execute();
            if (userByEmail.length > 0) {
              const userRecord = userByEmail[0];
              console.log(`Found user by email: ${JSON.stringify(userRecord)}`);

              await db
                .update(users)
                .set({
                  clerkUserId: clerkUserId,
                  updatedAt: new Date().toISOString(),
                })
                .where(eq(users.email, email))
                .execute();

              console.log("User's clerkUserId updated");
            } else {
              console.log("User not found by email");
            }
          } else {
            console.log("Failed to fetch user details from Clerk");
          }
        } else {
          console.log("clerkUserId not found in payload");
        }
      } else if (event === "user.updated") {
        console.log("Handling user.updated event");

        await db
          .update(users)
          .set({
            name: payload.data.first_name + " " + payload.data.last_name,
            email: payload.data.email_addresses[0].email_address,
            role: "defaultRole", // Use a default role
            updatedAt: new Date().toISOString(),
          })
          .where(eq(users.email, payload.data.email_addresses[0].email_address))
          .execute();

        console.log("User updated");
      } else if (event === "user.deleted") {
        console.log("Handling user.deleted event");

        await db
          .delete(users)
          .where(eq(users.email, payload.data.email_addresses[0].email_address))
          .execute();

        console.log("User deleted");
      } else if (event === "session.ended") {
        console.log("Handling session.ended event");
        // Handle session ended
        console.log("Session ended");
      } else {
        console.log("Unhandled event type:", event);
      }
    } catch (error) {
      console.error("Database operation failed:", error);
      return res.status(500).json({ error: "Database operation failed" });
    }

    res.status(200).json({});
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
