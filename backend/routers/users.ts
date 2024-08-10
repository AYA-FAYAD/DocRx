import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { doctors, patients, users } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

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
      const user = await db
        .select()
        .from(users)
        .where(eq(users.name, input.name))
        .execute();

      return user;
    }),
  getUserById: publicProcedure
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
      return user;
    }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),

        email: z.string(),
        role: z.string(),
        clerkUserId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const newUser = await db
        .insert(users)
        .values({
          name: input.name,
          clerkUserId: input.clerkUserId,
          email: input.email,
          role: input.role,
        })
        .execute();

      return newUser;
    }),
  getUserRole: publicProcedure
    .input(
      z.object({
        clerkUserId: z.string(),
      })
    )

    .query(async ({ input }) => {
      if (!input.clerkUserId) {
        throw new Error("Not authenticated");
      }

      const user = await db
        .select()
        .from(users)
        .where(eq(users.clerkUserId, input.clerkUserId))
        .execute();

      if (!user.length) {
        throw new Error("User not found");
      }

      return { role: user[0].role };
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
        clerkUserId: z.string(),
        newRole: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { clerkUserId, newRole } = input;

      const user = await db
        .select()
        .from(users)
        .where(eq(users.clerkUserId, clerkUserId))
        .execute();

      if (!user.length) {
        throw new Error("User not found");
      }

      const currentRole = user[0].role;

      if (currentRole === "defaultRole") {
        const updatedUser = await db
          .update(users)
          .set({ role: newRole })
          .where(eq(users.clerkUserId, clerkUserId))
          .execute();
        return updatedUser;
      } else {
        throw new Error("you cant updute your role");
      }

      // return user[0];
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
