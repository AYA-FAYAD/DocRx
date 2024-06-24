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

dotenv.config();

const port = process.env.PORT || 3000;

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY;
if (!webhookSecret) {
  throw new Error(
    "CLERK_WEBHOOK_SECRET_KEY is not defined in the environment variables"
  );
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware);

export type AppRouter = typeof appRouter;
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const svixWebhook = new Webhook(webhookSecret);

    const payload = req.body;
    const headers = req.headers as Record<string, string>;

    console.log(`Payload: ${JSON.stringify(payload)}`);
    console.log(`Headers: ${JSON.stringify(headers)}`);

    let msg;
    try {
      msg = svixWebhook.verify(JSON.stringify(payload), headers);
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    console.log("Webhook verified successfully:", msg);

    const event = payload.type;

    try {
      switch (event) {
        case "user.created":
          await db
            .insert(users)
            .values({
              name: payload.data.first_name + " " + payload.data.last_name,
              email: payload.data.email_addresses[0].email_address,

              role: "defaultRole", // Use a default role
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
            .execute();
          console.log("New user created");
          break;
        case "user.updated":
          await db
            .update(users)
            .set({
              name: payload.data.first_name + " " + payload.data.last_name,
              email: payload.data.email_addresses[0].email_address,
              role: "defaultRole", // Use a default role
              updatedAt: new Date().toISOString(),
            })
            .where(
              eq(users.email, payload.data.email_addresses[0].email_address)
            )
            .execute();
          console.log("User updated");
          break;
        case "user.deleted":
          await db
            .delete(users)
            .where(
              eq(users.email, payload.data.email_addresses[0].email_address)
            )
            .execute();
          console.log("User deleted");
          break;
        case "session.created":
          // Handle session created
          console.log("New session created");
          break;
        case "session.ended":
          // Handle session ended
          console.log("Session ended");
          break;
        default:
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
