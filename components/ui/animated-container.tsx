import { motion } from "framer-motion";
import { cn } from "@/lib/theme";
import { type HTMLMotionProps } from "framer-motion";

interface AnimatedContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  animation?: "fade" | "slide" | "stagger";
}

export function AnimatedContainer({
  children,
  className,
  animation = "fade",
  ...props
}: AnimatedContainerProps) {
  const animations = {
    fade: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    slide: {
      initial: { x: -60, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 60, opacity: 0 },
    },
    stagger: {
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
  };

  return (
    <motion.div
      className={cn("w-full", className)}
      {...animations[animation]}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
} 