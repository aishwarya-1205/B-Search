import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import BsearchLogo from "@/components/BsearchLogo";
import SearchBar from "@/components/SearchBar";
import QuickLinks from "@/components/QuickLinks";
import DynamicSky from "@/components/DynamicSky";
import cityscapeBg from "@/assets/cityscape-bg.png";

const Index = () => {
  const handleThemeChange = useCallback((isDark: boolean) => {
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background transition-colors duration-1000">
      {/* Dynamic Sky with Sun/Moon */}
      <DynamicSky onThemeChange={handleThemeChange} />

      {/* Wave background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="hsl(var(--wave-start))"
            fillOpacity="0.5"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,197.3C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="hsl(var(--wave-end))"
            fillOpacity="0.35"
            d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,245.3C672,256,768,256,864,240C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Cityscape */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-40">
        <img src={cityscapeBg} alt="" className="w-full object-cover object-bottom" />
      </div>

      {/* Navbar */}
      <header className="relative z-50 flex items-center justify-end px-4 sm:px-6 py-4">
        <Link
          to="/auth"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-heading font-medium hover:opacity-90 transition-opacity"
        >
          <User className="w-4 h-4" />
          Sign in
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-16 px-4">
        <BsearchLogo size="lg" />

        <motion.p
          className="text-muted-foreground text-sm font-body mt-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI-powered search for the modern web
        </motion.p>

        <SearchBar />
        <QuickLinks />
      </main>

      {/* Footer links - positioned at bottom */}
      <motion.div
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground pb-6 mt-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="hover:text-foreground cursor-pointer transition-colors">About</span>
        <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
        <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
        <span className="hover:text-foreground cursor-pointer transition-colors">Settings</span>
      </motion.div>

    </div>
  );
};

export default Index;
