import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { domainEnum, type Domain, type ProjectType } from "@shared/schema";
import BackgroundLayer from "@/components/BackgroundLayer";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetail from "@/components/ProjectDetail";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function DomainPage() {
  const params = useParams<{ domain: string }>();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const { toast } = useToast();

  // Validate domain parameter
  const domainParam = params.domain as Domain;
  const isValidDomain = domainEnum.safeParse(domainParam).success;

  useEffect(() => {
    if (!isValidDomain) {
      toast({
        title: "Invalid Domain",
        description: "The specified domain doesn't exist.",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [isValidDomain, setLocation, toast]);

  const { data: projects, isLoading, isError } = useQuery<ProjectType[]>({
    queryKey: ["/api/projects"],
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error loading projects",
        description: "Failed to load project data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  if (!isValidDomain) {
    return null; // Will redirect to home
  }

  const domainProjects = projects?.filter(
    (project) => project.domain === domainParam
  );

  const filteredProjects = domainProjects?.filter((project) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
    );
  });

  const getDomainTitle = (domain: Domain): string => {
    const titles: Record<Domain, string> = {
      astrophysics: "Astrophysics Projects",
      biology: "Biology Projects",
      humanities: "Humanities Projects",
      quantum: "Quantum Machine Learning",
      finance: "Finance Projects",
      kaggle: "Kaggle Projects"
    };
    return titles[domain];
  };

  const getDomainDescription = (domain: Domain): string => {
    const descriptions: Record<Domain, string> = {
      astrophysics: "Machine learning applications in space exploration and celestial data analysis",
      biology: "AI models for understanding biological systems and genomic patterns",
      humanities: "Computational approaches to cultural, historical, and textual analysis",
      quantum: "Quantum computing and machine learning applications for complex computational problems",
      finance: "AI and machine learning solutions for financial markets and prediction models",
      kaggle: "Competition projects and datasets exploring various machine learning challenges"
    };
    return descriptions[domain];
  };
  
  const getDomainTitleGradient = (domain: Domain): string => {
    const gradients: Record<Domain, string> = {
      astrophysics: "from-indigo-400 to-purple-500",
      biology: "from-emerald-400 to-teal-500",
      humanities: "from-amber-400 to-orange-500",
      quantum: "from-red-400 to-red-600",
      finance: "from-blue-400 to-blue-600",
      kaggle: "from-sky-400 to-cyan-500"
    };
    return gradients[domain];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div className={`min-h-screen overflow-x-hidden relative bg-background text-foreground font-sans`}>
      <BackgroundLayer domain={domainParam} />

      <motion.div 
        className="container mx-auto px-4 py-10 lg:py-16 relative z-10"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${getDomainTitleGradient(domainParam)}`}>
            {getDomainTitle(domainParam)}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {getDomainDescription(domainParam)}
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="mb-8">
          <Button variant="outline" onClick={() => setLocation("/")}>
            ← Back to All Domains
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProjects && filteredProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>Clear search</Button>
          </div>
        )}
      </motion.div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
