'use client'

import Link from 'next/link';
import Image from 'next/image' ;
import { useState , useRef } from 'react';
import { useParams , useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, AtSignIcon, RefreshCcw } from "lucide-react"; // lightweight icons
import logo from '@/public/images/paylume-logo.png';
import emailverfication from '@/public/images/emailverification.jpg' ;

export function Verifyemail () {

  const { codeid } = useParams() ;
  const searchParams = useSearchParams() ;
  const inputRef = useRef<HTMLInputElement | null>(null) ;
  const [Otp, setOtp] = useState<string>("") ;
  const [Error, setError] = useState<string>("")
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);

  const handleOtpContainerClick = () => {
    inputRef.current?.focus();
  };
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };
  
  // function for email verification logi...
  async function handleVerifyLogic() {
    if (Otp.length !== 6) {
      setError(`Entered only ${Otp.length} digits yet...`) ;
      return ;
    }

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
          <form className="w-full relative max-w-md bg-white p-5 mx-5 rounded-xl">
            <input
              value={Otp}
              ref={inputRef}
              onChange={handleOtpChange}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              aria-label="6-digit email verification code"
              className="absolute inset-0 z-10 w-full h-0 cursor-text opacity-0"
            />
            <div onClick={handleOtpContainerClick} className="mb-6 border border-zinc-300 rounded-lg h-25 p-2">
              <div className="flex items-center justify-evenly rounded-lg h-full">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex h-full w-12 items-center justify-center rounded-xl border text-xl font-semibold transition-all duration-200 ${(index === Otp.length) ? "border-zinc-500 ring-4 ring-zinc-200" : "border-zinc-300"}`}
                  >
                    {Otp[index] ?? ""}
                  </div>
                ))}
              </div>
            </div>
            {Error && 
             <p className="text-red-500 text-xs p-2 flex items-center gap-2">
              <Image src='/images/warning.png' width={23} height={23} alt="warning"/>
              <span>
                {Error}
                </span>
             </p>
            }
            <div className="flex flex-col items-center justify-center gap-2 rounded-full p-1">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleVerifyLogic}
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