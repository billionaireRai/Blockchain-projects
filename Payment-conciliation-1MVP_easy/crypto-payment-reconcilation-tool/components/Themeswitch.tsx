"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const Themeswitch = () => {
  const { theme , setTheme } = useTheme() ; // intitializing useTheme hook...
  const isDark = theme === 'dark' ;

  // function for toggling theme...
  function toggleTheme() {
    setTheme(() => isDark ? 'light' : 'dark' );
  }
  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className={`relative flex h-8.5 w-8.5 items-center justify-center rounded-full cursor-pointer transition-colors duration-300 active:scale-95 ${
        isDark
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Moon className="h-5 w-5" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Sun className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default Themeswitch;