import "dotenv/config";
import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { userRouter } from "./routers/users";
import { createContext } from "./context";
import { clerkMiddleware } from "./auth";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware);

export type AppRouter = typeof userRouter;
app.use(
  "/trpc",
  createExpressMiddleware({
    router: userRouter,
    createContext,
  })
);
// console.log(userRouter);

app.get("/", (req, res) => {
  return res.send("Hiffn!!!");
});

app.get("/trpc/createUser", (req, res) => {
  console.log("heello");

  return res.json({ data: { username: "fofo", password: "123123" } });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
