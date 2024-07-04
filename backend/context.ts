// import {inferAsyncReturnType} from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ClerkExpressWithAuth, getAuth } from "@clerk/clerk-sdk-node";
import { db } from "./db/db";
import { users } from "./db/schema/schema";
import { eq } from "drizzle-orm";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {};

export type Context = ReturnType<typeof createContext>;
