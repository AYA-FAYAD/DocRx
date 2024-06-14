import { text, int, sqliteTable } from "drizzle-orm/sqlite-core";
export const users = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userName: text("username").notNull().unique(),
  password: text("password").notNull(),
});
