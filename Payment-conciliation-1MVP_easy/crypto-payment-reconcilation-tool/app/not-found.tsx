"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Blocks,
  Box,
  Code2,
  Coins,
  Database,
  GitBranch,
  Home,
  LockKeyhole,
  Network,
  Wallet,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

const floatingIcons = [
  { Icon: Wallet, top: "15%", left: "12%", delay: 0 },
  { Icon: Blocks, top: "20%", left: "82%", delay: 0.5 },
  { Icon: Coins, top: "75%", left: "15%", delay: 1 },
  { Icon: Code2, top: "78%", left: "83%", delay: 1.5 },
  { Icon: Database, top: "45%", left: "5%", delay: 2 },
  { Icon: Network, top: "48%", left: "92%", delay: 2.5 },
];

export default function NotFound() {
  const router = useRouter() ;
  return (
    <main className="relative flex min-h-screen font-rubik items-center justify-center overflow-hidden z-0 bg-white px-5 py-16 text-white">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
          backgroundSize: "55px 55px",
          maskImage:
            "radial-gradient(ellipse at center, black 10%, transparent 75%)",
        }}
      />

      {/* Animated background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[130px]"
      />

      {/* Floating Web3 icons */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {floatingIcons.map(({ Icon, top, left, delay }, index) => (
          <motion.div
            key={index}
            style={{ top, left }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0.25, 0.6, 0.25],
              y: [0, -18, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            className="absolute flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-slate-400 backdrop-blur-md"
          >
            <Icon size={25} strokeWidth={1.3} />
          </motion.div>
        ))}
      </div>

      {/* Decorative blockchain connections */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="15%"
          y1="20%"
          x2="35%"
          y2="40%"
          stroke="#6366f1"
          strokeWidth="1"
          strokeDasharray="6 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.line
          x1="80%"
          y1="25%"
          x2="65%"
          y2="45%"
          stroke="#6366f1"
          strokeWidth="1"
          strokeDasharray="6 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </svg>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center"
      >

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-4 py-2 text-xs font-medium tracking-[0.2em] text-indigo-300"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-indigo-400"
          />
          NOT FOUND
        </motion.div>

        {/* Animated 404 */}
        <div className="relative flex items-center justify-center">

          <motion.h1
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="select-none bg-linear-to-b from-white via-slate-300 to-slate-700 bg-clip-text text-[125px] font-black leading-none tracking-[-0.09em] text-transparent sm:text-[190px] md:text-[230px]"
          >
            404
          </motion.h1>

          {/* Floating center block */}
          <motion.div
            animate={{
              y: [0, 100, 0 , 100 , 0],
              x:[-100 , 0 , 100 , 0 , -100],
              scale:[0.8, 1.2 , 0.8 , 1.2 , 0.8],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute flex items-center justify-center rounded-2xl bg-transparent"
          >
            <Image src='/images/ethereum.png' width={100} height={100} alt="Ethereum" />
          </motion.div>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-3xl font-semibold tracking-tight text-gray-300 sm:text-4xl"
        >
          This page no longer exists !!
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base"
        >
          The page you're looking for doesn't exist on paylume.
          It may have been moved, removed, or never exist in the first place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-2 overflow-hidden w-full max-w-3/5 rounded-full sm:border border-gray-200 p-1"
        >
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center sm:flex-1 gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium transition-colors hover:bg-indigo-500"
            >
              <Home size={17} />
              <span>Back to Home</span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.div>
          </Link>

          <motion.button
            type="button"
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center sm:flex-1 gap-2 rounded-full border border-gray-200 text-black cursor-pointer bg-white/4 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50"
          >
            <ArrowLeft size={17} />
            <span>Go Back</span>
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600"
        >
          <span className="flex items-center gap-1.5">
            <LockKeyhole size={13} />
            Decentralized
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-700" />

          <span className="flex items-center gap-1.5">
            <GitBranch size={13} />
            Web3
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-700" />

          <span className="flex items-center gap-1.5">
            <Blocks size={13} />
            Blockchain
          </span>
        </motion.div>
      </motion.div>
    </main>
  );
}