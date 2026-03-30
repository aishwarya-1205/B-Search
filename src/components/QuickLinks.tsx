import { motion } from "framer-motion";
import { Globe, Image, Video, Newspaper, BookOpen, ShoppingBag } from "lucide-react";

const links = [
  { icon: Globe, label: "Web", bg: "bg-primary/15", text: "text-primary" },
  { icon: Image, label: "Images", bg: "bg-accent/15", text: "text-accent" },
  { icon: Video, label: "Videos", bg: "bg-destructive/15", text: "text-destructive" },
  { icon: Newspaper, label: "News", bg: "bg-primary/15", text: "text-primary" },
  { icon: BookOpen, label: "Blogs", bg: "bg-accent/15", text: "text-accent" },
  { icon: ShoppingBag, label: "Shopping", bg: "bg-muted-foreground/15", text: "text-muted-foreground" },
];

const QuickLinks = () => (
  <motion.div
    className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 max-w-[320px] sm:max-w-none mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.4 }}
  >
    {links.map((link, i) => (
      <motion.button
        key={link.label}
        className={`group flex flex-col items-center gap-1.5`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + i * 0.07 }}
        title={link.label}
      >
        <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${link.bg} ${link.text} transition-all group-hover:scale-110 group-hover:shadow-lg`}>
          <link.icon className="w-6 h-6" strokeWidth={1.8} />
        </div>
        <span className="text-[11px] font-body text-muted-foreground group-hover:text-foreground transition-colors">
          {link.label}
        </span>
      </motion.button>
    ))}
  </motion.div>
);

export default QuickLinks;
