import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { doctors, patients, users } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { getPayload } from "../setpyload";
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
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      console.log("Received input:", input);
      const user = await db
        .select()
        .from(users)
        .where(eq(users.name, input.name))
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
        name: z.string(),
        password: z.string(),
        email: z.string(),
        role: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // console.log("Received input:", input);
      const newUser = await db
        .insert(users)
        .values({
          name: input.name,

          email: input.email,
          role: input.role,
        })

        .execute();

      return newUser;
    }),

  updateuser: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        name: z.string().optional(),

        email: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      const updateUser = await db
        .update(users)
        .set(updates)
        .where(eq(users.id, id))
        .execute();
      return updateUser;
    }),

  deleteuser: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
      })
    )
    .mutation(async ({ input }) => {
      const deleteUser = await db
        .delete(users)
        .where(eq(users.id, input.id))
        .execute();
      return deleteUser;
    }),
  upduterole: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        newRole: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = getPayload(); // Get the latest payload
      if (!payload) {
        throw new Error("No payload available");
      }
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, payload.data.email_addresses[0].email_address));
      if (!user.length) {
        throw new Error("User not found");
      }
      const currentRole = user[0].role;

      if (currentRole !== input.newRole) {
        const updatedUser = await db
          .update(users)
          .set({ role: input.newRole })
          .where(eq(users.email, payload.data.email_addresses[0].email_address))
          .execute();

        return updatedUser;
      }
      return user[0];
    }),

  getUserData: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
      })
    )
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, input.id))
        .execute();
      if (!user.length) {
        return null;
      }

      const userId = user[0].id;
      const role = user[0].role;

      let data = {};

      if (role === "doctor") {
        const doctor = await db
          .select()
          .from(doctors)
          .where(eq(doctors.userId, userId))
          .execute();

        data = { doctor: doctor[0] || null };
      } else if (role === "patient") {
        const patient = await db
          .select()
          .from(patients)
          .where(eq(patients.userId, userId))
          .execute();
        data = { patient: patient[0] || null };
      }
      return {
        user: user[0],
        ...data,
      };
    }),
});
