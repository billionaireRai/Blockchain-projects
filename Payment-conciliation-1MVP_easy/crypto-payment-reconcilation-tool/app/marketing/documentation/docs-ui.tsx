"use client";



import React, { useState , useRef , useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/paylume-logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Blocks, Check, ChevronRight, Clock, Copy, Database, FileCode2, Fingerprint, GitBranch, Globe, KeyRound, LockKeyhole, Network, Server, ShieldCheck ,Wallet, AlertTriangle, Layers, Zap,ShieldCheck as ShieldCheckIcon, AlertCircle, Cookie, } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TerminalStatus = "idle" | "copied" | "error" ;

const reconciliationFlow : string[] = [
  "A payment expectation is created (amount, recipient, asset, network, reference)",
  "The customer sends an Ethereum transfer from their wallet",
  "The transaction is broadcast and appears as pending",
  "Paylume looks up the transaction by hash through an Ethereum RPC provider",
  "The receipt is read: status, block number, gas used, logs",
  "Matching rules compare observed data with the expectation",
  "Confirmations are counted until the policy threshold is reached",
  "The payment record is marked reconciled and the result is stored"
];



const matchingRules: { icon: LucideIcon; rule: string; check: string }[] = [

  { icon: Network, rule: "Network", check: "The transaction's chain ID must equal the chain the payment expects. A transfer on another network never matches." },

  { icon: Wallet, rule: "Recipient", check: "The `to` address is compared with the expected address after normalizing case/checksum." },

  { icon: Layers, rule: "Asset", check: "Native ETH transfers are read from `value`. Token transfers would be read from transfer event logs instead." },

  { icon: Zap, rule: "Amount", check: "Compared in wei using integer (BigInt) math, never floating point, to avoid rounding errors." },

  { icon: Check, rule: "Execution status", check: "The receipt must show success. A mined but reverted transaction is not a payment." },

  { icon: Clock, rule: "Confirmations", check: "Current block minus inclusion block must reach the configured threshold before the payment is final." },

  { icon: Fingerprint, rule: "Uniqueness", check: "A transaction hash can satisfy only one payment, preventing the same transfer being claimed twice." }

];



const paymentStates = [

  { name: "Pending", detail: "Expectation exists; no matching transaction observed yet.", tone: "bg-slate-100 text-slate-600" },

  { name: "Detected", detail: "A candidate transaction was found and is being evaluated.", tone: "bg-amber-50 text-amber-700" },

  { name: "Confirming", detail: "Rules pass; waiting for enough block confirmations.", tone: "bg-blue-50 text-blue-700" },

  { name: "Reconciled", detail: "All rules satisfied and finality threshold reached.", tone: "bg-emerald-50 text-emerald-700" },

  { name: "Mismatch", detail: "Transaction found but amount, recipient, asset or network differs.", tone: "bg-red-50 text-red-700" },

  { name: "Failed", detail: "Transaction reverted or was dropped from the network.", tone: "bg-red-50 text-red-700" }

];



const authFlow = [

  { side: "Browser", step: "User clicks connect; RainbowKit opens the wallet picker and Wagmi exposes the public address." },

  { side: "Browser", step: "Frontend sends the address to the backend and asks for a sign-in challenge." },

  { side: "Server", step: "Backend generates a random single-use nonce, stores it with the address and an expiry time." },

  { side: "Server", step: "Backend returns a human-readable message containing the domain, address, nonce and timestamp." },

  { side: "Wallet", step: "The wallet shows the message; the user signs it. The private key never leaves the wallet." },

  { side: "Browser", step: "Frontend posts the message and signature to the backend." },

  { side: "Server", step: "Backend recovers the signer address from the signature (Viem) and compares it with the claimed address." },

  { side: "Server", step: "Nonce is checked (exists, unused, unexpired, matches message) and then consumed so it cannot be replayed." },

  { side: "Server", step: "A session is created and set as an HTTP-only, Secure, SameSite cookie. The user is now signed in." }

];



const layers = [

  { icon: Globe, tag: "LAYER 01", title: "Presentation", name: "Next.js · React · Tailwind", detail: "Pages, dashboard, forms, animations. Holds no secrets and makes no trusted decisions." },

  { icon: Wallet, tag: "LAYER 02", title: "Wallet", name: "RainbowKit · Wagmi", detail: "Connects the user's wallet and requests signatures. Identity proof only, not an app session." },

  { icon: Server, tag: "LAYER 03", title: "Application", name: "Node.js API", detail: "Verifies signatures, manages sessions, validates input, enforces ownership, runs reconciliation." },

  { icon: Database, tag: "LAYER 04", title: "Persistence", name: "MongoDB", detail: "Users, wallets, nonces, payment expectations, transaction references and statuses." },

  { icon: Blocks, tag: "LAYER 05", title: "Blockchain", name: "Viem · Ethereum RPC", detail: "Reads transactions, receipts and block numbers. The source of truth for what happened on-chain." }

];



