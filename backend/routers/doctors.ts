import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { doctors, patients, prescriptions, users } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

export const doctorsRouter = router({
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
