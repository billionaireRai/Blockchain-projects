'use client'


import Image from "next/image";
import logo from '@/public/images/paylume-logo.png' ;
import Link from "next/link";
import { useState , useRef } from "react"
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NavItemsType } from "@/types/navitem.type"
import { useWorkspaceState } from "@/states/workspace.state";
import { ArrowLeftRight, RefreshCcw, Wallet, Users, Loader2,FileText, BarChart3 , LogIn , UserRoundPlus, WalletCardsIcon, AtSignIcon, LayoutDashboardIcon, ListChevronsUpDown, ListChevronsDownUp, ArrowRightCircle, LogsIcon, LogOut } from "lucide-react";
import usePopClose from "@/hooks/usePopClose";
import { useAuthState } from "@/states/auth.state";

export default function NavigationBar() {
  const path = usePathname() ; // initializing usePathname hook...
  const pathNotAllowed = ['/auth/'];
  const { isAuth , authStatus , user } = useAuthState() ;
  const { activeWorkspaceId } = useWorkspaceState() ; 
  const [loading, setloading] = useState<boolean>(false);
  const [openOptions, setopenOptions] = useState<boolean>(false);
  const [loginPop, setloginPop] = useState<boolean>(false);
  const optionRef = useRef<HTMLDivElement>(null);
  const loginPopUpRef = useRef<HTMLDivElement>(null)

  // navigations items in option... 
const navItems:NavItemsType[] = [
{
  icon: <LayoutDashboardIcon size={25} />,
  label: "Dashboard",
  description:
    "Get comprehensive overview of your account, including transaction activity, transaction performance, reconciliation status, wallet balances, and key financial insights.",
},
{
  icon: <ArrowLeftRight size={25} />,
  label: "Transactions",
  urlRoute:"transactions",
  description:
    "View, search, filter, and manage all financial transactions while tracking their status, source, amount, and associated payment details.",
},
{
  icon: <RefreshCcw size={25} />,
  label: "Reconciliations",
  urlRoute: "reconciliations",
  description:
  "Match transactions across payment sources and financial records, identify discrepancies, resolve mismatches, and monitor reconciliation progress.",
},
{
  icon: <Wallet size={25} />,
  label: "Wallets",
  urlRoute: "wallets",
  description:
  "Manage connected wallets, monitor available and settled balances, review wallet activity, and keep track of funds across your accounts.",
},
{
  icon: <Users size={25} />,
  label: "Users",
  urlRoute: "users",
  description:
  "Manage members, there wallets, assign roles and permissions, control account access, and maintain secure access to your organization's financial data.",
},
{
  icon: <FileText size={25} />,
  label: "Invoices",
  urlRoute: "invoices",
  description:
  "Create, manage, and track invoices while monitoring transaction status, outstanding amounts, due dates, and associated customer transactions.",
},
{
  icon: <BarChart3 size={25} />,
  label: "Reports",
  urlRoute: "reports",
  description:
  "Analyze financial performance with detailed reports on transactions, reconciliations, balances, and other important business metrics.",
},
{
  icon: <LogsIcon size={25} />,
  label: "Audit Logs",
  urlRoute: "auditlogs",
  description:
    "Track system activities, monitor user actions, review security events, and maintain a detailed history of changes for transparency and accountability.",
},
]

usePopClose(loginPop,setloginPop,loginPopUpRef) ;
usePopClose(openOptions,setopenOptions,optionRef) ;

if (pathNotAllowed.some((p) =>  path.startsWith(p))) return null ;

  // funtion for wallet login process...
  async function handleWalletAuth() {
    setopenOptions(false);
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 4000);
  }

  return (
    <>
     <div className="sticky top-0 rounded-full">
      <div className="relative flex items-center justify-between rounded-full backdrop-blur-3xl font-rubik p-1">
        <section className="rounded-full shrink-0" >
          <Image src={logo} alt="paylume.logo" height={150} width={150} className=" rounded-full" />
        </section>
        <section className="flex items-center justify-center gap-1 rounded-full p-1">
         {( isAuth && authStatus === 'authenticated' ) ? (
          <div className="flex items-center gap-2 justify-center w-fit rounded-full p-2">
           <div 
            onClick={() => { setopenOptions(!openOptions) }} 
            className="flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white dark:text-white hover:bg-gray-50 p-2 text-black">
            { openOptions ? <ListChevronsDownUp size={20} /> : <ListChevronsUpDown size={20} /> }
           </div>
           <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-zinc-950  px-3 py-2 text-white ease-out hover:bg-zinc-900 ring-0 hover:ring-4 hover:ring-zinc-950/5" >
            <LogOut size={20} />
            <span>Log Out</span>
           </button>
          </div>
          ) : (
          <div className="flex items-center gap-2 justify-center w-fit rounded-full p-2">
            <div onClick={() => { setloginPop(!loginPop) }} className="relative bg-zinc-50 dark:text-white cursor-pointer flex items-center justify-center gap-1.5 rounded-full py-2 px-3 ease-out hover:bg-zinc-100">
              { !loading ? (
                <>
                  <LogIn size={20} />
                  <span>Login</span>
                </>
               ) : (
                <Loader2 className="animate-spin"/>
               )}
              {loginPop && (
               <motion.div 
                 ref={loginPopUpRef}
                 initial={{ opacity: 0, scale: 0.9, y: 0 , x: 0 }}
                 animate={{ opacity: 1, scale: 1, y: -8 , x:-8 }}
                 exit={{ opacity: 0, scale: 0.9, y: -4 , x:-4 }}
                 transition={{ duration: 0.2, ease: 'easeInOut' }}
                 style={{ transformOrigin: 'top right', willChange: 'transform, opacity' }}
                 className="absolute bg-white top-13 right-0 shadow-lg rounded-xl w-80 max-w-sm p-1 flex flex-col items-center justify-center gap-1" >
                  <Link href={'/auth/login'} className="rounded-2xl hover:bg-gray-100 flex items-center justify-center gap-1 p-2">
                    <div className="p-2 rounded-full"><AtSignIcon size={25} /></div>
                    <div className="flex flex-col">
                      <span className="font-semibold rounded-2xl p-1 text-lg">Email Address</span>
                      <p className="text-xs text-gray-400 rounded-lg px-1">Authenticate securely with traditional email & password method.</p>
                    </div>
                  </Link>
                  <div onClick={handleWalletAuth} className="rounded-xl hover:bg-gray-100 flex items-center justify-center gap-1 p-2">
                    <div className="p-2 rounded-full"><WalletCardsIcon size={25} /></div>
                    <div className="flex flex-col">
                      <span className="font-semibold rounded-2xl p-1 text-lg">Crypto Wallet</span>
                      <p className="text-xs text-gray-400 rounded-lg px-1">Connect your wallet for seamless Web3 authentication</p>
                    </div>
                  </div>
               </motion.div>
              )}
            </div>
            <Link href={'/auth/register'} className="flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-zinc-950  px-3 py-2 text-white ease-out hover:bg-zinc-900 ring-0 hover:ring-4 hover:ring-zinc-950/5"
            >
              <UserRoundPlus size={20} />
              <span>Register</span>
            </Link>
          </div>
         )}
        </section>
      </div>
      {openOptions && (
       <motion.div
         ref={optionRef}
         initial={{ opacity: 0, scale: 0.9, y: 0 , x: 0 }}
         animate={{ opacity: 1, scale: 1, y: -15 , x:-15 }}
         exit={{ opacity: 0, scale: 0.9, y: -8 , x:-8 }}
         transition={{ duration: 0.2, ease: 'easeInOut' }}
         style={{ transformOrigin: 'top right', willChange: 'transform, opacity' }}
         className="absolute bg-white dark:bg-black top-full right-0 font-rubik w-fit max-w-3/4 p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 shadow-lg rounded-xl"
       >
        {navItems.map((nav,index) => (
         <Link href={`/dashboard/${activeWorkspaceId}/${nav.urlRoute || ''}`} key={index} className="rounded-xl cursor-pointer border border-white hover:border-red-600 hover:bg-red-50 ring-0 hover:ring-3 hover:ring-red-700/8 flex items-center justify-start gap-1 p-2 transition-colors duration-300">
           <div className="p-2 rounded-full">{nav.icon}</div>
           <div className="flex flex-col">
             <span className="font-semibold rounded-2xl p-1 text-md">{nav.label}</span>
             <p className="text-xs text-gray-400 rounded-lg px-1">{nav.description}</p>
           </div>
         </Link>
        ))}
        <Link href={`user/${user?.userId}`} className="rounded-xl group cursor-pointer border border-white hover:border-red-600 hover:bg-red-50 hover:ring-3 hover:ring-red-700/8 flex gap-1 items-center justify-center p-2 transition-colors duration-300">
         <div className="size-14 shrink-0 overflow-hidden rounded-full">

           <Image
             src={ user?.profilepic || "/images/amritansh-avatar.png" }
             alt="user-avatar"
             width={56}
             height={56}
             className="size-full rounded-full object-cover"
           />
         </div>
         <div className="flex flex-col">
          <span className="font-semibold rounded-2xl p-1 text-md">{user?.username}</span>
          <p className="text-xs text-gray-400 rounded-lg px-1">Go to your profile on paylume by username {user?.username}</p>
         </div>
         <motion.div
          initial={{ opacity: 0, scale: 0.7 , x: 0 }}
          animate={{ opacity: 1, scale: 1 , x:8 }}
          exit={{ opacity: 0, scale: 0.7 , x:-4 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="p-2 rounded-full hidden group-hover:block">
          <ArrowRightCircle size={30} />
         </motion.div>
        </Link>
       </motion.div>
      )}
     </div>
    </>
  )
}