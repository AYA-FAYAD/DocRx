import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { doctors, patients, users, prescriptions } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

export const patientsRouter = router({
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
