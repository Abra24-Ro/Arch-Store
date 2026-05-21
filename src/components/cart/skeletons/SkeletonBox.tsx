import { motion } from "framer-motion";

export const SkeletonBox = ({ width, height, borderRadius = 4 }: { width: number | string; height: number; borderRadius?: number }) => (
  <motion.div
    style={{ width, height, borderRadius, background: "var(--color-border)" }}
    animate={{ opacity: [0.4, 0.9, 0.4] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
  />
);