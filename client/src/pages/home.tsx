import { motion } from "framer-motion";
import BackgroundLayer from "@/components/BackgroundLayer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Github, Linkedin, ExternalLink, Mail } from "lucide-react";

export default function Home() {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
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
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring the intersection of machine learning and scientific discovery
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div 
            className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-card-foreground">About Me</h2>
            <div className="space-y-4 text-card-foreground/90">
              <p>
                I'm a machine learning enthusiast passionate about applying AI to solve complex problems across different domains. 
                My background in physics gives me a unique perspective on how to approach data analysis and model development.
              </p>
              <p>
                I specialize in developing custom machine learning solutions for scientific research, 
                with a particular focus on astrophysics, quantum computing, and biological systems.
              </p>
              <p>
                My goal is to bridge the gap between cutting-edge machine learning techniques and domain-specific scientific challenges,
                creating tools that advance our understanding of the world.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-card-foreground">My Research Interests</h2>
            <ul className="space-y-3 text-card-foreground/90">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Astrophysics:</strong> Applying deep learning to classify celestial objects, detect patterns in astronomical data, and analyze particle interactions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Quantum ML:</strong> Exploring the intersection of quantum computing and neural networks to solve complex optimization problems.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Biological Systems:</strong> Developing models to understand protein structures, analyze gene expression, and predict molecular interactions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Kaggle Competitions:</strong> Participating in data science competitions to solve real-world problems and collaborate with the global ML community.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="mb-16"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Explore My Projects by Domain</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DomainCard 
              title="Astrophysics" 
              description="ML applications in cosmic research"
              color="from-purple-500 to-indigo-600"
              link="/astrophysics"
            />
            <DomainCard 
              title="Biology" 
              description="ML for understanding biological systems"
              color="from-green-500 to-emerald-600"
              link="/biology"
            />
            <DomainCard 
              title="Quantum ML" 
              description="Quantum computing & machine learning"
              color="from-red-500 to-rose-600"
              link="/quantum"
            />
            <DomainCard 
              title="Finance" 
              description="ML models for financial analysis"
              color="from-blue-500 to-indigo-700"
              link="/finance"
            />
            <DomainCard 
              title="Kaggle" 
              description="Competition solutions & notebooks"
              color="from-sky-400 to-blue-500"
              link="/kaggle"
            />
            <DomainCard 
              title="Humanities" 
              description="ML approaches to human behavior"
              color="from-orange-400 to-amber-600"
              link="/humanities"
            />
          </div>
        </motion.div>

        <motion.div 
          className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4 text-card-foreground text-center">Get In Touch</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button className="gap-2" variant="outline">
              <Github size={18} />
              GitHub
            </Button>
            <Button className="gap-2" variant="outline">
              <Linkedin size={18} />
              LinkedIn
            </Button>
            <Button className="gap-2" variant="outline">
              <Mail size={18} />
              Contact Me
            </Button>
            <Button className="gap-2" variant="outline">
              <ExternalLink size={18} />
              Resume
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function DomainCard({ title, description, color, link }: { title: string; description: string; color: string; link: string }) {
  return (
    <Link href={link}>
      <div className="cursor-pointer bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
        <h3 className={`text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
          {title}
        </h3>
        <p className="text-card-foreground/80 mb-4">{description}</p>
        <div className="flex items-center text-sm font-medium text-primary">
          View Projects <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
}
