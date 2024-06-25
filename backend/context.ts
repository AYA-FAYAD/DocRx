// import {inferAsyncReturnType} from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ClerkExpressWithAuth, getAuth } from "@clerk/clerk-sdk-node";
import { db } from "./db/db";
import { users } from "./db/schema/schema";
import { eq } from "drizzle-orm";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return {};
  }
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .execute();
  const userRole = user?.[0]?.role || null;
  console.log(
    "Context created with userId:",
    userId,
    "and userRole:",
    userRole
  );

  return {
    userId,
    userRole,
  };
};

export type Context = ReturnType<typeof createContext>;
