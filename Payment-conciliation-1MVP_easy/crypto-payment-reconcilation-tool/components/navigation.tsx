'use client'


import Image from "next/image";
import logo from '@/public/images/paylume-logo.png' ;
import Link from "next/link";
import { useState , useRef } from "react"
import { motion } from "framer-motion";
import { NavItemsType } from "@/types/navitem.type"
import { LayoutDashboard, CreditCard, ArrowLeftRight, RefreshCcw, Wallet, Users, FileText, BarChart3 , LucideOption, LogIn , UserRoundPlus, WalletCardsIcon, AtSignIcon, UserCheck2 } from "lucide-react";
import Themeswitch from "./Themeswitch";
import usePopClose from "@/hooks/usePopClose";

export default function NavigationBar() {
  const [openOptions, setopenOptions] = useState<boolean>(false);
  const [loginPop, setloginPop] = useState<boolean>(false);
  const optionRef = useRef<HTMLDivElement>(null);
  const loginPopUpRef = useRef<HTMLDivElement>(null)

  // navigations items in option... 
const navItems:NavItemsType[] = [
{
  icon: <CreditCard size={25} />,
  label: "Payments",
  description:
    "Monitor incoming and outgoing payments, track payment statuses, review payment details, and manage your overall payment activity.",
},
{
  icon: <ArrowLeftRight size={25} />,
  label: "Transactions",
  description:
    "View, search, filter, and manage all financial transactions while tracking their status, source, amount, and associated payment details.",
},
{
  icon: <RefreshCcw size={25} />,
  label: "Reconciliations",
  description:
    "Match transactions across payment sources and financial records, identify discrepancies, resolve mismatches, and monitor reconciliation progress.",
},
{
  icon: <Wallet size={25} />,
  label: "Wallets",
  description:
    "Manage connected wallets, monitor available and settled balances, review wallet activity, and keep track of funds across your accounts.",
},
{
  icon: <Users size={25} />,
  label: "Users",
  description:
    "Manage team members, assign roles and permissions, control account access, and maintain secure access to your organization's financial data.",
},
{
  icon: <FileText size={25} />,
  label: "Invoices",
  description:
    "Create, manage, and track invoices while monitoring payment status, outstanding amounts, due dates, and associated customer transactions.",
},
{
  icon: <BarChart3 size={25} />,
  label: "Reports",
  description:
    "Analyze financial performance with detailed reports on payments, transactions, reconciliations, balances, and other important business metrics.",
},
{
  icon: <UserCheck2 size={25} />,
  label: "User Profile",
  description:
    `View and manage the profile information, account details, preferences, and personal settings associated with ${"Amritansh Rai"}.`,
}
]

usePopClose(loginPop,setloginPop,loginPopUpRef) ;
usePopClose(openOptions,setopenOptions,optionRef)
  return (
    <>
     <div className="sticky top-0 rounded-full">
      <div className="relative flex items-center justify-between rounded-full backdrop-blur-md dark:bg-black font-rubik p-2">
        <section className="rounded-full shrink-0" >
          <Image src={logo} alt="paylume.logo" height={150} width={150} className=" rounded-full" />
        </section>
        <section className="flex items-center justify-center gap-1 rounded-full p-1">
         <div 
          onClick={() => { setopenOptions(!openOptions) }} 
          className="flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white py-2 px-3 text-black">
          <LucideOption size={20} />
          <span className="overflow-hidden whitespace-nowrap text-sm font-medium">
            Options
          </span>
         </div>
          <div className="flex items-center gap-2 justify-center w-fit rounded-full p-2">
            <div className="flex items-center justify-center gap-1.5 rounded-full">
              <Themeswitch />
            </div>
            <div onClick={() => { setloginPop(!loginPop) }} className="relative bg-zinc-50 cursor-pointer flex items-center justify-center gap-1.5 rounded-full py-2 px-3 transition-all duration-200 ease-out hover:bg-zinc-100">
              <LogIn size={20} />
              <span>Login</span>
              {loginPop && (
               <motion.div 
                 ref={loginPopUpRef}
                 initial={{ opacity: 0, scale: 0.9, y: 0 , x: 0 }}
                 animate={{ opacity: 1, scale: 1, y: -8 , x:-8 }}
                 exit={{ opacity: 0, scale: 0.9, y: -4 , x:-4 }}
                 transition={{ duration: 0.2, ease: 'easeOut' }}
                 style={{ transformOrigin: 'top right', willChange: 'transform, opacity' }}
                 className="absolute top-13 right-0 shadow-lg rounded-xl w-80 max-w-sm p-1 flex flex-col items-center justify-center gap-1" >
                  <Link href={'/auth/login'} className="rounded-2xl hover:bg-gray-100 flex items-center justify-center gap-1 p-2">
                    <div className="p-2 rounded-full"><AtSignIcon size={25} /></div>
                    <div className="flex flex-col">
                      <span className="font-semibold rounded-2xl p-1 text-lg">Email Address</span>
                      <p className="text-xs text-gray-400 rounded-lg px-1">Authenticate securely with traditional email & password method.</p>
                    </div>
                  </Link>
                  <div className="rounded-xl hover:bg-gray-100 flex items-center justify-center gap-1 p-2">
                    <div className="p-2 rounded-full"><WalletCardsIcon size={25} /></div>
                    <div className="flex flex-col">
                      <span className="font-semibold rounded-2xl p-1 text-lg">Crypto Wallet</span>
                      <p className="text-xs text-gray-400 rounded-lg px-1">Connect your wallet for seamless Web3 authentication</p>
                    </div>
                  </div>
               </motion.div>
              )}
            </div>
            <Link href={'/auth/register'} className="flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-zinc-950 px-3 py-2 text-white transition-all duration-200 ease-out hover:bg-zinc-900 ring-0 hover:ring-4 hover:ring-zinc-950/5"
            >
              <UserRoundPlus size={20} />
              <span>Register</span>
            </Link>
          </div>
        </section>
      </div>
      {openOptions && (
       <motion.div
         ref={optionRef}
         initial={{ opacity: 0, y: -30 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -15 }}
         transition={{ type: "spring", stiffness: 200, damping: 25 }}
         className="absolute top-full right-1/6 font-rubik w-fit max-w-3/4 p-2 m-2 grid grid-cols-3 gap-1 shadow-lg rounded-xl"
       >
        {navItems.map((nav,index) => (
         <div key={index} className="rounded-xl cursor-pointer hover:bg-gray-50 flex items-center justify-start gap-1 p-2">
           <div className="p-2 rounded-full">{nav.icon}</div>
           <div className="flex flex-col">
             <span className="font-semibold rounded-2xl p-1 text-md">{nav.label}</span>
             <p className="text-xs text-gray-400 rounded-lg px-1">{nav.description}</p>
           </div>
         </div>
        ))}
       </motion.div>
      )}
     </div>
    </>
  )
}