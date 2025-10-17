import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const guestBook = pgTable("guestBook", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const user = pgTable("User", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});