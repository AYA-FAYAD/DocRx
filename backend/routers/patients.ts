import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { doctors, patients, users, prescriptions } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

export const patientsRouter = router({
  addpatientinfo: publicProcedure
    .input(
      z.object({
        clerkUserId: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.clerkUserId, input.clerkUserId))
        .execute();
      if (user.length === 0) {
        return new Error("User not found");
      }

      const userId = user[0].id;

      const newpatient = await db
        .insert(patients)
        .values({
          userId,
          phoneNumber: input.phoneNumber,
        })
        .execute();

      return newpatient;
    }),

  getPatientPrescrition: publicProcedure
    .input(
      z.object({
        patientId: z.number().int(),
      })
    )
    .query(async ({ input }) => {
      const prescriptionsList = await db
        .select()
        .from(prescriptions)
        .where(eq(prescriptions.patientId, input.patientId))
        .execute();

      return prescriptionsList;
    }),
});
