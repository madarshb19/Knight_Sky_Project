import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Github, ExternalLink, FileCode2 } from "lucide-react";

interface ProjectDetailProps {
  project: ProjectType;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const getModalStyle = () => {
    switch (project.domain) {
      case 'astrophysics':
        return "bg-gradient-to-br from-indigo-900/95 to-purple-900/95 border-indigo-700";
      case 'biology':
        return "bg-gradient-to-br from-emerald-900/95 to-teal-900/95 border-emerald-700";
      case 'humanities':
        return "bg-gradient-to-br from-amber-900/95 to-orange-900/95 border-amber-700";
      default:
        return "bg-background";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`relative w-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl border ${getModalStyle()} backdrop-blur-sm`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 rounded-full bg-background/20 hover:bg-background/40"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="capitalize">
                {project.domain}
              </Badge>
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <ScrollArea className="h-[calc(90vh-220px)]">
              <div className="pr-4">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p>{project.description}</p>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-2">Details</h3>
                  <div dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
                  
                  <h3 className="text-lg font-semibold mt-6 mb-2">Results</h3>
                  <p>{project.results}</p>
                </div>
              </div>
            </ScrollArea>

            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-muted">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    GitHub Repository
                  </Button>
                </a>
              )}
              {project.notebookUrl && (
                <a href={project.notebookUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <FileCode2 className="h-4 w-4" />
                    Jupyter Notebook
                  </Button>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
