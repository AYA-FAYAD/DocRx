import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { doctors, patients, users, prescriptions } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

export const prescriptionsRouter = router({
  getUserPrescriptions: publicProcedure
    .input(
      z.object({
        userClerkId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.clerkUserId, input.userClerkId))
        .execute();

      if (!user.length) {
        throw new Error("User not found");
      }

      const role = user[0].role;
      let prescriptionsList;

      if (role === "patient") {
        const patient = await db
          .select()
          .from(patients)
          .where(eq(patients.userId, user[0].id))
          .execute();

        if (patient.length === 0) {
          throw new Error("Patient not found");
        }

        const patientId = patient[0].id;

        prescriptionsList = await db
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
      } else if (role === "doctor") {
        const doctor = await db
          .select()
          .from(doctors)
          .where(eq(doctors.userId, user[0].id))
          .execute();

        if (doctor.length === 0) {
          throw new Error("Doctor not found");
        }

        const doctorId = doctor[0].id;

        prescriptionsList = await db
          .select({
            prescriptionId: prescriptions.id,
            drugName: prescriptions.drugName,
            dosage: prescriptions.dosage,
            usageInstructions: prescriptions.usageInstructions,
            createdAt: prescriptions.createdAt,
            patientName: users.name,
          })
          .from(prescriptions)
          .innerJoin(patients, eq(prescriptions.patientId, patients.id))
          .innerJoin(users, eq(patients.userId, users.id))
          .where(eq(prescriptions.doctorId, doctorId))
          .execute();
      } else {
        throw new Error("Invalid role");
      }

      return prescriptionsList;
    }),
});
