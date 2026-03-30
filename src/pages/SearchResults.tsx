import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, MoreVertical, Sparkles, Clock, Image, Newspaper, Video, Map, Wand2, User, Bookmark } from "lucide-react";
import BsearchLogo from "@/components/BsearchLogo";
import SearchBar from "@/components/SearchBar";
import AIOverviewDetail from "@/components/AIOverviewDetail";

const MOCK_RESULTS = [
  {
    source: "Wikipedia",
    sourceIcon: "🌐",
    url: "https://en.wikipedia.org/wiki/Artificial_intelligence",
    title: "Artificial Intelligence - Wikipedia",
    description: "Artificial intelligence (AI) is the intelligence of machines or software, as opposed to the intelligence of humans or animals. It is a field of study in computer science that develops and studies intelligent machines.",
    date: "Updated March 2026",
  },
  {
    source: "MIT Technology Review",
    sourceIcon: "🔬",
    url: "https://technologyreview.com/ai-trends-2026",
    title: "The Biggest AI Trends Shaping 2026",
    description: "From multimodal foundation models to AI agents that can browse the web autonomously, here are the most important developments in artificial intelligence this year.",
    date: "Published Jan 15, 2026",
  },
  {
    source: "Nature",
    sourceIcon: "📄",
    url: "https://nature.com/articles/ai-research",
    title: "Recent Advances in AI Research — Nature",
    description: "This comprehensive review covers the latest breakthroughs in machine learning, neural architecture search, and reinforcement learning from human feedback.",
    date: "Published Feb 28, 2026",
  },
  {
    source: "Stanford HAI",
    sourceIcon: "🎓",
    url: "https://hai.stanford.edu/ai-index-2026",
    title: "AI Index Report 2026 — Stanford HAI",
    description: "The annual AI Index Report tracks, collates, distills, and visualizes data related to artificial intelligence. Our mission is to provide unbiased, rigorously vetted data.",
    date: "Published March 1, 2026",
  },
  {
    source: "OpenAI Blog",
    sourceIcon: "🤖",
    url: "https://openai.com/blog/latest",
    title: "Introducing the Next Generation of AI Models",
    description: "We're releasing our latest model with improved reasoning capabilities, better factual accuracy, and new multimodal features that push the boundaries of what AI can do.",
    date: "Published March 10, 2026",
  },
];

const KNOWLEDGE_PANEL = {
  title: "Artificial Intelligence",
  summary: "Artificial intelligence (AI) is a broad field of computer science focused on creating intelligent machines capable of performing tasks that typically require human intelligence, including learning, reasoning, problem-solving, and perception.",
  relatedTopics: ["Machine Learning", "Deep Learning", "Neural Networks", "Natural Language Processing", "Computer Vision", "Reinforcement Learning"],
  images: [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=120&fit=crop",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200&h=120&fit=crop",
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=200&h=120&fit=crop",
  ],
};

const tabs = [
  { icon: Sparkles, label: "All" },
  { icon: Newspaper, label: "Articles" },
  { icon: Image, label: "Images" },
  { icon: Video, label: "Videos" },
  { icon: Map, label: "Maps" },
  { icon: Wand2, label: "AI Mode" },
];

function getFaviconUrl(urlStr: string) {
  try {
    const url = new URL(urlStr);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
  } catch (e) {
    return "https://www.google.com/s2/favicons?domain=example.com&sz=32";
  }
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("All");
  const [aiDetailOpen, setAiDetailOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6 px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="cursor-pointer" onClick={() => window.location.href = "/"}>
              <BsearchLogo size="sm" />
            </div>
            <div className="flex sm:hidden items-center gap-2">
              <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
                <Bookmark className="w-5 h-5" />
              </button>
              <Link
                to="/auth"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-heading font-medium hover:opacity-90 transition-opacity"
              >
                <User className="w-4 h-4" />
                Sign in
              </Link>
            </div>
          </div>
          <div className="w-full sm:w-auto sm:flex-1 order-3 sm:order-none">
            <SearchBar defaultValue={query} compact />
          </div>
          <div className="hidden sm:flex ml-auto items-center gap-3 order-2 sm:order-none">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
              <Bookmark className="w-5 h-5" />
            </button>
            <Link
              to="/auth"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-heading font-medium hover:opacity-90 transition-opacity"
            >
              <User className="w-4 h-4" />
              Sign in
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pb-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-body transition-all ${activeTab === tab.label
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
                } ${tab.label === "AI Mode" ? "ml-1 border border-accent/30 " + (activeTab !== tab.label ? "text-accent" : "") : ""}`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col lg:flex-row justify-between gap-6 sm:gap-8">
        {/* Left: results */}
        <div className="w-full lg:max-w-[680px]">
          <p className="text-xs text-muted-foreground mb-4">
            About 2,340,000 results (0.42 seconds)
          </p>

          {/* AI Summary */}
          <motion.div
            className="glass rounded-2xl p-5 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-heading font-semibold text-foreground">AI Overview</span>
            </div>
            <p className="text-sm text-foreground/80 font-body leading-relaxed">
              {query ? `Based on your search for "${query}", here's a summary: ` : ""}
              {KNOWLEDGE_PANEL.summary}
            </p>
            <button
              onClick={() => setAiDetailOpen(true)}
              className="text-primary text-xs font-medium mt-3 hover:underline"
            >
              View Detailed Summary →
            </button>
          </motion.div>

          {/* Results list */}
          {MOCK_RESULTS.map((result, i) => (
            <motion.article
              key={i}
              className="mb-6 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <img 
                  src={getFaviconUrl(result.url)} 
                  alt={`${result.source} icon`} 
                  className="w-4 h-4 rounded-sm object-contain" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="text-xs text-muted-foreground font-body">{result.source}</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground truncate max-w-[300px]">{result.url}</span>
                <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <a href="#" className="text-lg font-heading font-semibold text-primary hover:underline leading-snug">
                {result.title}
              </a>
              <p className="text-sm text-foreground/70 font-body mt-1 leading-relaxed">
                {result.description}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {result.date}
                </span>
                <a href="#" className="flex items-center gap-1 text-xs text-primary hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  Cached
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Right: Knowledge panel */}
        <aside className="hidden lg:block w-[340px] flex-shrink-0">
          <motion.div
            className="glass rounded-2xl p-5 sticky top-36"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-heading text-lg font-bold text-foreground mb-2">
              {KNOWLEDGE_PANEL.title}
            </h2>
            <p className="text-sm text-foreground/70 font-body leading-relaxed mb-4">
              {KNOWLEDGE_PANEL.summary.slice(0, 180)}...
            </p>
            <button className="text-primary text-xs font-medium hover:underline mb-4">
              View Detailed Summary →
            </button>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {KNOWLEDGE_PANEL.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-full h-20 object-cover rounded-lg"
                />
              ))}
            </div>

            <h3 className="font-heading text-sm font-semibold text-foreground mb-2">Related topics</h3>
            <div className="flex flex-wrap gap-2">
              {KNOWLEDGE_PANEL.relatedTopics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-body cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
            <button className="text-primary text-xs font-medium mt-4 hover:underline">
              Find More Topics →
            </button>
          </motion.div>
        </aside>
      </div>


      <AIOverviewDetail open={aiDetailOpen} onClose={() => setAiDetailOpen(false)} query={query} />
    </div>
  );
};

export default SearchResults;
