import { useState } from "react";
import { User, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import authIllustration from "@/assets/auth-illustration.png";
import BsearchLogo from "@/components/BsearchLogo";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Background pattern similar to modal */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} />

      {/* Left side - Form (Dynamic) */}
      <motion.div 
        className="w-full lg:w-1/2 flex flex-col pt-6 sm:pt-8 px-6 sm:px-8 pb-10 sm:pb-12 z-10 relative bg-background"
      >
        <div className="mb-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to search
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center mt-12 lg:mt-0">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Link to="/">
                <BsearchLogo size="lg" />
              </Link>
            </div>
            <motion.h1 
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl font-bold text-foreground"
            >
              {mode === "login" ? "Welcome back" : "Create an account"}
            </motion.h1>
            <motion.p 
              key={`${mode}-desc`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-sm mt-3 font-body"
            >
              {mode === "login"
                ? "Sign in securely to your Bsearch account"
                : "Join the next generation search experience"}
            </motion.p>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
            <AnimatePresence mode="popLayout">
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/80 focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-body text-sm transition-all shadow-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/80 focus-within:text-primary transition-colors" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-body text-sm transition-all shadow-sm"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/80 focus-within:text-primary transition-colors" />
              <input
                type="password"
                placeholder="Password"
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-body text-sm transition-all shadow-sm"
              />
            </div>

            {mode === "login" && (
               <div className="flex justify-end pt-1">
                 <button type="button" className="text-xs font-medium text-primary hover:underline transition-all">Forgot password?</button>
               </div>
            )}

            <button
              type="submit"
              className="w-full h-14 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-sm flex items-center justify-center gap-3 hover:opacity-90 transition-all mt-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 focus:scale-[0.98]"
            >
              {mode === "login" ? "Sign In" : "Get Started"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-body">
            <span className="text-muted-foreground">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "login" ? "Create one" : "Sign in here"}
            </button>
          </div>
        </div>

        <div className="mt-auto pt-8 text-center sm:text-left">
          <p className="text-xs text-muted-foreground font-body">
            Powered by <span className="font-heading font-semibold text-foreground">Bsearch</span> &copy; 2026
          </p>
        </div>
      </motion.div>

      {/* Right side - Showcase/Illustration */}
      <div className="hidden lg:flex flex-1 relative bg-secondary items-center justify-center p-12 overflow-hidden z-0 border-l border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary opacity-50" />
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          className="relative max-w-lg w-full z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass p-8 rounded-3xl shadow-2xl border-white/10 relative overflow-hidden bg-card/40">
             {/* decorative backdrop blur shape */}
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
             <img
              src={authIllustration}
              alt="Bsearch Platform"
              className="w-full h-auto object-contain relative z-10 drop-shadow-xl"
            />
          </div>
          <div className="mt-12 text-center relative z-10">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">Intelligence at your fingertips</h2>
            <p className="font-body text-muted-foreground leading-relaxed max-w-sm mx-auto">Connect with our advanced AI to find exactly what you're looking for, faster than ever before.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
