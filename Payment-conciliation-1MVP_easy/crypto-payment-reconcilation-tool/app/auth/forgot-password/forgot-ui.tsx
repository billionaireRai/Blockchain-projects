'use client'

import React,{ useState } from 'react' ;
import Image from 'next/image' ;
import Link from 'next/link' ;
import { emailRegex } from '@/lib/regex.utils';
import forgotPassword from '@/public/images/forgot-password.jpg' ;
import logo from '@/public/images/paylume-logo.png' ; 
import { Link2Icon, RefreshCcw, AtSignIcon , UserPlus2Icon } from 'lucide-react';

export function Forgotui () {
  const [email, setemail] = useState<string>("");
  const [inputErr, setinputErr] = useState<string>(""); // Email is required for sending link !!
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);

  async function getLinkToFormatPassword() {
    if (!email) {
      setinputErr('Email is neccessary to provide !');
      return ;
    }
    if (!emailRegex.test(email)) {
      setinputErr('Email format is incorrect , please check !');
      return ;
    }


  }

  return (
    <div className='h-screen flex flex-col items-start rounded-lg p-1'>
      <div className='TOP-SECTION rounded-lg w-full flex p-1 items-center justify-between'>
        <header className='flex flex-row items-center justify-evenly sm:justify-between flex-1 rounded-lg'>
          <div className='rounded-full'>
            <Image src={logo} alt="paylume.logo" height={150} width={150} className=" rounded-full" />
          </div>
          <div className='flex items-center justify-center gap-1 rounded-full py-1 px-3'>
            <span className='text-xs sm:text-sm rounded-full p-1'>Remember you previous password ?</span>
            <Link href='/auth/login'>
              <button className='rounded-lg p-1 w-20 bg-black text-white cursor-pointer hover:opacity-85 hover:shadow-md shadow-sm hover:scale-102 text-xs sm:text-sm'>
                Log In
              </button>
            </Link>
          </div>
        </header>
      </div>
      <div className='MAIN-SECTION rounded-lg w-full flex flex-col lg:flex-row justify-center gap-1 flex-auto p-1'>
        <div className='rounded-lg flex flex-col items-center justify-center flex-1'>
          <div className="max-w-lg text-2xl flex flex-col gap-2 items-start leading-[1.1] rounded-lg text-gray-950 md:text-3xl lg:text-4xl p-3">
            <span className="font-bold">Forgot your password ?</span>
            <p className="text-sm text-zinc-500">
              No worries.Just enter your registered email address and we’ll send you a <b>secure link</b> to reset your Paylume account password...
            </p>
          </div>
          <form
           onSubmit={(e) => { e.preventDefault() ; getLinkToFormatPassword() } }
           className="w-full max-w-lg bg-white p-5 rounded-xl dark:bg-black dark:border-gray-700">
            <div className="mb-3">
              <label className="block text-sm text-black mb-1 dark:text-white">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-md group p-1 transition-all duration-300 focus-within:border-zinc-500 focus-within:ring-3 focus-within:ring-zinc-200 dark:focus-within:border-zinc-500 dark:focus-within:ring-4 dark:focus-within:ring-zinc-600/50 dark:border-gray-600">
                <AtSignIcon className="text-gray-500 mx-2 w-8 h-8 p-1.5 group-focus-within:stroke-slate-400 dark:group-focus-within:stroke-yellow-400 dark:stroke-white" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="enter registered email id"
                  className="w-full py-2 text-sm px-1 outline-none bg-transparent dark:text-white rounded-lg"
                />
              </div>
              {inputErr && <p className="text-red-500 text-xs p-2 flex items-center"><Image src='/images/warning.png' width={20} height={20} alt="warning"/><span className="ml-2">{inputErr}</span></p>}
            </div>
             <button
                type="submit"
                disabled={isSubmitting}
                className={`flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black font-semibold text-white duration-500`}>
                <Link2Icon className="shrink-0" />
                <span className="whitespace-nowrap">Get Link</span>
              </button>
          </form>
          <div className='text-sm flex flex-col sm:flex-row items-center justify-center gap-3 w-full'>
            <div className='flex items-center justify-center gap-1 p-1'>
              <span>Did'nt recieved the reset link ?</span>
              <button type="button" className='flex items-center justify-center gap-1 text-blue-600 hover:bg-blue-100 cursor-pointer rounded-full py-1 px-2'>
                <RefreshCcw size={15} />
                <span>Resend</span>
              </button>
            </div>
            <div className='flex items-center justify-center gap-1 p-1'>
              <span>Want to create a fresh account ?</span>
              <Link href='/auth/login'>
                <button className='rounded-lg p-1 w-20 bg-black text-white cursor-pointer hover:opacity-85 hover:shadow-md shadow-sm hover:scale-102 text-xs sm:text-sm'>
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='rounded-lg flex items-center justify-center shrink-0 flex-1'>
          <Image src={forgotPassword} alt='email-verification' className='max-w-[85%] max-h-[85%] rounded-xl' />
        </div>
      </div>
    </div>
  )
}
