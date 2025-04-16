import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ProjectType } from "@shared/schema";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetail from "@/components/ProjectDetail";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface DomainSectionProps {
  title: string;
  description: string;
  domain: "astrophysics" | "biology" | "humanities";
  projects: ProjectType[];
  fullPage?: boolean;
}

export default function DomainSection({
  title,
  description,
  domain,
  projects,
  fullPage = false,
}: DomainSectionProps) {
  const [, setLocation] = useLocation();
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  
  // When in full page mode, show all projects, otherwise limit to 3
  const displayProjects = fullPage ? projects : projects.slice(0, 3);
  
  const navigateToDomain = () => {
    setLocation(`/domain/${domain}`);
  };

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  // Get background styling based on domain
  const getSectionStyle = () => {
    switch (domain) {
      case 'astrophysics':
        return "bg-indigo-900/10 border-l-4 border-indigo-700";
      case 'biology':
        return "bg-emerald-900/10 border-l-4 border-emerald-700";
      case 'humanities':
        return "bg-amber-900/10 border-l-4 border-amber-700";
      default:
        return "";
    }
  };

  // Skip section if no projects
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <motion.section
      className={`mb-16 p-6 rounded-lg ${getSectionStyle()}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6">
        <div>
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>
        
        {!fullPage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button onClick={navigateToDomain} variant="outline" className="mt-4 md:mt-0">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {displayProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </motion.div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.section>
  );
}
