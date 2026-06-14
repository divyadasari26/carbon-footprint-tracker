import { z } from "zod";
import type { ActivityCategory, ActivitySource } from "@/types";

/* ═══════════════════════════════════════
   Zod Validation Schemas
   ═══════════════════════════════════════ */

export const activityCategorySchema = z.enum([
  "transport",
  "energy",
  "food",
  "waste",
  "water",
  "shopping",
]) satisfies z.ZodType<ActivityCategory>;

export const activitySourceSchema = z.enum([
  "text",
  "voice",
]) satisfies z.ZodType<ActivitySource>;

export const createActivitySchema = z.object({
  category: activityCategorySchema,
  subcategory: z.string().min(1, "Subcategory is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be under 500 characters"),
  amount: z
    .number()
    .positive("Amount must be positive")
    .finite("Amount must be a finite number"),
  source: activitySourceSchema.default("text"),
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const challengeJoinSchema = z.object({
  challengeId: z.string().min(1, "Challenge ID is required"),
});
