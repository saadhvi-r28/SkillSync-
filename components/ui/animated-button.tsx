import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/theme";
import { buttonHover } from "@/lib/theme";

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  className?: string;
}

export function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  ...props
}: AnimatedButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8 text-lg",
  };

  return (
    <motion.button
      whileHover={buttonHover}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
        />
      ) : null}
      {children}
    </motion.button>
  );
}

// A variant of the button specifically for icon buttons
export function IconButton({
  children,
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={buttonHover}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full p-2",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
} 