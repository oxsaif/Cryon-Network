import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: "primary" | "secondary" | "destructive" | "none";
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glowColor = "none", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-background/50 backdrop-blur-md border border-border rounded-xl shadow-lg relative overflow-hidden transition-all duration-300",
          {
            "hover:border-primary/50": glowColor === "primary",
            "hover:border-secondary/50": glowColor === "secondary",
            "hover:border-destructive/50": glowColor === "destructive",
          },
          className
        )}
        {...props}
      >
        {glowColor !== "none" && (
          <div
            className={cn(
              "absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br",
              {
                "from-primary/10 to-transparent": glowColor === "primary",
                "from-secondary/10 to-transparent": glowColor === "secondary",
                "from-destructive/10 to-transparent": glowColor === "destructive",
              }
            )}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

interface MotionGlassCardProps extends HTMLMotionProps<"div"> {
  glowColor?: "primary" | "secondary" | "destructive" | "none";
}

export const MotionGlassCard = forwardRef<HTMLDivElement, MotionGlassCardProps>(
  ({ className, glowColor = "none", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-background/50 backdrop-blur-md border border-border rounded-xl shadow-lg relative overflow-hidden transition-colors duration-300",
          {
            "hover:border-primary/50": glowColor === "primary",
            "hover:border-secondary/50": glowColor === "secondary",
            "hover:border-destructive/50": glowColor === "destructive",
          },
          className
        )}
        {...props}
      >
        {glowColor !== "none" && (
          <div
            className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none bg-gradient-to-br group-hover:opacity-100",
              {
                "from-primary/10 to-transparent": glowColor === "primary",
                "from-secondary/10 to-transparent": glowColor === "secondary",
                "from-destructive/10 to-transparent": glowColor === "destructive",
              }
            )}
          />
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);
MotionGlassCard.displayName = "MotionGlassCard";