const dataModel = [
  {
    icon: Fingerprint,
    title: "users",
    fields:
      "id, email, displayName, avatarUrl, accountStatus, createdAt, updatedAt"
  },
  {
    icon: Wallet,
    title: "wallets",
    fields:
      "id, userId (FK), address (normalized), chainId, isPrimary, linkedAt, updatedAt"
  },
  {
    icon: KeyRound,
    title: "nonces",
    fields:
      "id, walletAddress, nonce, message, expiresAt, usedAt, createdAt"
  },
  {
    icon: FileCode2,
    title: "payments",
    fields:
      "id, userId (FK), paymentReference, expectedAmount, recipientAddress, assetAddress, assetSymbol, chainId, status, expiresAt, createdAt, updatedAt"
  },
  {
    icon: Database,
    title: "transactions",
    fields:
      "id, paymentId (FK), transactionHash, chainId, fromAddress, toAddress, value, tokenAddress, blockNumber, blockHash, receiptStatus, confirmationCount, detectedAt, verifiedAt"
  }
];

const stack = [
  {
    group: "Frontend",
    icon: <Image src='/images/ui-design.png' width={80} height={80} alt='frontend' />,
    tools: [
      {
        logo: <Image src='/svg/nextjs.svg' width={40} height={40} alt='nextjs' />,
        tool: "Next.js",
        description:
          "Core application framework responsible for file-based routing, layouts, navigation, and application rendering. Uses React Server and Client Components to separate server-side operations from interactive UI, with API routes deployed and hosted through Vercel."
      },
      {
        logo: <Image src='/images/react.png' width={40} height={40} alt='react' />,
        tool: "React",
        description:
          "Component-based UI library used to build the dashboard, payment management interfaces, authentication flows, forms, reusable components, and other interactive client-side experiences."
      },
      {
        logo: <Image src='/images/typescript.png' width={40} height={40} alt='typescript' />,
        tool: "TypeScript",
        description:
          "Provides static type checking across the application, helping maintain consistent data structures, API request and response contracts, wallet interactions, transaction objects, and payment reconciliation logic while reducing runtime errors."
      },
      {
        logo: <Image src='/images/tailwind-css.png' width={40} height={40} alt='tailwind' />,
        tool: "Tailwind CSS",
        description:
          "Utility-first CSS framework used to build responsive interfaces, maintain consistent spacing, typography, colors, and component styling, and create a unified design system across the application."
      },
      {
        logo: <Image src='/images/framer-motion.png' width={40} height={40} alt='framer-motion' />,
        tool: "Framer Motion",
        description:
          "Animation library used to implement smooth page transitions, interactive component animations, modal transitions, loading states, and micro-interactions that improve the overall user experience."
      },
      {
        logo: <Image src='/images/zustand.png' width={40} height={40} alt='zustand' />,
        tool: "Zustand",
        description:
        "Lightweight state management library used to manage and share global application state across React components without prop drilling. Provides centralized stores with simple hooks for accessing and updating state, making it suitable for managing wallet connection status, user session information, dashboard data, and other shared UI states."
      },
      {
        logo: <Image src='/images/lucid-react.png' width={40} height={40} alt='lucid-react' />,
        tool: "Lucide React",
        description:
          "Lightweight and customizable icon library used throughout the dashboard, navigation, forms, status indicators, action buttons, and other interface components to maintain consistent visual communication."
      }
    ]
  },
  {
    group: "Web3",
    icon: <Image src='/images/wallet-icon.png' width={80} height={80} alt='web3' />,
    tools: [
      {
        logo: <Image src='/images/rainbowkit.png' width={40} height={40} alt="rainbowkit" />,
        tool: "RainbowKit",
        description:
          "Wallet connection interface that provides a ready-to-use modal for connecting Ethereum wallets such as MetaMask. Handles wallet selection, connection experience, and integration with the application's Web3 provider configuration."
      },
      {
        logo: <Image src='/images/wagmi.png' width={40} height={40} alt="wagmi" />,
        tool: "Wagmi",
        description:
          "React hooks and utilities used to manage wallet connectivity, account information, active blockchain networks, wallet state, and message-signing interactions. Acts as the primary connection layer between React components and Ethereum wallet functionality."
      },
      {
        logo: <Image src='/images/viem.png' width={40} height={40} alt="viem" />,
        tool: "Viem",
        description:
          "Type-safe Ethereum interaction library used for communicating with blockchain clients, reading on-chain data, parsing transaction values, formatting token amounts, retrieving transaction receipts, and performing cryptographic signature verification."
      },
      {
        logo: <Image src='/images/ethereum.png' width={40} height={40} alt="ethereum" />,
        tool: "Ethereum RPC",
        description:
          "Blockchain communication endpoint used to access Ethereum network data. Allows the application to retrieve transaction details, receipts, block information, confirmation counts, and other publicly accessible on-chain information required for payment verification and reconciliation."
      }
    ]
  },
  {
    group: "Backend & Database",
    icon: <Image src='/images/database.png' width={80} height={80} alt='backend-database' />,
    tools: [
      {
        logo: <Image src='/svg/nodejs.svg' width={40} height={40} alt="nodejs" />,
        tool: "Node.js",
        description:
          "JavaScript runtime powering the backend execution environment and payment reconciliation logic. Handles incoming API requests, wallet authentication workflows, transaction validation, business rules, and communication with external blockchain services."
      },
      {
        logo: <Image src='/svg/postgreSQL.svg' width={40} height={40} alt="postgresql" />,
        tool: "PostgreSQL",
        description:
          "SQL database responsible for storing application data, including user profiles, wallet addresses, authentication nonces, payment requests, expected payment details, transaction records, and reconciliation statuses. Its document-based structure supports flexible payment data management."
      },
      {
        logo: <Image src='/images/typescript.png' width={40} height={40} alt='typescript' />,
        tool: "TypeScript",
        description:
          "Provides static type checking across the application, helping maintain consistent data structures, API request and response contracts, wallet interactions, transaction objects, and payment reconciliation logic while reducing runtime errors."
      },
      {
        logo: <Cookie size={40} />,
        tool: "Session Cookies",
        description:
          "HTTP-only cookie-based session management used to maintain authenticated user sessions after successful wallet-signature verification. Session tokens are sent automatically with eligible browser requests, while HTTP-only access prevents client-side JavaScript from directly reading the authentication cookie."
      },
      {
        logo: <Image src='/images/prisma.png' width={40} height={40} alt='prisma' />,
        tool: "Prisma ORM",
        description:"Type-safe ORM used to interact with PostgreSQL through a structured data model. Handles database queries, relationships, schema definitions, and database migrations, providing a consistent and maintainable data access layer between the backend services and the database."
      },
      {
        logo: <Image src='/images/jwt.png' width={40} height={40} alt='jsonwebtoken' />,
        tool: "JSON Web Tokens (JWT)",
        description:
        "Token-based authentication mechanism used to establish and validate authenticated user sessions after successful wallet-signature verification. The backend signs JWTs containing relevant user claims, and verifies them on protected API requests. Tokens are delivered through HTTP-only cookies to reduce exposure to client-side JavaScript."
      },
      {
        logo: <Image src='/images/bullMQ.png' width={40} height={40} alt='bullmq' />,
        tool: "BullMQ",
        description:
        "Redis-backed job queue used to process asynchronous background tasks outside the main request-response cycle. Supports job scheduling, retries, delayed execution, and worker-based processing, making it suitable for payment verification, transaction reconciliation, and retrying temporary blockchain RPC failures without blocking API requests."
      },
      {
        logo: <Image src='/images/cron.png' width={40} height={40} alt='cron' />,
        tool: "Cron Jobs",
        description:
        "Scheduled background tasks that execute automatically at predefined intervals. Used to periodically inspect pending payments, recheck transaction confirmations, trigger reconciliation workflows, and perform routine maintenance tasks without requiring manual intervention or an incoming user request."
      }
    ]
  }
];


