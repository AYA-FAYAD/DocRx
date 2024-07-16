import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { db } from "./db/db";
import { users } from "./db/schema/schema";
import { eq } from "drizzle-orm";

export const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.clerkUserId) {
    throw new Error("Not authenticated");
  }
  console.log("Authenticated User ID:", ctx.clerkUserId);

  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, ctx.clerkUserId))
    .execute();

  if (!user.length) {
    throw new Error("User not found");
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.clerkUserId,
      userRole: user[0].role,
    },
  });
});

console.log(isAuthenticated);

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(isAuthenticated);
