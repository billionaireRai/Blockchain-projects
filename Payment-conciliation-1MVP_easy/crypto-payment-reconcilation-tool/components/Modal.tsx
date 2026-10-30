"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  showPop: boolean;
}

export default function Modal({ children, showPop }: ModalProps) {
  return (
    <AnimatePresence mode="wait">
      {showPop && (
        <motion.div
          // Backdrop animation
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, y: 15, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
            className="relative flex max-h-full w-full items-center justify-center"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}