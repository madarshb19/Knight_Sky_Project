import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, GitPullRequest } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Domain } from "@shared/schema";

export default function Navbar() {
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const navigateToDomain = (domain: Domain) => {
    setLocation(`/domain/${domain}`);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center space-x-2 text-foreground">
              <span className="text-xl font-bold">ML Portfolio</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setLocation("/")}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => navigateToDomain("astrophysics")}>
              Astrophysics
            </Button>
            <Button variant="ghost" onClick={() => navigateToDomain("biology")}>
              Biology
            </Button>
            <Button variant="ghost" onClick={() => navigateToDomain("humanities")}>
              Humanities
            </Button>
            <Button variant="ghost" onClick={() => navigateToDomain("quantum")}>
              Quantum ML
            </Button>
            <Button variant="ghost" onClick={() => navigateToDomain("finance")}>
              Finance
            </Button>
            <Button variant="ghost" onClick={() => navigateToDomain("kaggle")}>
              Kaggle
            </Button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-muted"
            >
              <GitPullRequest className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-8">
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={() => setLocation("/")}>
                      Home
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={() => navigateToDomain("astrophysics")}>
                      Astrophysics
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={() => navigateToDomain("biology")}>
                      Biology
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={() => navigateToDomain("humanities")}>
                      Humanities
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={() => navigateToDomain("quantum")}>
                      Quantum ML
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={() => navigateToDomain("finance")}>
                      Finance
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={() => navigateToDomain("kaggle")}>
                      Kaggle
                    </Button>
                  </SheetClose>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                  >
                    <GitPullRequest className="w-5 h-5" />
                    <span>GitPullRequest</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
