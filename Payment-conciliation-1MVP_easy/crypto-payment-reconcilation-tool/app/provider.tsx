"use client"

import React, { Suspense } from "react"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function ProvidersInner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable />
      {children}
    </>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ProvidersInner>{children}</ProvidersInner>
    </Suspense>
  )
}
