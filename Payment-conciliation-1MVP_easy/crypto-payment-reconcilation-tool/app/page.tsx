'use client'

import Link from "next/link";
import Image from "next/image";
import Activebeep from "@/components/Beep";
import { featureType } from "@/types/feature.type";
import ProcessExplain from '@/public/images/process-explain.png';
import HeroImg from '@/public/images/paylume-hero-img.png'
import { Increasingdot } from "@/components/Increasingdot";
import { BarChart3Icon, Link as LINK , LucideVerified , Zap, ShieldCheck, Activity,BarChart3,Plug,Clock3,LockKeyhole , ArrowUpCircleIcon, FunctionSquareIcon } from "lucide-react";
import { handleScrollToTop } from "@/lib/Autoscroll";

export default function Home() {  
  const Corefeatures : featureType[] = [
    {
      icon:<LucideVerified size={40} className="text-red-600" />,
      title:'Periodic-Sync',
      explanation:"Periodic real-time transaction monitoring on ethereum blockchain."
    },
    {
      icon:<LINK size={40} className="text-red-600" />,
      title:'Auto-Reconcile',
      explanation:"Match payments with created invoices & get notified."
    },
    {
      icon:<BarChart3Icon size={40} className="text-red-600" />,
      title:'Get Analytics',
      explanation:'Powerfull statistical insights from your transactions'
    }
  ] 

const Keyfeatures: featureType[] = [
  {
    icon: <LINK className="h-5 w-5" />,
    title: "Multi-Wallet Support",
    explanation:
      "Reconcile transactions across multiple wallets from one platform.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Automated Matching",
    explanation:
      "Automatically match blockchain transactions with internal payment records and identify discrepancies.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Fraud & Risk Detection",
    explanation:
      "Identify suspicious transactions, unexpected activity, and anomalies before they become financial issues.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Real-Time Tracking",
    explanation:
      "Track payment confirmations, transaction states, and reconciliation progress across connected networks.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Detailed Reporting",
    explanation:
      "Generate clear reconciliation reports with matched, unmatched, pending, and disputed transactions.",
  },
  {
    icon: <Plug className="h-5 w-5" />,
    title: "Easy Integrations",
    explanation:
      "Connect exchanges, wallets, payment providers, and internal systems through secure APIs.",
  },
  {
    icon: <Clock3 className="h-5 w-5" />,
    title: "Scheduled Reconciliation",
    explanation:
      "Automatically run reconciliation workflows at scheduled intervals using background jobs and queues.",
  },
  {
    icon: <LockKeyhole className="h-5 w-5" />,
    title: "Enterprise Security",
    explanation:
      "Protect financial data with secure access controls, encrypted communication, and reliable audit trails.",
  },
];

  return (
    <div className="flex flex-col flex-1 h-fit m-1 rounded-lg items-center justify-between font-rubik">
     <div className="HERO-SECTION flex flex-col lg:flex-row h-fit w-full gap-1 mb-20 rounded-lg">
      <div className="HERO-LEFT rounded-lg h-full flex flex-col justify-center gap-1.5 flex-1 p-1">
        <div className="TOP-TITLE border border-red-600/60 ring-3 ring-red-500/10 text-sm rounded-full text-red-600 flex gap-3 items-center justify-between h-10 w-fit p-4">
          <Activebeep />
          <span>CRYPTO PAYMENT RECONCILIATION</span>
        </div>
        <div className="HERO_TITLE rounded-lg p-2 font-semibold">
          <section className="text-6xl">
            Reconcile Every <span className="text-red-600">Ethereum</span> Crypto Payment 
            <div className="text-red-600 flex items-baseline"><span>Automatically</span><Increasingdot Number={4} Color="red" /></div>
          </section>
        </div>
        <div className="FEATURE-SECTION rounded-lg gap-1 flex">
          {Corefeatures.map((f,idx) => (
            <div key={idx} className="group flex flex-col items-start gap-4 rounded-2xl border border-transparent p-5 transition-all duration-300 ease-out hover:border-gray-100 hover:bg-gray-50/80 hover:shadow-sm dark:hover:border-white/10 dark:hover:bg-white/4"
            >
              <div className="flex h-11 w-11 p-2 items-center justify-center rounded-full border border-red-600 bg-red-500/6 text-red-600 ring-4 ring-red-500/10 transition-all duration-300 group-hover:scale-105 group-hover:border-red-600/30 group-hover:bg-red-500/10 group-hover:ring-red-500/8"
              >
                {f.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                 {f.title}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {f.explanation}
                </p>
              </div>
           </div>
          ))}
        </div>
        <div className="p-1 flex items-center justify-start rounded-full gap-1">
         <Link href="/auth/register" className="hover:opacity-95 p-3 text-center rounded-full flex-1 bg-black text-white cursor-pointer text-lg font-semibold">
            Get Started
         </Link>
         <Link href="/auth/login" className="p-3 text-center rounded-full flex-1 bg-gray-100 hover:bg-gray-150 cursor-pointer font-semibold">
            Login
         </Link>
        </div>
      </div>
      <div className="HERO-IMAGE dark:invert rounded-lg h-full flex-2 overflow-hidden">
        <Image src={HeroImg} alt="Hero-Img" />
      </div>
     </div>
     <div className="rounded-lg w-full p-3 mb-20">
      <div className="w-full flex flex-col items-center justify-center gap-3 mb-10 text-center px-4">
        <div className="mb-5 flex items-center gap-2 rounded-full border border-red-600/30 bg-red-500/5 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-red-600">
         <FunctionSquareIcon />
         <span>KEY FEATURES</span>
        </div>
        <h2 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
          Everything You Need For{" "}
          <div className="text-red-600 flex">
            <span>Seamless Crypto Reconciliation</span><Increasingdot Number={4} Color="red"/>
          </div>
        </h2>
        <p className="mt-6 max-w-2xl text-xs leading-6 text-gray-500 md:text-base">
          Automate, verify, and reconcile your crypto payments across
          blockchains, exchanges, and wallets — all from one powerful platform.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
       {Keyfeatures.map((f,idx) => (
        <div key={idx} className="group flex flex-col items-start gap-4 rounded-2xl border border-transparent p-5 transition-all duration-300 ease-out hover:border-gray-100 hover:bg-gray-50/80 hover:shadow-sm dark:hover:border-white/10 dark:hover:bg-white/4"
        >
          <div className="flex h-11 w-11 p-2 items-center justify-center rounded-full border border-red-600 bg-red-500/6 text-red-600 ring-4 ring-red-500/10 transition-all duration-300 group-hover:scale-105 group-hover:border-red-600/30 group-hover:bg-red-500/10 group-hover:ring-red-500/8"
              >
            {f.icon}
           </div>
           <div className="flex flex-col gap-1.5">
             <span className="text-base font-semibold text-gray-900 dark:text-white">
              {f.title}
             </span>
             <p className="text-sm text-gray-500 dark:text-gray-400">
               {f.explanation}
             </p>
           </div>
        </div>
       ))}
      </div>
     </div>
     <div className="flex flex-col lg:flex-row items-center justify-center w-full rounded-lg">
      <div className="flex-1 rounded-lg p-2 h-full">
        <div className="flex flex-col justify-start rounded-lg">
          <div className="mb-5 w-fit flex items-center gap-2 rounded-full border border-red-600/30 bg-red-500/5 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-red-600">
           <FunctionSquareIcon />
           <span>HOW PAYLUME WORKS</span>
          </div>
          <div>
           <h2 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
            From Transaction to{" "}
            <div className="text-red-600">
              <span>Trusted Reconciliations</span>
              <Increasingdot Number={4} Color="red"/>
            </div>
           </h2>
           <p className="mt-6 max-w-2xl text-xs leading-6 text-gray-500 md:text-base">
            Connect your wallets and payment sources, automatically match transactions,identify discrepancies, and keep your financial records synchronized through a reliable end-to-end reconciliation workflow.
           </p>

          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg h-full overflow-hidden">
        <Image src={ProcessExplain} alt="Process-Explain-Img" />
      </div>
     </div>

     <span onClick={() => { handleScrollToTop('scrollsec') }} className="fixed left-1/2 bottom-2 hover:scale-101 hover:bg-red-50 p-1 rounded-full cursor-pointer backdrop-blur-md">
      <ArrowUpCircleIcon size={40} />
    </span>
    </div>
  );
}
