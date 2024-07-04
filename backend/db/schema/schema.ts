import { sql } from "drizzle-orm";
import { text, int, sqliteTable } from "drizzle-orm/sqlite-core";
// Users table
export const users = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  clerkUserId: text("clerk_user_id").unique().notNull(),

  role: text("role").default(sql`NULL`),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Doctors table
export const doctors = sqliteTable("doctors", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id")
    .references(() => users.id)
    .notNull(),
  specialization: text("specialization").notNull(),
  clinicAddress: text("clinic_address").notNull(),
  phoneNumber: text("phone_number").notNull(),
});

// Patients table
export const patients = sqliteTable("patients", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id")
    .references(() => users.id)
    .notNull(),
  phoneNumber: text("phone_number").notNull(),
});

// Prescriptions
export const prescriptions = sqliteTable("prescriptions", {
  id: int("id").primaryKey({ autoIncrement: true }),
  doctorId: int("doctor_id")
    .references(() => doctors.id)
    .notNull(),
  patientId: int("patient_id")
    .references(() => patients.id)
    .notNull(),
  drugName: text("drug_name").notNull(),
  dosage: text("dosage").notNull(),
  usageInstructions: text("usage_instructions").notNull(),
  oneTimeUse: int("one_time_use", { mode: "boolean" }).notNull(),
  status: text("status").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  uniqueNumber: text("unique_number").unique().notNull(),
});
