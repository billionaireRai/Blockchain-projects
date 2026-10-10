'use client'

import z from 'zod' ;
import Link from 'next/link';
import Image from 'next/image' ;
import { useParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, LockKeyholeIcon, RefreshCcwIcon } from "lucide-react"; // lightweight icons
import { emailRegex } from '@/lib/Regex';
import logo from '@/public/images/paylume-logo.png';
import Resetpassword from '@/public/images/reset-password.jpg';


export function Resetui (){
    const { codeid } = useParams() ;
  // applying ZOD validation on form feilds...
  const resetDataType = z.object({
    newpassword:z.string().nonempty("New password is required for security").regex(new RegExp(emailRegex)),
    confirmpassword:z.string().min(10).nonempty("Password confirmation is neccessary")
  })
  const { register , handleSubmit , formState:{ errors , isSubmitting }} = useForm({ resolver:zodResolver(resetDataType) }) ;

// function for processing registration...
  async function handleChangePassword() {

  }

  return (
    <div className='flex flex-col md:flex-row items-center h-screen rounded-lg p-2 font-rubik'>
      <div className='HERO-SECTION flex flex-col items-center justify-center rounded-lg p-2 flex-1 h-full'>
        <div className='flex items-center justify-center min-w-3/5 flex-2 rounded-lg'>
          <Image src={Resetpassword} alt='reset-password' className='h-3/4 w-3/4' />
        </div>
      </div>
      <div className='FORM-SECTION flex flex-col gap-2 justify-start rounded-lg flex-1 h-full p-2'>
        <header className='flex items-center justify-between rounded-lg'>
          <div className='rounded-full'>
            <Image src={logo} alt="paylume.logo" height={150} width={150} className=" rounded-full" />
          </div>
          <div className='flex items-center justify-center gap-1 rounded-full py-1 px-3'>
            <span className='text-sm rounded-full p-1'>Changed password successfully ?</span>
            <Link href='/auth/login'>
              <button className='rounded-lg p-1 w-20 bg-black text-white cursor-pointer hover:opacity-85 hover:shadow-md shadow-sm hover:scale-102 text-sm'>
                Login
              </button>
            </Link>
          </div>
        </header>
        <div className='flex flex-col items-start justify-center flex-auto gap-2 rounded-lg'>
          <div className="max-w-lg text-2xl flex flex-col gap-2 items-start leading-[1.1] tracking-tight rounded-lg text-gray-950 md:text-3xl lg:text-4xl px-3 mx-5" >
             <span className='font-bold'>Lets update you password...</span>
             <p className='text-sm text-zinc-500'>
               Secure your Paylume account with a new password. Set a strong, unique password to protect your account, safeguard your crypto payment activity, and continue managing your transactions with confidence.
             </p>
          </div>
          <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="w-full max-w-md bg-white p-5 mx-5 rounded-xl">
            <div className="mb-3">
              <label className="block text-sm text-black mb-1 dark:text-white">New Password</label>
              <div className="flex items-center border border-gray-300 rounded-md group p-1 transition-all duration-300 focus-within:border-zinc-500 focus-within:ring-3 focus-within:ring-zinc-200 dark:focus-within:border-zinc-500 dark:focus-within:ring-4 dark:focus-within:ring-zinc-600/50 dark:border-gray-600">
                <Lock className="text-gray-500 mx-2 w-8 h-8 p-1.5 group-focus-within:stroke-slate-400 dark:group-focus-within:stroke-yellow-400 dark:stroke-white" />
                <input
                  type="password"
                  {...register('newpassword')}
                  placeholder="enter your new password"
                  className="w-full py-2 text-sm px-1 outline-none bg-transparent dark:text-white rounded-lg"
                />
              </div>
              {errors.newpassword && <p className="text-red-500 text-xs p-1 flex items-center"><Image src='/images/warning.png' width={20} height={20} alt="warning"/><span className="ml-2">{errors.newpassword.message}</span></p>}
            </div>
            <div className="mb-6">
              <label className="block text-sm text-black mb-1 dark:text-white">Confirm Password</label>
              <div className="flex items-center border border-gray-300 rounded-md group p-1 transition-all duration-300 focus-within:border-zinc-500 focus-within:ring-3 focus-within:ring-zinc-200 dark:focus-within:border-zinc-500 dark:focus-within:ring-4 dark:focus-within:ring-zinc-600/50 dark:border-gray-600">
                <LockKeyholeIcon className="text-gray-500 mx-2 w-8 h-8 p-1.5 group-focus-within:stroke-slate-400 dark:group-focus-within:stroke-yellow-400 dark:stroke-white" />
                <input
                  type="password"
                  {...register('confirmpassword')}
                  placeholder="confirm above entered password"
                  className="w-full py-2 text-sm px-1 outline-none bg-transparent dark:text-white rounded-lg"
                />
              </div>
              {errors.confirmpassword && <p className="text-red-500 text-xs p-1 flex items-center"><Image src='/images/warning.png' width={20} height={20} alt="warning"/><span className="ml-2">{errors.confirmpassword.message}</span></p>}
            </div>
            <div 
              className="flex items-center justify-between rounded-fullp-1"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-black font-semibold text-white duration-300 hover:opacity-90"
              >
                <RefreshCcwIcon className="shrink-0" />
                <span className="whitespace-nowrap">Reset</span>
              </button>
            </div>
          </form>
       </div>
      </div>
    </div>
  )
}
