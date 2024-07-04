import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { doctors, patients, prescriptions, users } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

export const doctorsRouter = router({
  adddoctorinfo: publicProcedure
    .input(
      z.object({
        clerkUserId: z.string(),
        specialization: z.string(),
        clinicAddress: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Fetch the user using clerkUserId
      const user = await db
        .select()
        .from(users)
        .where(eq(users.clerkUserId, input.clerkUserId))
        .execute();

      if (user.length === 0) {
        throw new Error("User not found");
      }

      const userId = user[0].id;

      // Insert doctor info
      const newDoctor = await db
        .insert(doctors)
        .values({
          userId,
          specialization: input.specialization,
          clinicAddress: input.clinicAddress,
          phoneNumber: input.phoneNumber,
        })
        .execute();

      return newDoctor;
    }),

  addprescriptions: publicProcedure
    .input(
      z.object({
        doctorId: z.number().int(),
        patientId: z.number().int(),
        drugName: z.string(),
        dosage: z.string(),
        usageInstructions: z.string(),
        oneTimeUse: z.boolean(),
        status: z.string(),
        uniqueNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const addNewPrescrption = await db
        .insert(prescriptions)
        .values({
          doctorId: input.doctorId,
          patientId: input.patientId,
          drugName: input.drugName,
          dosage: input.dosage,
          usageInstructions: input.usageInstructions,
          oneTimeUse: input.oneTimeUse,
          status: input.status,
          uniqueNumber: input.uniqueNumber,
        })
        .execute();
      return addNewPrescrption;
    }),
});
