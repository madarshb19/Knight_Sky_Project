import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { projectSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve projects" });
    }
  });

  // API route to get a specific project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve project" });
    }
  });

  // API route to get projects by domain
  app.get("/api/domains/:domain", async (req, res) => {
    try {
      const domain = req.params.domain;
      
      // Validate domain parameter
      const validDomains = ["astrophysics", "biology", "humanities"];
      if (!validDomains.includes(domain)) {
        return res.status(400).json({ message: "Invalid domain" });
      }
      
      const projects = await storage.getProjectsByDomain(domain);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve projects" });
    }
  });

  // Initialize data
  try {
    const dataPath = path.resolve("server/data/projects.json");
    if (fs.existsSync(dataPath)) {
      const projectData = fs.readFileSync(dataPath, "utf-8");
      const projects = z.array(projectSchema).parse(JSON.parse(projectData));
      
      // Seed the database with initial projects
      projects.forEach(project => {
        storage.createProject(project);
      });
      
      console.log("Successfully loaded project data");
    }
  } catch (error) {
    console.error("Failed to initialize project data:", error);
  }

  const httpServer = createServer(app);
  return httpServer;
}
