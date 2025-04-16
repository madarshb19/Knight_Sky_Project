import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define domains enum
export const domainEnum = z.enum(["astrophysics", "biology", "humanities"]);
export type Domain = z.infer<typeof domainEnum>;

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  domain: text("domain", { enum: ["astrophysics", "biology", "humanities"] }).notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  imageUrl: text("image_url"),
  technologies: text("technologies").array().notNull(),
  results: text("results").notNull(),
  githubUrl: text("github_url"),
  notebookUrl: text("notebook_url"),
  featured: integer("featured").default(0),
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
});

export type ProjectType = z.infer<typeof projectSchema>;
