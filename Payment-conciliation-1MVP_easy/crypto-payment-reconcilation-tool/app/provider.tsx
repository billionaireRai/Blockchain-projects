"use client"

import React, { Suspense } from "react"
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from "@/components/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";

function ProvidersInner({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ToastContainer hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable />
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </div>
  )
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ProvidersInner>{children}</ProvidersInner>
    </Suspense>
  )
}