const securityItems = [

  "Private keys and seed phrases are never requested, transmitted or stored.",

  "Wallet ownership is proven only by a server-verified signature.",

  "Nonces are random, single-use, short-lived and bound to the signed message.",

  "Sessions use HTTP-only, Secure, SameSite cookies, so page scripts cannot read them.",

  "Every protected endpoint checks the session and that the user owns the resource.",

  "All input is validated and addresses are normalized before use.",

  "RPC keys and database credentials exist only in server environment variables.",

  "Amounts use BigInt/wei math, never floating point.",

  "Rate limiting and logging protect authentication and lookup endpoints."

];



const edgeCases = [
  { title: "Reverted transaction", text: "The hash exists and was mined, but the receipt status is failed. It is marked Failed, never Reconciled." },

  { title: "Underpayment / overpayment", text: "Amount differs from the expectation. It is flagged as Mismatch for review instead of silently accepted." },

  { title: "Wrong network", text: "A valid transaction on another chain has the right hash format but the wrong chain ID, so it does not match." },

  { title: "Duplicate claim", text: "Reusing one hash for a second payment is rejected because a hash can map to one payment only." },

  { title: "Chain reorganization", text: "A recent block can be replaced. Waiting for confirmations before finalizing guards against this." },

  { title: "Dropped transaction", text: "A pending transaction that never confirms stays unreconciled and is eventually surfaced as failed or expired." }

];



