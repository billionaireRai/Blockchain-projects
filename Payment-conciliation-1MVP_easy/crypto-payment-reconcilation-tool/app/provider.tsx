"use client"

import React, { Suspense } from "react"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function ProvidersInner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        position="top-right"
        theme="light"
        autoClose={3000}
        pauseOnFocusLoss
        limit={5}
        toastClassName="custom-toast"
        progressClassName="custom-toast-progress"
      />
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
