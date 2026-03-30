import { motion } from "framer-motion";

interface BsearchLogoProps {
  size?: "sm" | "lg";
}

const BsearchLogo = ({ size = "lg" }: BsearchLogoProps) => {
  const textSize = size === "lg" ? "text-4xl" : "text-xl";
  
  return (
    <motion.div 
      className="flex items-center gap-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className={`font-heading font-bold ${textSize} tracking-tight`}>
        <span className="text-primary">B</span>
        <span className="text-foreground">search</span>
      </span>
      <svg className={size === "lg" ? "w-6 h-6" : "w-4 h-4"} viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <path d="M16 16L20 20" stroke="hsl(var(--accent))" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="11" cy="11" r="3" fill="hsl(var(--primary) / 0.15)" />
      </svg>
    </motion.div>
  );
};

export default BsearchLogo;
