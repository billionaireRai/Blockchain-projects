'use client'

import { useLayoutEffect } from "react";

export default function useLockBodyScroll(lock = true) {
  useLayoutEffect(() => {
    if (lock) {
      // Save current scroll position...
      const scrollY = window.scrollY;
      // Lock scroll by fixing body position...
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }

    return () => {
      if (lock) {
        // Restore scroll position...
        const scrollY = parseInt(document.body.style.top || "0", 10) * -1;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      }
    };
  }, [lock]);
}