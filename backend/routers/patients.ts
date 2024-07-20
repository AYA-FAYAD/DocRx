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
        patientClerkId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const patient = await db
        .select()
        .from(patients)
        .innerJoin(users, eq(patients.userId, users.id))
        .where(eq(users.clerkUserId, input.patientClerkId))
        .execute();

      if (patient.length === 0) {
        throw new Error("Patient not found");
      }

      const patientId = patient[0].patients.id;

      const prescriptionsList = await db
        .select({
          prescriptionId: prescriptions.id,
          drugName: prescriptions.drugName,
          dosage: prescriptions.dosage,

          usageInstructions: prescriptions.usageInstructions,
          createdAt: prescriptions.createdAt,
          doctorName: users.name,
        })
        .from(prescriptions)
        .innerJoin(doctors, eq(prescriptions.doctorId, doctors.id))
        .innerJoin(users, eq(doctors.userId, users.id))
        .where(eq(prescriptions.patientId, patientId))
        .execute();

      return prescriptionsList;
    }),
});