const requestFlow = [

  "User action in the dashboard",

  "Frontend calls an API route",

  "Session cookie is read and verified",

  "Input is validated and normalized",

  "Ownership/authorization is checked",

  "Database and/or Ethereum RPC is queried",

  "Business rules decide the outcome",

  "Result is stored and a structured response returned"

];


const faq = [
  {
    icon: <Image src='/images/wallet-icon.png' width={40} height={40} alt="wallet" />,
    question: "Does connecting my wallet sign me in ?",
    answer:
      "No. Connecting your wallet only allows Paylume to access your public wallet address. To authenticate, Paylume generates a unique sign-in challenge that you must sign using your wallet. The signature is then sent to the backend and cryptographically verified before your account session is created. Your private key is never shared.",
  },
  {
    icon: <Image src='/images/randomhash.png' width={40} height={40} alt="random-hash" />,
    question: "Does a transaction hash prove I paid ?",
    answer:
      "No. A transaction hash is simply a unique identifier used to locate a transaction on the blockchain. Paylume independently verifies the transaction by checking its execution status, recipient address, transferred amount, asset, blockchain network, and required confirmations. Only when these details satisfy the expected payment conditions can the payment be considered successfully reconciled.",
  },
  {
    icon: <Image src='/images/status-icon.png' width={40} height={40} alt="status" />,
    question: "Why is my payment still confirming ?",
    answer:
      "Your transaction has been detected and its payment details have passed the required validation checks, but it has not yet accumulated the minimum number of block confirmations configured by Paylume. This waiting period helps ensure the transaction is sufficiently established on the blockchain. Once the confirmation threshold is reached, its payment status can be updated accordingly.",
  },
  {
    icon: <Image src='/images/mismatch-icon.png' width={40} height={40} alt="mismatch" />,
    question: "Why is my payment marked mismatch ?",
    answer:
      "A payment is marked as mismatched when one or more transaction details do not match the expected payment requirements. This could include an incorrect amount, recipient wallet address, asset, or blockchain network. Open the payment details and compare the actual on-chain transaction data with the original payment request to identify the discrepancy.",
  },
  {
    icon: <Image src='/images/metamask-logo.png' width={40} height={40} alt="metamask" />,
    question: "Why won't my wallet connect ?",
    answer:
      "Wallet connection issues can occur if your wallet extension is not installed, your wallet is locked, or the browser is unable to communicate with the wallet provider through browser node. Ensure MetaMask or another supported wallet is installed and unlocked, approve the connection request, and verify that you are using a supported browser and network. You can also try refreshing the page and reconnecting your wallet.",
  },
  {
    icon: <Image src='/images/transfer-money.png' width={40} height={40} alt="transfer-funds" />,
    question: "Can Paylume move my funds ?",
    answer:
      "No. Paylume is a payment verification and reconciliation platform, not a custodial wallet. It does not store your private keys, hold your funds, or have the authority to initiate transactions on your behalf. Wallet authentication only requires signing a message to verify ownership of your address, while payment verification relies on publicly accessible blockchain data. Your assets remain entirely under your control.",
  },
];

const setupFlow = [
  "Clone the repository",
  "Install dependencies",
  "Create .env.local with database URI, RPC URL and session secret",
  "Start MongoDB and verify the connection",
  "Run the dev server",
  "Sign in with a test wallet on a test network",
  "Create a test payment and send a testnet transfer"
];


const setupCode = `# Install dependencies

npm install



# Start development server

npm run dev



# Production build and run

npm run build

npm run start`;



const envCode = `# .env.local (never commit this file)

MONGODB_URI=...

ETH_RPC_URL=...

SESSION_SECRET=...

NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...`;



const verifyCode = `// Simplified reconciliation check (illustrative)

const receipt = await client.getTransactionReceipt({ hash });

const tx = await client.getTransaction({ hash });

const head = await client.getBlockNumber();



const confirmations = head - receipt.blockNumber + 1n;



const matches =

  receipt.status === "success" &&

  tx.chainId === payment.chainId &&

  tx.to?.toLowerCase() === payment.recipient.toLowerCase() &&

  tx.value === payment.expectedWei &&

  confirmations >= payment.requiredConfirmations;`;



function Heading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-start max-w-2xl rounded-lg">
      <p className="text-lg font-bold text-red-600 rounded-lg p-1">{eyebrow}</p>
      <div className="flex flex-col px-1 rounded-lg">
        <h2 className="text-2xl font-semibold leading-tight p-0.5 rounded-lg tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
        {description && <p className="max-w-xl text-sm leading-6 p-0.5 rounded-lg text-slate-500">{description}</p>}
      </div>
    </div>
  );
}



