import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  const [localTerm, setLocalTerm] = useState(searchTerm);

  // Sync local state with prop
  useEffect(() => {
    setLocalTerm(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localTerm);
  };

  const clearSearch = () => {
    setLocalTerm("");
    setSearchTerm("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search by title, description, or technology..."
            className="pl-10 pr-10 py-6"
            value={localTerm}
            onChange={(e) => setLocalTerm(e.target.value)}
          />
          {localTerm && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={clearSearch}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <Button type="submit" className="ml-2">
          Search
        </Button>
      </form>
    </motion.div>
  );
}
