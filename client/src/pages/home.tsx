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
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
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
            Exploring the intersection of machine learning and scientific
            discovery
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-card-foreground">
              About Me
            </h2>
            <div className="space-y-4 text-card-foreground/90">
              <p>
                Did you know that the Milky Way galaxy smells more like rum
                instead of milk? And that Grasshoppers have ears in their
                bellies?
              </p>
              <p>
                Hi, I'm Adarsh Mateti, and just as you don't know what to do
                with the above information, I don't know what to do with my
                life. But what I did figure out eventually is a couple of
                things.
              </p>
              <p>
                First, I love problems. Not only inviting them, but solving them
                as well. It keeps my mind awake and time flies when I'm around
                them.
              </p>
              <p>
                Second, I love competition, whether it be a pillow fight with my
                brother or a research competition way out of my league. Keyword
                is 'love', never said I'm good at them.
              </p>
              <p>
                Third, I love science. (sorry, can't really think of anything
                quirky to say here)
              </p>
              <p>
                My recent goal has been trying to unify everything I love into
                one thing and for most part, it has been a failure. Although I
                haven't found the perfect mold yet, I believe Data Science is a
                practical (albeit suboptimal) solution to what I'm trying to
                achieve.. More specifically, I'm trying to find a way to apply
                ML to solve problems in science.
              </p>
              <p>
                90% of the projects you see under the domains of Astrophysics,
                Biology and Humanities have been inspired by the organization
                Machine Learning for Science (ML4SCI). Machine Learning for
                Science (ML4SCI) is an amazing org that bridges the gap between
                machine learning and scientific research. And although I failed
                getting to work with them through GSoC, that doesn't stop me
                from trying to work on their projects by myself. Plus, I thought
                it would be a good exercise to try to give a shot at their
                problem tasks.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-card-foreground">
              Domains
            </h2>
            <ul className="space-y-3 text-card-foreground/90">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Astrophysics:</strong> A lot of things go boom in the
                  universe whether at a scale spanning millions of light years
                  or smaller than the size of an electron. Fortunately for me,
                  these booms create a lot of data to play around with which is
                  what I'd be doing here.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Quantum ML:</strong> ML on stuff which is here and
                  there at the same time
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Biological Systems:</strong> I watched House M.D , I
                  know what I'm doing.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Kaggle Competitions:</strong> A place where I mention
                  my approaches to competitions. Just don't look at the
                  leaderboard.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Humanities:</strong> I actually have never studied
                  humanities, so this should be fun.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Finance:</strong> stonks
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Explore My Projects by Domain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DomainCard
              title="Astrophysics"
              description="ML applications in cosmic research"
              color="from-purple-500 to-indigo-600"
              link="/domain/astrophysics"
            />
            <DomainCard
              title="Biology"
              description="ML for understanding biological systems"
              color="from-green-500 to-emerald-600"
              link="/domain/biology"
            />
            <DomainCard
              title="Quantum ML"
              description="Quantum computing & machine learning"
              color="from-red-500 to-rose-600"
              link="/domain/quantum"
            />
            <DomainCard
              title="Finance"
              description="ML models for financial analysis"
              color="from-blue-500 to-indigo-700"
              link="/domain/finance"
            />
            <DomainCard
              title="Kaggle"
              description="Competition solutions & notebooks"
              color="from-sky-400 to-blue-500"
              link="/domain/kaggle"
            />
            <DomainCard
              title="Humanities"
              description="ML approaches to human behavior"
              color="from-orange-400 to-amber-600"
              link="/domain/humanities"
            />
          </div>
        </motion.div>
        <motion.div
          className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4 text-card-foreground text-center">
            Get In Touch
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button
              className="gap-2"
              variant="outline"
              onClick={() =>
                window.open("https://github.com/madarshb19", "_blank")
              }
            >
              <Github size={18} />
              GitHub
            </Button>
            <Button
              className="gap-2"
              variant="outline"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/adarsh-mateti-66008a1a8",
                  "_blank",
                )
              }
            >
              <Linkedin size={18} />
              LinkedIn
            </Button>
            <Button
              className="gap-2"
              variant="outline"
              onClick={() =>
                (window.location.href = "mailto:madarshb19@gmail.com")
              }
            >
              <Mail size={18} />
              Contact Me
            </Button>
            <Button
            className="gap-2"
            variant="outline"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/attached_assets/Resume_Official_Finance-compressed.pdf";
              link.download = "Adarsh_Mateti_Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <ExternalLink size={18} />
            Resume
          </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function DomainCard({
  title,
  description,
  color,
  link,
}: {
  title: string;
  description: string;
  color: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className="cursor-pointer bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
        <h3
          className={`text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${color}`}
        >
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
