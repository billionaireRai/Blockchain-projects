'use client'

import z from 'zod' ;
import Link from 'next/link';
import Image from 'next/image' ;
import { useForm } from "react-hook-form";
import { useParams , useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock , LogIn, ArrowLeftIcon, AtSignIcon, RefreshCcw } from "lucide-react"; // lightweight icons
import { emailRegex } from '@/lib/Regex';
import logo from '@/public/images/paylume-logo.png';
import emailverfication from '@/public/images/emailverification.jpg' ;

export function Verifyemail () {
  // applying ZOD validation on form feilds...
  const loginDataType = z.object({
    Email:z.string().nonempty("Email is required for notifications").regex(new RegExp(emailRegex)),
    Password:z.string().min(10).nonempty("Password is required for security")
  })
  const { codeid } = useParams() ;
  const searchParams = useSearchParams() ;
  const { register , handleSubmit , formState:{ errors , isSubmitting }} = useForm({ resolver:zodResolver(loginDataType) }) ;

// function for processing registration...
async function handleLoginLogic() {
  
}
  return (
    <div className='flex items-center h-screen rounded-lg p-2 font-rubik'>
      <div className='FORM-SECTION flex flex-col gap-2 justify-start rounded-lg flex-1 h-full p-2'>
         <header className='flex items-center justify-start rounded-lg'>
          <div className='flex items-center justify-center gap-1 rounded-full w-1/4'>
            <Link href='/' className='flex items-center justify-center hover:bg-zinc-100 rounded-full p-2'>
              <button className='rounded-full flex items-center justify-center p-1 bg-black text-white cursor-pointer hover:opacity-85 text-sm'>
                <ArrowLeftIcon size={15} />
              </button>
              <span className='text-sm rounded-full p-1'>Go Back Home</span>
            </Link>
          </div>
        </header>
        <div className='flex flex-col items-start justify-center flex-auto gap-2 rounded-lg'>
          <div className="text-sm font-semibold rounded-full text-red-600 flex gap-3 items-center justify-between h-7 w-fit py-2 ml-8">
           <span>SECURE YOUR ACCOUNT</span>
          </div>
          <div className="max-w-lg text-2xl flex flex-col gap-2 items-start leading-[1.1] tracking-tight rounded-lg text-gray-950 md:text-3xl lg:text-4xl px-3 mx-5" >
             <span className='font-bold'>Almost there ! verify your email...</span>
             <p className='text-sm text-zinc-500'>
               we've sent a <b>6-digit</b> verification code to <b>{searchParams.get('email')}</b> . Enter the code below to complete your registration & unlock you paylume account.
             </p>
          </div>
          <form
          onSubmit={handleSubmit(handleLoginLogic)}
          className="w-full max-w-md bg-white p-5 mx-5 rounded-xl">
            <div className="mb-6 border border-black rounded-lg h-25">
             

            </div>
            <div 
              className="flex flex-col items-center justify-center gap-2 rounded-full p-1"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-black font-semibold text-white duration-300 hover:opacity-90"
              >
                <AtSignIcon className="shrink-0" />
                <span className="whitespace-nowrap">Verify Email</span>
              </button>
              <div className='text-sm flex items-center justify-center gap-2 w-full'>
                <span>Did'nt recieved the code ?</span>
                <button type="button" className='flex items-center justify-center gap-1 text-blue-600 hover:bg-blue-100 cursor-pointer rounded-full py-1 px-2'>
                  <RefreshCcw size={15} />
                  <span>Resend</span>
                </button>
              </div>
            </div>
          </form>
       </div>
      </div>
      <div className='HERO-SECTION flex flex-col justify-center rounded-lg p-2 flex-1 h-full'>
        <header className='flex items-center justify-between rounded-lg'>
          <div className='rounded-full'>
            <Image src={logo} alt="paylume.logo" height={150} width={150} className=" rounded-full" />
          </div>
          <div className='flex items-center justify-center gap-1 rounded-full py-1 px-3'>
            <span className='text-sm rounded-full p-1'>New on Paylume ?</span>
            <Link href='/auth/register'>
              <button className='rounded-lg p-1 w-20 bg-black text-white cursor-pointer hover:opacity-85 hover:shadow-md shadow-sm hover:scale-102 text-sm'>
                Register
              </button>
            </Link>
          </div>
        </header>
        <div className='flex items-center justify-center min-w-3/5 flex-2 rounded-lg'>
          <Image src={emailverfication} alt='email-verification' className='h-3/4 w-3/4'/>
        </div>
      </div>
    </div>
  )
}