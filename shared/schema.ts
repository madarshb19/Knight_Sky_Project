import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define domains enum
export const domainEnum = z.enum(["astrophysics", "biology", "humanities", "quantum", "finance", "kaggle"]);
export type Domain = z.infer<typeof domainEnum>;

// Define project status enum
export const statusEnum = z.enum(["not-started", "in-progress", "completed"]);
export type ProjectStatus = z.infer<typeof statusEnum>;

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  domain: text("domain", { enum: ["astrophysics", "biology", "humanities", "quantum", "finance", "kaggle"] }).notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  imageUrl: text("image_url"),
  technologies: text("technologies").array().notNull(),
  results: text("results").notNull(),
  githubUrl: text("github_url"),
  notebookUrl: text("notebook_url"),
  featured: integer("featured").default(0),
  status: text("status", { enum: ["not-started", "in-progress", "completed"] }).default("not-started").notNull(),
});

// Insert schema
export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

// Project types
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Define theme colors for different domains
export const domainThemes = {
  astrophysics: {
    primary: "bg-indigo-900",
    secondary: "bg-purple-800",
    text: "text-indigo-100",
    accent: "text-amber-400",
    background: "bg-gradient-to-r from-indigo-950 to-purple-950",
    card: "bg-indigo-900/70 backdrop-blur-md border border-indigo-700"
  },
  biology: {
    primary: "bg-emerald-800",
    secondary: "bg-teal-700",
    text: "text-emerald-100",
    accent: "text-yellow-400",
    background: "bg-gradient-to-r from-emerald-950 to-teal-950",
    card: "bg-emerald-900/70 backdrop-blur-md border border-emerald-700"
  },
  humanities: {
    primary: "bg-amber-900",
    secondary: "bg-orange-800",
    text: "text-amber-100",
    accent: "text-sky-400",
    background: "bg-gradient-to-r from-amber-950 to-orange-950",
    card: "bg-amber-900/70 backdrop-blur-md border border-amber-700"
  },
  quantum: {
    primary: "bg-slate-100",
    secondary: "bg-white",
    text: "text-slate-900",
    accent: "text-blue-600",
    background: "bg-gradient-to-r from-gray-50 to-slate-200",
    card: "bg-white/90 backdrop-blur-md border border-slate-300"
  },
  finance: {
    primary: "bg-blue-900",
    secondary: "bg-blue-800",
    text: "text-blue-100",
    accent: "text-green-400",
    background: "bg-gradient-to-r from-blue-950 to-blue-900",
    card: "bg-blue-900/70 backdrop-blur-md border border-blue-700"
  },
  kaggle: {
    primary: "bg-sky-700",
    secondary: "bg-sky-600",
    text: "text-sky-100",
    accent: "text-yellow-400",
    background: "bg-gradient-to-r from-sky-800 to-sky-700",
    card: "bg-sky-700/70 backdrop-blur-md border border-sky-600"
  }
};

// Project type for the frontend with all the necessary information
export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  domain: domainEnum,
  description: z.string(),
  fullDescription: z.string(),
  imageUrl: z.string().optional(),
  technologies: z.array(z.string()),
  results: z.string(),
  githubUrl: z.string().optional(),
  notebookUrl: z.string().optional(),
  featured: z.number().default(0),
  status: statusEnum.default("not-started"),
});

export type ProjectType = z.infer<typeof projectSchema>;
