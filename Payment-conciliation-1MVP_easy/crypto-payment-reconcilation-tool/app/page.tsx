'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Activebeep from "@/components/Beep";
import { featureType } from "@/types/feature.type";
import Accuracyscale from "@/public/images/accuracyscale.png";
import ProcessExplain from '@/public/images/process-explain.png';
import HeroImg from '@/public/images/paylume-hero-img.png'
import { Increasingdot } from "@/components/Increasingdot";
import { BarChart3Icon, Link as LINK , LucideVerified , Zap, ShieldCheck, Activity,BarChart3 ,Clock3,LockKeyhole , ArrowUpCircleIcon, FunctionSquareIcon , Plug, Database, GitCompareArrows, SearchCheck, CircleAlert, FileCheck2, LucideHandshake, LucideRocket, LockKeyholeOpenIcon, ChartBarIncreasingIcon, TriangleAlertIcon, LucideLayoutDashboard, ActivitySquareIcon, ShieldCheckIcon, CircleCheckIcon, LogsIcon } from "lucide-react";
import { handleScrollToTop } from "@/lib/Autoscroll";
import { keyValuePair } from "@/types/keyvalue.type";

export default function Home() {  
  const [LoginHover, setLoginHover] = useState<boolean>(false);
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
    icon: <LINK size={40} />,
    title: "Multi-Wallet Support",
    explanation:
      "Reconcile transactions across multiple wallets from one platform.",
  },
  {
    icon: <Zap size={40} />,
    title: "Automated Matching",
    explanation:
      "Automatically match blockchain transactions with internal payment records and identify discrepancies.",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Fraud & Risk Detection",
    explanation:
      "Identify suspicious transactions, unexpected activity, and anomalies before they become financial issues.",
  },
  {
    icon: <Activity size={40} />,
    title: "Real-Time Tracking",
    explanation:
      "Track payment confirmations, transaction states, and reconciliation progress across connected networks.",
  },
  {
    icon: <BarChart3 size={40} />,
    title: "Detailed Reporting",
    explanation:
      "Generate clear reconciliation reports with matched, unmatched, pending, and disputed transactions.",
  },
  {
    icon: <Plug size={40} />,
    title: "Easy Integrations",
    explanation:
      "Connect exchanges, wallets, payment providers, and internal systems through secure APIs.",
  },
  {
    icon: <Clock3 size={40} />,
    title: "Scheduled Reconciliation",
    explanation:
      "Automatically run reconciliation workflows at scheduled intervals using background jobs and queues.",
  },
  {
    icon: <LockKeyhole size={40} />,
    title: "Enterprise Security",
    explanation:
      "Protect financial data with secure access controls, encrypted communication, and reliable audit trails.",
  },
];

const processes:featureType[] = [
  {
    step: 1,
    icon: <Plug size={40} />,
    title: "Connect Your Sources",
    explanation:
      "Connect your wallets, blockchains, exchanges, and payment sources to the platform.",
  },
  {
    step: 2,
    icon: <Database size={40} />,
    title: "Collect Transaction Data",
    explanation:
      "Automatically fetch and synchronize transaction data from all connected sources.",
  },
  {
    step: 3,
    icon: <GitCompareArrows size={40} />,
    title: "Match Transactions",
    explanation:
      "Compare blockchain transactions with your internal payment and financial records.",
  },
  {
    step: 4,
    icon: <SearchCheck size={40} />,
    title: "Verify Payment Records",
    explanation:
      "Validate transaction amounts, statuses, addresses, timestamps, and confirmations.",
  },
  {
    step: 5,
    icon: <CircleAlert size={40} />,
    title: "Detect Discrepancies",
    explanation:
      "Identify missing, unmatched, duplicate, or suspicious transactions that require attention.",
  },
  {
    step: 6,
    icon: <FileCheck2 size={40} />,
    title: "Complete Reconciliation",
    explanation:
      "Finalize the reconciliation process and generate clear, accurate records and reports.",
  },
];

const scalemetrics:keyValuePair[] = [
    {
      value: "99.9%",
      label: "Target Match Accuracy",
    },
    {
      value: "1K+",
      label: "Transactions / Min",
    },
    {
      value: "24/7",
      label: "Automated Processing",
    },
  ]

const VisibilityPoints:featureType[] = [
  {
    step:1,
    icon:<ActivitySquareIcon size={25} />,
    title: "Live Transaction Status",
    explanation: "Monitor matched, pending, and unmatched transactions in real time.",
  },
  {
    step:2,
    icon:<TriangleAlertIcon size={25} />,
    title: "Instant Discrepancy Detection",
    explanation: "Identify unusual, duplicate, or unmatched transactions quickly.",
  },
  {
    step:3,
    icon:<LucideLayoutDashboard size={25} />,
    title: "Clear Reconciliation Insights",
    explanation: "Understand reconciliation progress with simple, actionable metrics.",
  },
];
 