function Flow({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return (
    <div className={compact ? "grid gap-2 sm:grid-cols-2" : "space-y-2"}>
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.03 }}

            className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm transition-colors duration-200 hover:border-red-100">
            <span className="flex size-8 p-1 shrink-0 items-center justify-center rounded-full bg-red-50 text-[11px] font-bold text-red-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium leading-6 text-slate-700">{step}</span>
            {i === steps.length - 1 && <Check className="ml-auto shrink-0 text-red-600" size={17} />}
          </motion.div>
          {!compact && i < steps.length - 1 && (
            <div className="flex h-3 items-center pl-6"><ArrowDown size={14} className="text-red-300" /></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}


export function Code({ code, label }: { code:string , label:string }) {
  const [copyState, setCopyState] = useState<TerminalStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setCopyState("idle");
    }, 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="group relative my-6 overflow-hidden font-rubik rounded-xl border border-slate-700/60 bg-black shadow-xl shadow-black/10 ring-1 ring-white/3">
      {/* Header */}
      <div className="flex items-center justify-between rounded-lg border-b border-white/[0.07] bg-black  px-4 py-3 sm:px-5">
        {/* File information */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Window controls */}
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="hidden h-4 w-px bg-white/10 sm:block" />
          <div className="flex min-w-0 items-center justify-center gap-2 border border-gray-800 py-1 px-3 rounded-full">
            <FileCode2 size={15} className="shrink-0 text-red-600" />
            <span className="truncate text-xs font-medium tracking-wide text-gray-500">
              {label}
            </span>
          </div>
        </div>
        {/* Copy button */}
        <button
          type="button"
          onClick={copy}
          aria-label={ copyState === "copied" ? "Code copied" : "Copy code" }
          className={`
            flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5
            text-[11px] font-medium transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-indigo-400/60
            ${
              copyState === "copied"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : copyState === "error"
                  ? "border-red-500/20 bg-red-500/10 text-red-400"
                  : "border-gray-500 bg-black hover:bg-black text-gray-500 hover:border-red-600 hover:text-red-600"
            }
          `}
        >
          {copyState === "copied" ? (
            <>
              <Check size={13} />
              Copied
            </>
          ) : copyState === "error" ? (
            <>
              <AlertCircle size={13} />
              Failed
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy code
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto rounded-lg">
        <pre className="w-max min-w-full py-4 font-mono text-[12px] leading-5 sm:py-5 sm:text-[13px]">
          <code>
            {lines.map((line, index) => (
              <div key={index} className="flex min-w-full transition-colors duration-150 hover:bg-white/2.5">
                <span className="sticky left-0 w-12 shrink-0 select-none bg-black rounded-md mr-1 pr-4 text-right text-[11px] text-slate-600 sm:w-14 sm:pr-5">
                  {String(index + 1).padStart(String(lines.length).length,"0")}
                </span>
                <span className="whitespace-pre pr-8 text-slate-300">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Bottom subtle accent */}
      <div className="h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />
    </div>
  );
}




function Note({ children }: { children: React.ReactNode }) {

  return <p className="rounded-xl border border-amber-100 bg-amber-50/60 p-4 text-xs leading-6 text-amber-900/70">{children}</p>;

}





export default function Documentations() {

  const [open, setOpen] = useState<number | null>(0);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="min-h-screen overflow-hidden bg-white font-rubik text-slate-900 selection:bg-red-100 selection:text-red-700">

      {/* Hero */}

      <section className="relative overflow-hidden border-b border-slate-100 bg-[#fcfcfd]">

        <div className="pointer-events-none absolute -right-40 -top-48 size-140 rounded-full border border-red-100/70" />

        <div className="pointer-events-none absolute -right-16 -top-24 size-82.5 rounded-full border border-red-100/70" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.08fr_.92fr] lg:gap-24 xl:gap-32">

          <div className="relative z-10">

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-3 py-1.5 text-[10px] font-bold tracking-[.13em] text-red-600 shadow-sm">

              <span className="size-1.5 rounded-full bg-red-600" /> HOW PAYLUME WORKS

            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-[-.045em] text-slate-950 sm:text-5xl lg:text-[60px]">

              The logic behind every <span className="text-red-600">reconciled payment.</span>

            </motion.h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-slate-500 sm:text-base">

              Paylume is a crypto payment reconciliation tool for Ethereum. This page walks through how it proves who you are, reads the blockchain, matches transactions to expected payments, and stores the result.

            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <button onClick={() => scrollTo("reconciliation")} className="inline-flex h-12 items-center gap-2 rounded-xl bg-red-600 px-5 text-xs font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700">See the core logic <ArrowRight size={15} /></button>

              <button onClick={() => scrollTo("architecture")} className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">View architecture <Network size={15} /></button>

            </div>

          </div>



          <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.12 }} className="relative mx-auto w-full max-w-135">

            <div className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/[.07] sm:p-6">

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                <div className="flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-lg bg-red-600 text-white"><Blocks size={14} /></span><span className="text-xs font-bold">Paylume in one view</span></div>

                <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-semibold text-slate-400">OVERVIEW</span>

              </div>

              <div className="space-y-2.5 py-5">

                {[

                  { icon: Wallet, t: "1 · Prove identity", d: "Sign a nonce with your wallet" },

                  { icon: FileCode2, t: "2 · Define expectation", d: "Amount · recipient · asset · network" },

                  { icon: Globe, t: "3 · Observe the chain", d: "Fetch transaction + receipt via RPC" },

                  { icon: GitBranch, t: "4 · Match rules", d: "Compare observed vs expected" },

                  { icon: Check, t: "5 · Reconcile", d: "Wait for confirmations, store result" }

                ].map(n => {

                  const Icon = n.icon;

                  return (

                    <div key={n.t} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5">

                      <span className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-600"><Icon size={17} /></span>

                      <div><p className="text-xs font-semibold text-slate-800">{n.t}</p><p className="mt-1 text-[10px] text-slate-400">{n.d}</p></div>

                    </div>

                  );

                })}

              </div>

            </div>

          </motion.div>

        </div>

      </section>



      {/* Problem */}

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">

        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 xl:gap-32">

          <Heading eyebrow="THE PROBLEM" title="Blockchain payments don't arrive as invoices." description="Traditional processors hand you structured records. On Ethereum you receive raw transactions, and your application must work out which payment each one belongs to." />

          <div className="space-y-4 text-sm leading-7 text-slate-600">

            <p>A business may expect 0.5 ETH from a customer. The chain only shows that some address sent some value to some address in some block. It says nothing about which order that was for.</p>

            <p>Paylume closes that gap. It stores what you expect to receive, reads what actually happened on-chain, applies explicit matching rules, and records the verdict, so every payment has a clear, auditable status.</p>

          </div>

        </div>

      </section>



      {/* Reconciliation */}

      <section id="reconciliation" className="scroll-mt-8 border-y border-slate-100 bg-[#fafafa]">

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">

          <div className="grid gap-16 lg:grid-cols-[.82fr_1.18fr] lg:gap-24 xl:gap-32">

            <div>

              <Heading eyebrow="CORE ENGINE" title="How reconciliation actually works." description="Reconciliation compares an expected payment with transaction data observed on Ethereum, then decides whether the two agree." />

              <div className="mt-7 space-y-4 text-sm leading-7 text-slate-600">

                <p>A successful transaction is not automatically a correct payment. Paylume only reconciles when every configured rule passes and the transaction is final enough.</p>

              </div>

              <div className="mt-7 flex items-center gap-3 rounded-xl border border-red-100 bg-white p-4">

                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600"><GitBranch size={17} /></span>

                <p className="text-xs leading-6 text-slate-600">A transaction hash identifies a transaction. It does not prove the expected payment was satisfied.</p>

              </div>

            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.22)] sm:p-8">

              <p className="text-[10px] font-bold tracking-wider text-red-600">PAYMENT LIFECYCLE</p>

              <h3 className="mb-6 mt-1 text-base font-semibold">From expectation to reconciled record</h3>

              <Flow steps={reconciliationFlow} />

            </div>

          </div>



          <div className="mt-16">

            <Heading eyebrow="MATCHING RULES" title="Seven checks decide the outcome." />

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {matchingRules.map((r, i) => {

                const Icon = r.icon;

                return (

                  <motion.div key={r.rule} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg hover:shadow-slate-900/4">

                    <span className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-600"><Icon size={19} /></span>

                    <h4 className="mt-4 text-sm font-semibold">{r.rule}</h4>

                    <p className="mt-2 text-xs leading-6 text-slate-500">{r.check}</p>

                  </motion.div>

                );

              })}

            </div>

          </div>



          <div className="mt-16 grid gap-8 lg:grid-cols-2">

            <div>

              <Heading eyebrow="PAYMENT STATES" title="Every payment is always in one state." />

              <div className="mt-6 space-y-2">

                {paymentStates.map(s => (

                  <div key={s.name} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5">

                    <span className={`rounded-md px-2.5 py-1 text-[10px] font-bold ${s.tone}`}>{s.name}</span>

                    <p className="text-xs leading-6 text-slate-500">{s.detail}</p>

                  </div>

                ))}

              </div>

            </div>

            <div>

              <Heading eyebrow="IN CODE" title="The check, simplified." />

              <div className="mt-6"><Code code={verifyCode} label="Illustrative reconciliation logic" /></div>

            </div>

          </div>

        </div>

      </section>



      {/* Architecture */}

      <section id="architecture" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24">

        <Heading eyebrow="ARCHITECTURE" title="Five layers, each with one job." description="Separating presentation, wallet, application logic, storage and blockchain access keeps trusted decisions on the server and makes each part easier to reason about." />

        <div className="mt-12 grid gap-3 lg:grid-cols-5">

          {layers.map((l, i) => {

            const Icon = l.icon;

            return (

              <div key={l.title} className="relative rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg hover:shadow-slate-900/4">

                <div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-600"><Icon size={19} /></span><span className="text-[10px] font-bold text-slate-300">{l.tag}</span></div>

                <p className="mt-5 text-[10px] font-bold tracking-wider text-red-600">{l.title.toUpperCase()}</p>

                <h3 className="mt-1 text-sm font-semibold">{l.name}</h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">{l.detail}</p>

                {i < layers.length - 1 && <ArrowRight className="absolute -right-4.25 top-1/2 z-10 hidden -translate-y-1/2 text-red-300 lg:block" size={18} />}

              </div>

            );

          })}

        </div>



        <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 xl:gap-28">

          <div className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-5 sm:p-7">

            <p className="text-[10px] font-bold tracking-wider text-red-600">REQUEST LIFECYCLE</p>

            <h3 className="mb-5 mt-1 text-base font-semibold">What happens on every action</h3>

            <Flow steps={requestFlow} compact />

          </div>

          <div className="space-y-4">

            <div className="rounded-2xl border border-slate-200 p-5">

              <h3 className="text-sm font-semibold">Two sources of truth, two roles</h3>

              <p className="mt-2 text-xs leading-6 text-slate-500">Ethereum is the authority on what happened on-chain. MongoDB is the authority on what the application expects and what it concluded. Paylume stores transaction references and results; it never replaces the chain's record.</p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-5">

              <h3 className="text-sm font-semibold">The frontend is never trusted</h3>

              <p className="mt-2 text-xs leading-6 text-slate-500">Authentication, authorization and reconciliation decisions all run on the server. The browser only displays results and requests signatures.</p>

            </div>

          </div>

        </div>

      </section>



      {/* Authentication */}
      {/*  Start from here */}
      <section id="authentication" className="scroll-mt-8 border-y border-slate-100 bg-[#fafafa]">

        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-24 lg:py-28 xl:gap-32">

          <div>

            <Heading eyebrow="AUTHENTICATION" title="Prove wallet ownership without a password." description="Sign-in uses a server-issued challenge and a cryptographic signature. The private key never leaves the wallet." />

            <div className="mt-7 space-y-4 text-sm leading-7 text-slate-600">

              <p>Connecting a wallet only reveals a public address, which anyone could type in. Signing a fresh challenge is what proves control of that address.</p>

              <p>Only after the backend verifies the signature does it create a session, which is a separate, server-managed credential.</p>

            </div>

            <div className="mt-7 rounded-xl border border-slate-200/80 bg-white p-5 transition-colors duration-200 hover:border-slate-300">
              <div className="flex items-center gap-2 text-xs font-semibold"><ShieldCheck size={16} className="text-red-600" /> Properties the flow enforces</div>
              <ul className="mt-3 space-y-2 text-xs leading-6 text-slate-500">
                <li>• Nonce is random and single-use.</li>

                <li>• Nonce expires after a short window.</li>

                <li>• Message binds domain, address and nonce.</li>

                <li>• Signature is verified server-side.</li>

                <li>• Replayed signatures are rejected.</li>
              </ul>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.22)] sm:p-8">

            <p className="text-[10px] font-bold tracking-wider text-red-600">SIGN-IN LIFECYCLE</p>

            <h3 className="mb-6 mt-1 text-base font-semibold">Who does what, step by step</h3>

            <div className="space-y-2">

              {authFlow.map((a, i) => (

                <React.Fragment key={a.step}>

                  <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">

                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[11px] font-bold text-red-600">{String(i + 1).padStart(2, "0")}</span>

                    <div className="flex-1">

                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-slate-500">{a.side.toUpperCase()}</span>

                      <p className="mt-1 text-sm font-medium leading-6 text-slate-700">{a.step}</p>

                    </div>

                  </div>

                  {i < authFlow.length - 1 && <div className="flex h-3 items-center pl-6"><ArrowDown size={14} className="text-red-300" /></div>}

                </React.Fragment>

              ))}

            </div>

          </div>

        </div>

      </section>



      {/* Data model */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Heading eyebrow="DATA MODEL" title="What gets stored, and why." description="The database holds application state. It keeps references to on-chain transactions rather than copies that could drift from the truth." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {dataModel.map(d => {
            const Icon = d.icon;
            return (
              <div key={d.title} className="rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl shadow-md">
                <span className="flex items-center w-fit justify-center rounded-full p-3 bg-zinc-100 text-zinc-700"><Icon size={30} /></span>
                <h3 className="mt-4 font-mono text-sm font-semibold">{d.title}</h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">{d.fields}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-5"><Note>Field names above describe the intended design. Align them with your actual MongoDB schema before publishing.</Note></div>
      </section>


      {/* Tech stack */}
      <section id="technology" className="scroll-mt-8 border-y border-slate-100 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <Heading eyebrow="TECH STACK" title="What each tool does in Paylume." />
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {stack.map(g => (
              <div key={g.group} className="rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-slate-900/4 hover:shadow-xl shadow-md">
                <div className="flex flex-col items-start justify-center w-fit rounded-lg py-1 gap-3">
                 {g.icon}
                 <h3 className="text-xl font-semibold">{g.group}</h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {g.tools.map(({ tool , logo , description }) => (
                    <li key={tool} className="rounded-lg">
                      <div className="flex items-center justify-start gap-1 rounded-lg">
                        {logo}
                       <p className="text-sm font-semibold bg-gray-100 text-gray-600 rounded-full py-1 px-3">{tool}</p>
                      </div>
                      <p className="mt-1 text-xs leading-6 text-slate-500 rounded-lg p-1 m-1">{description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Security & edge cases */}
      <section id="security" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 xl:gap-32">
          <div>
            <Heading eyebrow="SECURITY" title="Principles protecting accounts and payments." />
            <ul className="mt-7 space-y-3">
              {securityItems.map(s => (
                <li key={s} className="flex items-center justify-start gap-2.5 text-xs leading-4 text-slate-600">
                  <LockKeyhole size={30} className="shrink-0 bg-red-50 p-2 text-red-600 rounded-full" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading eyebrow="EDGE CASES" title="Situations the logic is built to handle." />
            <div className="mt-7 space-y-1">
              {edgeCases.map(e => (
                <div key={e.title} className="rounded-xl border border-slate-200/80 bg-white p-5 transition-colors duration-200 hover:shadow-sm">
                  <p className="flex items-center gap-2 text-xs font-semibold"><AlertTriangle size={14} className="text-red-600" />{e.title}</p>
                  <p className="mt-1.5 text-xs leading-6 text-slate-500">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Developer */}

      <section id="developer" className="scroll-mt-8 border-y border-slate-100 bg-[#fafafa]">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-24 lg:py-28 xl:gap-32">
          <div>
            <Heading eyebrow="DEVELOPERS" title="Running Paylume locally." description="Understand the boundaries before touching authentication, matching rules or transaction processing." />
            <ul className="mt-6 space-y-3 text-xs leading-6 text-slate-500">
              {["Use the Node.js version the project specifies.", "Never commit environment files or secrets.", "Keep development and production configs separate.", "Test on a testnet with a throwaway wallet.", "Review package scripts before deploying."].map(i => (
                <li key={i} className="flex items-center justify-start gap-2"><Check size={22} className="shrink-0 bg-red-50 p-1 text-red-600 rounded-full" /><span>{i}</span></li>
              ))}
            </ul>
          </div>
          <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg hover:shadow-slate-900/4 sm:p-7">
            <Flow steps={setupFlow} compact={true} />

            <Code code={setupCode} label="Terminal" />

            <Code code={envCode} label="Environment variables" />

            <p className="text-[11px] leading-6 text-slate-400">Variable names are examples. Use the ones defined in your project.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 xl:gap-32">
          <Heading eyebrow="FAQ" title="Common questions." description="Quick answers about wallets, transactions and reconciliation results." />
          <div className="space-y-1 cursor-pointer">
            {faq.map(({ icon , question , answer }, i) => (
              <div key={i+1} className="cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <section className="flex items-center justify-center gap-2">
                    {icon}
                    <span className="text-xs font-semibold text-slate-800">{question}</span>
                  </section>
                  <ChevronRight size={16} className={`shrink-0 text-slate-400 transition ${open === i ? "rotate-90 text-red-600" : ""}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden" >
                      <p className="border-t border-slate-100 px-5 py-4 text-xs leading-6 text-slate-500">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <p className="pt-2 text-[11px] leading-6 text-slate-400 flex items-center justify-between">
              <span>Never share <b>private keys</b> or <b>recovery phrases</b> of your wallet with anyone, including our support team...</span>
              <ShieldCheckIcon size={20} />
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-slate-400 sm:flex-row sm:px-8">
          <div className="flex items-center gap-2">
            <Image src={Logo} width={100} height={100} alt='paylume-logo' />
            <span>Paylume Documentation</span>
          </div>
          <p>Built for transparency. Powered by Ethereum.</p>
          <Link href="/" className="flex items-center gap-1.5 transition hover:text-red-600 rounded-full border hover:border-red-600 hover:bg-red-50 py-2 px-4">Return to Paylume <ArrowUpRight size={13} /></Link>
        </div>
      </footer>
    </main>

  );

}