import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation variants for Framer Motion
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const slideIn = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 60, opacity: 0 },
};

// Common animation transitions
export const transitions = {
  default: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
  smooth: {
    type: "spring",
    stiffness: 50,
    damping: 20,
  },
  quick: {
    type: "spring",
    stiffness: 200,
    damping: 20,
  },
};

// Common layout animations
export const layoutAnimation = {
  layout: true,
  transition: transitions.smooth,
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: transitions.smooth,
};

// Card hover animation
export const cardHover = {
  scale: 1.02,
  transition: transitions.smooth,
};

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  transition: transitions.quick,
};

// List item animation
export const listItemAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: transitions.smooth,
}; 