const SecurityFeatures:featureType[] = [
  {
    icon:<LockKeyhole size={25} />,
    title: "Secure Access",
    explanation:
      "Control access to reconciliation data and operations with authenticated users and protected APIs.",
  },
  {
    icon:<CircleCheckIcon size={25} />,
    title: "Transaction Validation",
    explanation:
      "Validate transaction details before records are matched, reconciled, or marked complete.",
  },
  {
    icon:<ShieldCheckIcon size={25} />,
    title: "Data Protection",
    explanation:
      "Protect sensitive application and transaction data throughout the reconciliation workflow.",
  },
  {
    icon:<LogsIcon size={25} />,
    title: "Audit-Ready Records",
    explanation:
      "Maintain traceable reconciliation activity so every important operation can be reviewed.",
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
         <Link href="/auth/register" className="hover:opacity-95 p-3 flex items-center justify-center gap-3 rounded-full flex-1 bg-black text-white cursor-pointer text-lg font-semibold">
            <span>Get Started</span><LucideRocket size={25}/>
         </Link>
         <Link onMouseEnter={() => { setLoginHover(true) }} onMouseLeave={() => { setLoginHover(false) }} href="/auth/login" className="p-3 flex items-center justify-center gap-3 rounded-full flex-1 bg-gray-100 hover:bg-gray-150 cursor-pointer font-semibold">
            <span>Login</span>{LoginHover ? <LockKeyholeOpenIcon size={25}/> : <LockKeyhole size={25} />}
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
     <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center w-full rounded-lg mb-20">
      <div className="flex-1 rounded-lg p-4 h-full">
        <div className="flex flex-col justify-start rounded-lg">
          <div className="mb-5 w-fit flex items-center gap-2 rounded-full border border-red-600/30 bg-red-500/5 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-red-600">
           <FunctionSquareIcon />
           <span>HOW PAYLUME WORKS</span>
          </div>
          <div className="flex flex-col items-start justify-center">
           <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
            From Transaction to
            <div className="text-red-600">
              <span>Trusted Reconciliations</span>
              <Increasingdot Number={4} Color="red"/>
            </div>
           </h2>
           <p className="mt-6 max-w-2xl text-xs leading-6 text-gray-500 md:text-base">
            Connect your wallets and payment sources, automatically match transactions,identify discrepancies, and keep your financial records synchronized through a reliable end-to-end reconciliation workflow.
           </p>
          </div>
          <div className="flex flex-col gap-1 items-center rounded-xl p-3">
            {processes.map((process,idx) => (
              <div key={idx} className="flex items-center justify-start gap-3 max-w-4/5 rounded-xl py-3 px-5">
                <span className="flex h-11 w-11 p-2 items-center justify-center rounded-full border border-red-600 bg-red-500/6 text-red-600 ring-4 ring-red-500/10 transition-all duration-300"
                >
                {process.icon}
                </span>
                <span className="text-gray-400">{process.step}.</span>
                <section>
                  <span className="font-semibold">{process.title}</span>
                  <p className="text-gray-400 text-sm">{process.explanation}</p>
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg">
        <Image src={ProcessExplain} alt="Process-Explain-Img" className="rounded-lg" />
      </div>
     </div>
     <div className="flex flex-col lg:flex-row-reverse items-start lg:items-center justify-center w-full rounded-lg mb-20">
      <div className="flex-1 rounded-lg px-4 h-full">
        <div className="flex flex-col items-start justify-center rounded-lg">
          <div className="mb-5 w-fit flex items-center gap-2 rounded-full border border-red-600/30 bg-red-500/5 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-red-600">
           <LucideHandshake />
           <span>BUILT FOR RELIABLE RECONCILIATION</span>
          </div>
          <div className="flex flex-col items-start justify-center">
           <h2 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
            Built for Accuracy.
            <div className="text-red-600">
              <span>Designed to Scale.</span>
              <Increasingdot Number={4} Color="red"/>
            </div>
           </h2>
           <p className="mt-6 max-w-xl text-xs leading-6 text-gray-500 md:text-base">
           Handle high-volume crypto transactions with confidence. Automated workflows keep your records synchronized while making reconciliation faster, more reliable, and easier to manage.
           </p>
          </div>
          <div className="flex gap-1 items-center justify-evenly rounded-xl p-2 w-full">
            {scalemetrics.map((m) => (
              <div className="hover:shadow-sm group flex flex-col items-center justify-center gap-1 flex-1 p-2 rounded-xl">
                <div className="text-xl md:text-2xl lg:text-3xl flex items-center justify-center gap-2 font-semibold"><span>{m.value}</span><ChartBarIncreasingIcon size={15} className="text-red-600 opacity-0 transition-opacity group-hover:opacity-100 duration-200" /></div>
                <span className="text-sm text-gray-400">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg">
        <Image src={Accuracyscale} alt="Accuracy-scale" className="rounded-lg" />
      </div>
     </div>
     <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center w-full rounded-lg mb-20">
      <div className="flex-1 rounded-lg px-4 h-full">
        <div className="flex flex-col items-start justify-center rounded-lg">
          <div className="mb-5 w-fit flex items-center gap-2 rounded-full border border-red-600/30 bg-red-500/5 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-red-600">
           <LucideHandshake />
           <span>REAL-TIME VISIBILITY</span>
          </div>
          <div className="flex flex-col items-start justify-center">
           <h2 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
            Know What's going with
            <div className="text-red-600">
              <span>Every Transaction.</span>
              <Increasingdot Number={4} Color="red"/>
            </div>
           </h2>
           <p className="mt-6 max-w-xl text-xs leading-6 text-gray-500 md:text-base">
            Track transaction activity, monitor reconciliation progress, and identify discrepancies as they happen — all from one centralized view.    
           </p>
          </div>
          <div className="flex gap-1 items-center justify-evenly rounded-xl p-2 w-full">
            {scalemetrics.map((m) => (
              <div className="hover:shadow-sm group flex flex-col items-center justify-center gap-1 flex-1 p-2 rounded-xl">
                <div className="text-xl md:text-2xl lg:text-3xl flex items-center justify-center gap-2 font-semibold"><span>{m.value}</span><ChartBarIncreasingIcon size={15} className="text-red-600 opacity-0 transition-opacity group-hover:opacity-100 duration-200" /></div>
                <span className="text-sm text-gray-400">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 items-center rounded-xl p-3">
            {VisibilityPoints.map((v) => (
              <div className="flex items-center justify-start gap-3 max-w-4/5 rounded-xl py-3 px-5">
                <span className="flex h-11 w-11 p-2 items-center justify-center rounded-full border border-red-600 bg-red-500/6 text-red-600 ring-4 ring-red-500/10 transition-all duration-300"
                >
                {v.icon}
                </span>
                <span className="text-gray-400">{v.step}.</span>
                <section>
                  <span className="font-semibold">{v.title}</span>
                  <p className="text-gray-400 text-sm">{v.explanation}</p>
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg">
        {/* need to change this image... */}
        <Image src={Accuracyscale} alt="Accuracy-scale" className="rounded-lg" />
      </div>
     </div>
     <div className="flex flex-col lg:flex-row-reverse items-start lg:items-center justify-center w-full rounded-lg mb-20">
      <div className="flex-1 rounded-lg px-4 h-full">
        <div className="flex flex-col items-start justify-center rounded-lg">
          <div className="mb-5 w-fit flex items-center gap-2 rounded-full border border-red-600/30 bg-red-500/5 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-red-600">
           <LucideHandshake />
           <span>SECURITY & RELIABILITY</span>
          </div>
          <div className="flex flex-col items-start justify-center">
           <h2 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
            Built to Protect Every Transaction.
            <div className="text-red-600">
              <span>Secure by Infrastructure & logic.</span>
              <Increasingdot Number={4} Color="red"/>
            </div>
           </h2>
           <p className="mt-6 max-w-xl text-xs leading-6 text-gray-500 md:text-base">
            Protect sensitive transaction data with secure access controls, validated processing, and reliable reconciliation workflows built for financial-grade operations.    
           </p>
          </div>
          <div className="flex flex-col gap-1 items-center rounded-xl p-3">
            {SecurityFeatures.map((F) => (
              <div className="flex items-center justify-start gap-3 max-w-4/5 rounded-xl py-3 px-5">
                <span className="flex h-11 w-11 p-2 items-center justify-center rounded-full border border-red-600 bg-red-500/6 text-red-600 ring-4 ring-red-500/10 transition-all duration-300"
                >
                {F.icon}
                </span>
                <span className="text-gray-400">{F.step}.</span>
                <section>
                  <span className="font-semibold">{F.title}</span>
                  <p className="text-gray-400 text-sm">{F.explanation}</p>
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg">
        {/* need to change this image... */}
        <Image src={Accuracyscale} alt="Accuracy-scale" className="rounded-lg" />
      </div>
     </div>


     <span onClick={() => { handleScrollToTop('scrollsec') }} className="fixed left-1/2 bottom-2 hover:scale-101 hover:bg-red-50 p-1 rounded-full cursor-pointer backdrop-blur-md">
      <ArrowUpCircleIcon size={40} />
    </span>
    </div>
  );
}
