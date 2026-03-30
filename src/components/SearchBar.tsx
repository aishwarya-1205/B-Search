import { useState } from "react";
import { Search, Mic, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  defaultValue?: string;
  compact?: boolean;
}

const SearchBar = ({ defaultValue = "", compact = false }: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      className={`w-full ${compact ? "max-w-2xl" : "max-w-[680px]"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={`relative flex items-center bg-card rounded-full border border-border search-glow transition-all duration-300 ${compact ? "h-11" : "h-14"}`}>
        <Search className={`absolute left-4 text-muted-foreground ${compact ? "w-4 h-4" : "w-5 h-5"}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web with AI..."
          className={`w-full bg-transparent outline-none font-body text-foreground placeholder:text-muted-foreground ${compact ? "pl-10 pr-14 sm:pr-24 text-sm" : "pl-12 pr-16 sm:pr-28 text-base"}`}
        />
        <div className="absolute right-2 sm:right-3 flex items-center gap-1 sm:gap-2">
          <button type="button" className="hidden sm:block p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Mic className="w-4 h-4" />
          </button>
          <button type="button" className="hidden sm:block p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Camera className="w-4 h-4" />
          </button>
          <button
            type="submit"
            className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchBar;
