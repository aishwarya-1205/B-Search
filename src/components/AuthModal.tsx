import { useState } from "react";
import { X, User, Lock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import authIllustration from "@/assets/auth-illustration.png";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl mx-4 rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }} />

            <div className="relative flex min-h-[520px]">
              {/* Left side - Form */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-8 sm:py-10">
                <button
                  onClick={onClose}
                  className="absolute top-5 left-5 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-full max-w-sm">
                  <h2 className="font-heading text-2xl font-bold text-foreground text-center">
                    {mode === "login" ? "Welcome to Bsearch" : "Join Bsearch"}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2 text-center font-body">
                    {mode === "login"
                      ? "Sign in to your account"
                      : "Create your free account"}
                  </p>

                  <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
                    {mode === "signup" && (
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/80 focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          placeholder="Full name"
                          className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-body text-sm transition-all"
                        />
                      </div>
                    )}
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/80 focus-within:text-primary transition-colors" />
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-body text-sm transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/80 focus-within:text-primary transition-colors" />
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-body text-sm transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-14 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-sm flex items-center justify-center gap-3 hover:opacity-90 transition-opacity mt-6 shadow-lg shadow-primary/20"
                    >
                      {mode === "login" ? "Login" : "Create Account"}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <span className="text-muted-foreground text-sm font-body">
                      {mode === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    </span>{" "}
                    <button
                      onClick={() => setMode(mode === "login" ? "signup" : "login")}
                      className="text-primary font-semibold text-sm hover:underline"
                    >
                      {mode === "login" ? "Sign up" : "Sign in"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right side - Illustration */}
              <div className="hidden md:flex flex-1 items-center justify-center p-8">
                <img
                  src={authIllustration}
                  alt="Bsearch illustration"
                  className="w-full max-w-md object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="relative text-center pb-5">
              <p className="text-xs text-muted-foreground font-body">
                Powered by <span className="font-heading font-semibold text-foreground">Bsearch</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
