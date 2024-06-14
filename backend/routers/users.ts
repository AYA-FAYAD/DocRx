import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { users } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

// const getUserSchema = z.object({
//   id: z.number().int(),
// });

export const userRouter = router({
  getUser: publicProcedure.query(async () => {
    const allUsers = await db.select().from(users).execute();
    return allUsers;
  }),
  getUserByname: publicProcedure
    .input(
      z.object({
        userName: z.string(),
      })
    )
    .query(async ({ input }) => {
      console.log("Received input:", input);
      const user = await db
        .select()
        .from(users)
        .where(eq(users.userName, input.userName))
        .execute();
      console.log("Query result:", user);
      return user;
    }),
  getUserById: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
      })
    )
    .query(async ({ input }) => {
      console.log("Received input:", input);
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, input.id))
        .execute();
      return user;
    }),
  createUser: publicProcedure
    .input(
      z.object({
        userName: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // console.log("Received input:", input);
      const newUser = await db
        .insert(users)
        .values({
          userName: input.userName,
          password: input.password,
        })

        .execute();

      return newUser;
    }),
});
