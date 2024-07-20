import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { doctors, patients, prescriptions, users } from "../db/schema/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

function generateUniqueNumber() {
  return Math.floor(
    100000000000000 + Math.random() * 900000000000000
  ).toString();
}

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
      const user = await db
        .select()
        .from(users)
        .where(eq(users.clerkUserId, input.clerkUserId))
        .execute();

      if (user.length === 0) {
        return new Error("User not found");
      }
      const userId = user[0].id;

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
  getPrescriptions: publicProcedure
    .input(
      z.object({
        doctorClerkUserId: z.string(),
      })
    )
    .query(async ({ input }) => {
      console.log("Input doctorClerkUserId:", input.doctorClerkUserId);

      // Fetch doctor using clerkUserId
      const doctor = await db
        .select()
        .from(doctors)
        .innerJoin(users, eq(doctors.userId, users.id))
        .where(eq(users.clerkUserId, input.doctorClerkUserId))
        .execute();

      console.log("Fetched doctor:", doctor);

      if (doctor.length === 0) {
        throw new Error("Doctor not found");
      }

      const doctorId = doctor[0].doctors.id;
      console.log("Doctor ID:", doctorId);

      // Fetch prescriptions using doctorId
      const prescriptionsList = await db
        .select()
        .from(prescriptions)
        .where(eq(prescriptions.doctorId, doctorId))
        .execute();

      console.log("Fetched prescriptions:", prescriptionsList);

      return prescriptionsList;
    }),

  addPatient: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const findpatient = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .execute();
      if (findpatient.length > 0) {
        return { findpatient: findpatient[0].email };
      }

      const newUser = await db
        .insert(users)
        .values({
          name: input.name,
          clerkUserId: null,
          email: input.email,
          role: "patient",
        })
        .returning()
        .execute();

      const userId = newUser[0].id;
      const newPatient = await db
        .insert(patients)
        .values({
          userId,
          phoneNumber: input.phoneNumber,
        })
        .execute();

      return { newUser, newPatient };
    }),

  addprescriptions: publicProcedure
    .input(
      z.object({
        doctorClerkUserId: z.string(),
        patientEmail: z.string(),
        drugName: z.string(),
        dosage: z.string(),
        usageInstructions: z.string(),
        oneTimeUse: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      // find doctor
      const doctor = await db
        .select()
        .from(doctors)
        .innerJoin(users, eq(doctors.userId, users.id))
        .where(eq(users.clerkUserId, input.doctorClerkUserId))
        .execute();

      if (doctor.length === 0) {
        throw new Error("Doctor not found ");
      }

      const doctorId = doctor[0].doctors.id;

      // Find patient
      const patient = await db
        .select()
        .from(patients)
        .innerJoin(users, eq(patients.userId, users.id))
        .where(eq(users.email, input.patientEmail))
        .execute();

      if (patient.length === 0) {
        throw new Error("Patient not found");
      }

      const patientId = patient[0].patients.id;

      const uniqueNumber = generateUniqueNumber();

      const addNewPrescription = await db
        .insert(prescriptions)
        .values({
          doctorId,
          patientId,
          drugName: input.drugName,
          dosage: input.dosage,
          usageInstructions: input.usageInstructions,
          oneTimeUse: input.oneTimeUse,
          status: "active",
          uniqueNumber: uniqueNumber,
        })
        .execute();
      return addNewPrescription;
    }),
});
