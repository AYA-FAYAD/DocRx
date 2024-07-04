import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { doctors, patients, users, prescriptions } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

export const patientsRouter = router({
  addpatientinfo: publicProcedure
    .input(
      z.object({
        userId: z.number().int(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const addpatientinfo = await db
        .insert(patients)
        .values({
          userId: input.userId,
          phoneNumber: input.phoneNumber,
        })
        .execute();
      return addpatientinfo;
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
