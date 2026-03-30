import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, X, Copy, Share2, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";

interface AIOverviewDetailProps {
  open: boolean;
  onClose: () => void;
  query: string;
}

const AI_CONTENT = {
  summary: `Artificial intelligence (AI) is the intelligence of machines or software, as opposed to the intelligence of humans or animals. It is a field of study in computer science that develops and studies intelligent machines. It commonly represents the voiced velar plosive in modern computing contexts.`,
  sections: [
    {
      title: "Common Uses of AI",
      items: [
        { label: "Technology & Computing", description: "Used in machine learning, natural language processing, computer vision, and autonomous systems." },
        { label: "Mathematics & Research", description: "Often represents computational models, neural network architectures, and optimization algorithms." },
        { label: "Business & Industry", description: "Refers to automation tools, predictive analytics, and intelligent decision-making systems." },
        { label: "Everyday Applications", description: "AI is used in voice assistants, recommendation engines, search engines, and smart devices." },
      ],
    },
  ],
  sources: [
    { name: "Wikipedia", count: 4 },
    { name: "MIT Technology Review", count: 2 },
    { name: "Stanford HAI", count: 1 },
  ],
};

const AIOverviewDetail = ({ open, onClose, query }: AIOverviewDetailProps) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-3xl mx-4 max-h-[85vh] overflow-y-auto bg-card rounded-2xl shadow-2xl border border-border"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="font-heading font-semibold text-foreground text-sm sm:text-base">AI Overview</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px] sm:text-xs font-body">हिन्दी</span>
                <button className="p-1 sm:p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 py-4 sm:py-6">
              {/* Main summary */}
              <p className="text-sm text-foreground/90 font-body leading-relaxed mb-6">
                "{query}" — {AI_CONTENT.summary}
                <span className="inline-flex items-center gap-1 ml-2">
                  <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded font-medium">w</span>
                  <span className="text-xs text-muted-foreground">Wikipedia +{AI_CONTENT.sources[0].count}</span>
                </span>
              </p>

              {/* Sections */}
              {AI_CONTENT.sections.map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="font-heading font-bold text-foreground text-base mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                        <p className="text-sm font-body text-foreground/80 leading-relaxed">
                          <span className="font-semibold text-foreground">{item.label}:</span>{" "}
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Dive deeper button */}
              <div className="mt-8 mb-4">
                <button className="w-full py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-heading font-medium text-sm transition-colors">
                  Dive deeper in AI Mode
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-destructive/70 font-body mb-4">
                AI can make mistakes, so double-check responses
              </p>

              {/* Action bar */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground" title="Copy">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground" title="Export">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground" title="Share">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground" title="Helpful">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground" title="Not helpful">
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AIOverviewDetail;
