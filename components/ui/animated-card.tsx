import { motion } from "framer-motion";
import { cn } from "@/lib/theme";
import { cardHover } from "@/lib/theme";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className,
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={cardHover}
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm transition-all",
        "hover:shadow-md hover:border-primary/50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// A variant of the card specifically for feature highlights
export function FeatureCard({
  children,
  className,
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={cardHover}
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm transition-all",
        "hover:shadow-lg hover:border-primary/50",
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// A variant of the card specifically for statistics or metrics
export function StatCard({
  children,
  className,
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={cardHover}
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm transition-all",
        "hover:shadow-md hover:border-primary/50",
        "bg-gradient-to-br from-card to-card/80",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
} 