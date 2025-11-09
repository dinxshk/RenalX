import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const testParameterSchema = z.object({
  code: z.string(),
  name: z.string(),
  result: z.string(),
  isNormal: z.boolean().optional(),
});

export const urinalysisTests = pgTable("urinalysis_tests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url"),
  results: jsonb("results").$type<TestParameter[]>().notNull(),
  testDate: timestamp("test_date").notNull().defaultNow(),
  summary: text("summary").notNull(),
});

export const insertUrinalysisTestSchema = createInsertSchema(urinalysisTests).omit({
  id: true,
  testDate: true,
}).extend({
  results: z.array(testParameterSchema),
});

export type InsertUrinalysisTest = z.infer<typeof insertUrinalysisTestSchema>;
export type UrinalysisTest = typeof urinalysisTests.$inferSelect;
export type TestParameter = z.infer<typeof testParameterSchema>;
