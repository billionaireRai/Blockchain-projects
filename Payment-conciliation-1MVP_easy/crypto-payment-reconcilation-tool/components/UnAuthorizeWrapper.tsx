"use client";

import React from "react";
import Link from "next/link";
import Modal from '@/components/Modal';
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheckIcon , ShieldAlert } from "lucide-react";
import useLockBodyScroll from "@/hooks/useLockBody";
import { useAuthState } from "@/states/auth.state";

export default function UnAuthorize({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ;
  const { isAuth } = useAuthState() ;

  const isSecuredUrl = !pathname.startsWith("/auth") && !pathname.startsWith("/marketing/") && pathname !== "/" ;
  const showUnauthorizedModal = !isAuth && isSecuredUrl ;

  useLockBodyScroll(showUnauthorizedModal);

  return (
    <>
      <div className={`${showUnauthorizedModal && "pointer-events-none select-none blur-[2px]"}`}>
        {children}
      </div>
      {showUnauthorizedModal && (
        <Modal>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-required-title"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className=" relative w-full max-w-xl overflow-hidden rounded-3xl border border-white bg-white"
          >
            <div className="relative z-10 py-6 px-8 rounded-3xl">
              {/* Top Badge */}
              <div className="mb-5 py-2 rounded-lg flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2">
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                    Restricted Access
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="text-center">
                <h1
                  id="auth-required-title"
                  className="text-3xl font-bold tracking-tight text-gray-900"
                >
                  Authentication Required
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm text-gray-500">
                  This page <b>( {pathname} )</b> contains protected content that is only available to
                  authenticated users because of contents sensitivity. Log in to continue with seamless reconciliations. 
                </p>
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/login?utm_source=access-denied"
                  className="flex-1 rounded-2xl bg-black border px-6 py-3.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                >
                  Log In
                </Link>

                <Link
                  href="/"
                  className="flex-1 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300
                  "
                >
                  Home
                </Link>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <ShieldCheckIcon />
                <p className="text-xs">
                  Protected by secure authentication and access control.
                </p>
              </div>
            </div>
          </motion.div>
       </Modal>
      )}
    </>
  );
}