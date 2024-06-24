import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { users } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { clerkMiddleware } from "../auth";
export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        role: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Create a new user in Clerk
      const clerkUser = await clerkMiddleware.users.createUser({
        emailAddress: [input.email],
        password: input.password,
      });

      // Save the user to your database
      const newUser = await db
        .insert(users)
        .values({
          name: input.name,
          email: input.email,
          password: input.password,
          role: input.role,
        })
        .execute();

      return newUser;
    }),
});
