'use client'

import z from 'zod' ;
import Link from 'next/link';
import Image from 'next/image' ;
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock , AtSign , UserPlus2Icon , LucideWallet } from "lucide-react"; // lightweight icons
import { emailRegex , workspaceRegex } from '@/lib/Regex';
import logo from '@/public/images/paylume-logo.png';
import RegisterAnimation from '@/public/svg/register-animation.svg' ;
import { WalletNameImgType } from '@/types/walletnameimg.type';
import EthereumLogo from '@/public/images/ethereum.png' ;
import Metamask from '@/public/images/metamask-logo.png' ;
import Phantom from '@/public/images/phantom-logo.png' ;
import Tangem from '@/public/images/tangem-logo.png' ;

export function Register () {
  const [hoveredButton, sethoveredButton] = useState<"email" | "wallet" | null>(null);
  // applying ZOD validation on form feilds...
  const registerDataType = z.object({
    Name:z.string().toLowerCase().min(8).nonempty("Essential for secondary identification"),
    Workspace:z.string().toLowerCase().min(8).nonempty("Essential for first workspace creation").regex(new RegExp(workspaceRegex)),
    Email:z.string().nonempty("Email is required for notifications").regex(new RegExp(emailRegex)),
    Password:z.string().min(10).nonempty("Password is required for security")
  })
  const { register , handleSubmit , formState:{ errors , isSubmitting }} = useForm({ resolver:zodResolver(registerDataType) }) ;
  const popularWallets:WalletNameImgType[] = [
  {
    name:'Metamask',
    staticimg:Metamask
  },
  {
    name:'Phantom',
    staticimg:Phantom
  },
  {
    name:'Ethereum',
    staticimg:EthereumLogo
  },
  {
    name:'Tangem',
    staticimg:Tangem
  }
]

// function for processing registration...
async function handleRegisterLogic() {
  
}
  return (
    <div className='flex items-center h-screen rounded-lg p-2 font-rubik'>
      <div className='FORM-SECTION flex flex-col justify-start rounded-lg flex-1 h-full p-2'>
        <header className='flex items-center justify-between flex-1 rounded-lg'>
          <div className='rounded-full'>
            <Image src={logo} alt="paylume.logo" height={150} width={150} className=" rounded-full" />
          </div>
          <div className='flex items-center justify-center gap-1 rounded-full py-1 px-3'>
            <span className='text-sm rounded-full p-1'>Already have an account ?</span>
            <Link href='/auth/login'>
              <button className='rounded-lg p-1 w-20 bg-black text-white cursor-pointer hover:opacity-85 hover:shadow-md shadow-sm hover:scale-102 text-sm'>
                Log In
              </button>
            </Link>
          </div>
        </header>
        <div className='flex flex-col flex-auto items-start justify-center gap-2 rounded-lg'>
          <div className="text-sm font-semibold rounded-full text-red-600 flex gap-3 items-center justify-between h-7 w-fit p-2 mx-5">
            <span>GET STARTED</span>
          </div>
          <div className="max-w-lg text-2xl flex flex-col gap-2 items-center leading-[1.1] tracking-tight rounded-lg text-gray-950 md:text-3xl lg:text-4xl px-3 mx-5" >
             <span className='font-bold'>Create you paylume account NOW !!</span>
             <p className='text-sm text-zinc-500'>
              Securely connect your wallets, track every crypto transaction, and automatically reconcile payments across multiple networks — all from one powerful platform.
             </p>
          </div>
          <form
          onSubmit={handleSubmit(handleRegisterLogic)}
          className="w-full max-w-lg bg-white p-5 mx-5 rounded-xl dark:bg-black dark:border-gray-700">
            <div className="mb-3">
              <label className="block text-sm text-black mb-1 dark:text-white">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-md group p-1 transition-all duration-300 focus-within:border-zinc-500 focus-within:ring-3 focus-within:ring-zinc-200 dark:focus-within:border-zinc-500 dark:focus-within:ring-4 dark:focus-within:ring-zinc-600/50 dark:border-gray-600">
                <User className="text-gray-500 mx-2 w-8 h-8 p-1.5 group-focus-within:stroke-slate-400 dark:group-focus-within:stroke-yellow-400 dark:stroke-white" />
                <input
                  type="text"
                  {...register('Name')}
                  placeholder="enter your full name"
                  className="w-full py-2 text-sm px-1 outline-none bg-transparent dark:text-white rounded-lg"
                />
              </div>
              {errors.Name && <p className="text-red-500 text-xs p-1 flex items-center"><Image src='/images/warning.png' width={20} height={20} alt="warning"/><span className="ml-2">{errors.Name.message}</span></p>}
            </div>
            <div className="mb-3">
              <label className="block text-sm text-black mb-1 dark:text-white">Workspace</label>
              <div className="flex items-center border border-gray-300 rounded-md group p-1 transition-all duration-300 focus-within:border-zinc-500 focus-within:ring-3 focus-within:ring-zinc-200 dark:focus-within:border-zinc-500 dark:focus-within:ring-4 dark:focus-within:ring-zinc-600/50 dark:border-gray-600">
                <AtSign className="text-gray-500 mx-2 w-8 h-8 p-1.5 group-focus-within:stroke-slate-400 dark:group-focus-within:stroke-yellow-400 dark:stroke-white" />
                <input
                  type="text"
                  {...register('Workspace')}
                  placeholder="enter first workspace name"
                  className="w-full py-2 text-sm px-1 outline-none bg-transparent dark:text-white rounded-lg"
                />
              </div>
              {errors.Workspace && <p className="text-red-500 text-xs p-1 flex items-center"><Image src='/images/warning.png' width={20} height={20} alt="warning"/><span className="ml-2">{errors.Workspace.message}</span></p>}
            </div>
            <div className="mb-3">
              <label className="block text-sm text-black mb-1 dark:text-white">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-md group p-1 transition-all duration-300 focus-within:border-zinc-500 focus-within:ring-3 focus-within:ring-zinc-200 dark:focus-within:border-zinc-500 dark:focus-within:ring-4 dark:focus-within:ring-zinc-600/50 dark:border-gray-600">
                <Mail className="text-gray-500 mx-2 w-8 h-8 p-1.5 group-focus-within:stroke-slate-400 dark:group-focus-within:stroke-yellow-400 dark:stroke-white" />
                <input
                  type="email"
                  {...register('Email')}
                  placeholder="enter your email"
                  className="w-full py-2 text-sm px-1 outline-none bg-transparent dark:text-white rounded-lg"
                />
              </div>
              {errors.Email && <p className="text-red-500 text-xs p-1 flex items-center"><Image src='/images/warning.png' width={20} height={20} alt="warning"/><span className="ml-2">{errors.Email.message}</span></p>}
            </div>
            <div className="mb-6">
              <label className="block text-sm text-black mb-1 dark:text-white">Password</label>
              <div className="flex items-center border border-gray-300 rounded-md group p-1 transition-all duration-300 focus-within:border-zinc-500 focus-within:ring-3 focus-within:ring-zinc-200 dark:focus-within:border-zinc-500 dark:focus-within:ring-4 dark:focus-within:ring-zinc-600/50 dark:border-gray-600">
                <Lock className="text-gray-500 mx-2 w-8 h-8 p-1.5 group-focus-within:stroke-slate-400 dark:group-focus-within:stroke-yellow-400 dark:stroke-white" />
                <input
                  type="password"
                  {...register('Password')}
                  placeholder="enter your password"
                  className="w-full py-2 text-sm px-1 outline-none bg-transparent dark:text-white rounded-lg"
                />
              </div>
              {errors.Password && <p className="text-red-500 text-xs p-1 flex items-center"><Image src='/images/warning.png' width={20} height={20} alt="warning"/><span className="ml-2">{errors.Password.message}</span></p>}
            </div>
            <div 
              onMouseLeave={() => sethoveredButton(null)}
              className="flex items-center justify-between overflow-hidden rounded-full border border-zinc-400 p-1"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => sethoveredButton("email")}
                className={`flex h-12 min-w-0 cursor-pointer items-center justify-center gap-2 shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-black font-semibold text-white transition-[flex-basis] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${ hoveredButton === "email" ? "basis-full" : hoveredButton === "wallet" ? "basis-0" : "basis-1/2" }`}
              >
                <UserPlus2Icon className="shrink-0" />
                <span className="whitespace-nowrap">Register via Email</span>
              </button>

              <button
                type="button"
                onMouseEnter={() => sethoveredButton("wallet")}
                className={`flex h-12 min-w-0 cursor-pointer items-center justify-center gap-2 shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-zinc-200 font-semibold text-black transition-[flex-basis] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${ hoveredButton === "wallet" ? "basis-full" : hoveredButton === "email" ? "basis-0" : "basis-1/2" }`}
              >
                <LucideWallet className="shrink-0" />
                <span className="whitespace-nowrap">Register via Wallet</span>
              </button>
            </div>
          </form>
       </div>
      </div>
      <div className='HERO-SECTION flex flex-col items-center justify-center rounded-lg p-2 flex-1 h-full'>
        <div className='flex items-center justify-evenly gap-2 flex-1 min-w-4/5 rounded-lg'>
        {popularWallets.map((wallet, index) => (
          <motion.span
          key={index}
          animate={{ x: [0, 5, -5, 0, 5, -3], scale:[1, 0.95, 0.90 , 0.85 , 0.90 , 0.95 , 1] , y: [0, -12, 15, -8, 10, 0], rotate: [0, 3, -2, 2, -1, 0] }}
          transition={{ duration: 6 + index * 1.2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: index * 0.8 }}
          className="rounded-full p-1"
          >
            <Image src={wallet.staticimg} alt={wallet.name} width={100} height={100} />
          </motion.span>
        ))}
        </div>
        <div className='flex items-center justify-center min-w-3/5 flex-2 rounded-lg'>
          <Image src={RegisterAnimation} alt='Registeration' className='h-full w-full' />
        </div>
      </div>
    </div>
  )
}
