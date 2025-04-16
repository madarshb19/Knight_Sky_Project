import { motion } from "framer-motion";
import { ProjectType, domainThemes, ProjectStatus } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, FileCode2, Clock, CheckCircle2, XCircle } from "lucide-react";

interface ProjectCardProps {
  project: ProjectType;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { 
      y: -5, 
      boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
      transition: { duration: 0.3 } 
    }
  };

  const getBackgroundStyle = () => {
    switch (project.domain) {
      case 'astrophysics':
        return "bg-gradient-to-br from-indigo-900/90 to-purple-900/90 border-indigo-700";
      case 'biology':
        return "bg-gradient-to-br from-emerald-900/90 to-teal-900/90 border-emerald-700";
      case 'humanities':
        return "bg-gradient-to-br from-amber-900/90 to-orange-900/90 border-amber-700";
      case 'quantum':
        return "bg-gradient-to-br from-slate-200/90 to-slate-100/90 border-slate-300 text-slate-900";
      case 'finance':
        return "bg-gradient-to-br from-blue-900/90 to-blue-800/90 border-blue-700";
      case 'kaggle':
        return "bg-gradient-to-br from-sky-700/90 to-sky-600/90 border-sky-600";
      default:
        return "bg-card";
    }
  };
  
  const getStatusBadge = () => {
    const statusColors = {
      'not-started': {
        bg: 'bg-red-900/40',
        border: 'border-red-700',
        text: 'text-red-200',
        icon: <XCircle className="w-3 h-3 mr-1" />
      },
      'in-progress': {
        bg: 'bg-yellow-900/40',
        border: 'border-yellow-700',
        text: 'text-yellow-200',
        icon: <Clock className="w-3 h-3 mr-1" />
      },
      'completed': {
        bg: 'bg-green-900/40',
        border: 'border-green-700',
        text: 'text-green-200',
        icon: <CheckCircle2 className="w-3 h-3 mr-1" />
      }
    };
    
    const status = project.status || 'not-started';
    const { bg, border, text, icon } = statusColors[status];
    
    return (
      <Badge variant="outline" className={`${bg} ${text} ${border} capitalize`}>
        {icon} {status.replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <motion.div
      className="h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
    >
      <Card className={`h-full overflow-hidden cursor-pointer backdrop-blur-sm border ${getBackgroundStyle()}`}>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0 flex flex-col space-y-2 items-start w-full">
          <div className="flex justify-between items-center w-full">
            <div className="text-xs">
              {/* Domain badge with special styling based on domain */}
              <Badge variant="outline" className={`
                capitalize 
                ${project.domain === 'astrophysics' ? 'bg-indigo-800/30 text-indigo-200 border-indigo-600' : 
                  project.domain === 'biology' ? 'bg-emerald-800/30 text-emerald-200 border-emerald-600' : 
                  project.domain === 'humanities' ? 'bg-amber-800/30 text-amber-200 border-amber-600' :
                  project.domain === 'quantum' ? 'bg-slate-200/30 text-slate-800 border-slate-400' :
                  project.domain === 'finance' ? 'bg-blue-800/30 text-blue-200 border-blue-600' :
                  project.domain === 'kaggle' ? 'bg-sky-700/30 text-sky-200 border-sky-500' :
                  'bg-gray-800/30 text-gray-200 border-gray-600'
                }
              `}>
                {project.domain}
              </Badge>
            </div>
            
            <div>
              {getStatusBadge()}
            </div>
          </div>
          
          <div className="flex justify-end w-full">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Badge variant="secondary" className="cursor-pointer">
                <ExternalLink className="w-3 h-3 mr-1" /> Details
              </Badge>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
