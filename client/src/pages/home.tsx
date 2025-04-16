import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import DomainSection from "@/components/DomainSection";
import BackgroundLayer from "@/components/BackgroundLayer";
import SearchBar from "@/components/SearchBar";
import { Domain, ProjectType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<Domain | "all">("all");
  const { toast } = useToast();

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

  const filteredProjects = projects?.filter((project) => {
    // Filter by domain if a specific domain is selected
    if (activeTab !== "all" && project.domain !== activeTab) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

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
    <div className="min-h-screen overflow-x-hidden relative bg-background text-foreground font-sans">
      <BackgroundLayer />
      
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
            Machine Learning Portfolio
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring the intersection of machine learning across different domains
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <Tabs defaultValue="all" className="mb-12" onValueChange={(value) => setActiveTab(value as Domain | "all")}>
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="astrophysics">Astrophysics</TabsTrigger>
              <TabsTrigger value="biology">Biology</TabsTrigger>
              <TabsTrigger value="humanities">Humanities</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredProjects && filteredProjects.length > 0 ? (
              <>
                <DomainSection 
                  title="Astrophysics" 
                  description="Exploring the cosmos through data science"
                  domain="astrophysics" 
                  projects={filteredProjects.filter(p => p.domain === "astrophysics")} 
                />
                
                <DomainSection 
                  title="Biology" 
                  description="Decoding life with machine learning"
                  domain="biology" 
                  projects={filteredProjects.filter(p => p.domain === "biology")} 
                />
                
                <DomainSection 
                  title="Humanities" 
                  description="Understanding human culture through AI"
                  domain="humanities" 
                  projects={filteredProjects.filter(p => p.domain === "humanities")} 
                />
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>Clear search</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="astrophysics">
            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredProjects && filteredProjects.filter(p => p.domain === "astrophysics").length > 0 ? (
              <DomainSection 
                title="Astrophysics" 
                description="Exploring the cosmos through data science"
                domain="astrophysics" 
                projects={filteredProjects.filter(p => p.domain === "astrophysics")} 
                fullPage
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No astrophysics projects found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>Clear search</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="biology">
            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredProjects && filteredProjects.filter(p => p.domain === "biology").length > 0 ? (
              <DomainSection 
                title="Biology" 
                description="Decoding life with machine learning"
                domain="biology" 
                projects={filteredProjects.filter(p => p.domain === "biology")} 
                fullPage
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No biology projects found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>Clear search</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="humanities">
            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredProjects && filteredProjects.filter(p => p.domain === "humanities").length > 0 ? (
              <DomainSection 
                title="Humanities" 
                description="Understanding human culture through AI"
                domain="humanities" 
                projects={filteredProjects.filter(p => p.domain === "humanities")} 
                fullPage
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No humanities projects found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>Clear search</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
