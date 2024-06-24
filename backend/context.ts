// import {inferAsyncReturnType} from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ClerkExpressWithAuth, requireAuth } from "@clerk/clerk-sdk-node";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

export type Context = ReturnType<typeof createContext>;
