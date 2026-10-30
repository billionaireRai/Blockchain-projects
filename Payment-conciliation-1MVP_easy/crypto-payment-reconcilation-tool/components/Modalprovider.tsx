'use client'

import Modal from './Modal';
import { useGlobalUI } from '@/states/ui.state';
import { ModalDataType } from '@/types/status.type';
import { AlertCircle , ArrowRight , ServerCrash, AlertTriangle, RefreshCw, X, ArrowUpRight, Activity } from "lucide-react";
import Activebeep from './Beep';
import { useRouter } from 'next/navigation';


export function Modalprovider() { // Modaldata:ModalDataType
    const router = useRouter();
    const { clientErrorModal , setclientErrorModal , serverErrorModal , setserverErrorModal , retryFn } = useGlobalUI() ; // ui states hook initialization...
    
    const Modaldata:ModalDataType = {
       type: "error",
       title: "Bad Request",
       status:502,
       message: "Invalid request. Please check your input.",
       description: "The server could not process your request because some information was missing, incorrect, or improperly formatted."
    }
  return (
    <>
      <Modal showPop={clientErrorModal} >
          <div className="relative font-rubik flex w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 shadow-2xl sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
           <div className="flex min-w-0 items-center gap-4">
             {/* Error Icon */}
             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50">
               <AlertCircle size={40} strokeWidth={1.7} className="text-red-500"
               />
             </div>
             {/* Title & Message */}
             <div className="flex min-w-0 flex-col gap-1">

               <h2 className="text-xl font-semibold tracking-tight text-gray-950">
                 {Modaldata.title}
               </h2>

               <p className="text-sm font-medium leading-relaxed text-gray-500">
                 {Modaldata.message}
               </p>

             </div>
           </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setclientErrorModal(false)}
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent text-gray-400 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-900 active:scale-95"
            >
              <X size={17} strokeWidth={1.8} />
            </button>
          </div>

          {/* Divider */}
          <div className="my-4 h-px w-full bg-gray-100" />
          {/* HTTP Status Section */}
          <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                  Response Status
                </span>

                <div className="flex items-center gap-2">

                  <span className="font-mono text-sm font-semibold text-red-600">
                    HTTP 400
                  </span>

                  <span className="h-3.5 w-px bg-red-200" />

                  <span className="text-xs font-medium text-red-500">
                    Client Error
                  </span>

                </div>
              </div>
            </div>
         {/* Active Indicator */}
         <Activebeep />
        </div>

        {/* Description Section */}
        <div className="mt-5 flex flex-col gap-2">

         <div className="flex items-center gap-2">
           <span className="text-xs font-semibold uppercase tracking-wider text-gray-800">
             What happened?
           </span>
         </div>

         <div className="rounded-xl border border-gray-200/80 bg-gray-50/70 px-4 py-4">

           <p className="text-[13px] leading-6 text-gray-600">
             {Modaldata.description}
           </p>

         </div>
        </div>
          {/* Footer */}
          <div className="mt-7 flex flex-col gap-4">

            {/* Support Note */}
            <p className="text-center text-xs leading-relaxed text-gray-400">
              Please review your request before trying again...
            </p>

            {/* Primary Action */}
            <button
              type="button"
              onClick={() => setclientErrorModal(false)}
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-[0.99]"
            >
              Understood

              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </Modal>
      <Modal showPop={serverErrorModal}>
        <div className="relative w-full max-w-lg font-rubik overflow-hidden rounded-3xl bg-white shadow-2xl">
         {/* Dark Header Section */}
         <div className="relative overflow-hidden rounded-xl px-6 py-5">
          {/* Header Controls */}
          <div className="relative flex items-center justify-between">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-2">
              <Activebeep />
              <span className="text-xs font-semibold uppercase text-red-400">
                Internal Server Error
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setserverErrorModal(false,null)}
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent text-gray-400 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-900 active:scale-95"
            >
              <X size={17} strokeWidth={1.8} />
            </button>
          </div>

          {/* Main Header */}
          <div className="relative mt-7 flex items-start gap-4">
           {/* Server Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 shadow-inner">
              <ServerCrash size={28} strokeWidth={1.5} className="text-red-400" />
            </div>

            {/* Title & Message */}
            <div className="flex min-w-0 flex-col">
             <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">
               {Modaldata.title}
             </h2>
             <p className="text-[13px] leading-relaxed text-gray-400">
              {Modaldata.message}
             </p>
            </div>
          </div>
         </div>

         {/* Main Content */}
        <div className="px-6 py-5">
         {/* Status Information */}
         <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-2">
           <div className="flex items-center gap-3">
             {/* Activity Icon */}
             <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
               <Activity size={18} strokeWidth={1.8} className="text-gray-600" />
             </div>
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                 System Response
               </span>
               <span className="font-mono text-xs font-semibold text-gray-800">
                 HTTP {Modaldata.status}
               </span>
             </div>
           </div>
           {/* Error State */}
           <div className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1.5">
             <span className="text-xs font-semibold uppercase text-red-600">
               Failed
             </span>
           </div>
         </div>
        {/* Error Description */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 rounded-full bg-orange-500" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-800">
              Error Details
            </h3>
          </div>
          <p className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-4 text-[13px] leading-6 text-gray-600">
            {Modaldata.description}
          </p>
        </div>

        {/* Advisory Section */}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50/60 px-4 py-3.5">
          <AlertTriangle size={25} strokeWidth={1.8} className="shrink-0 text-orange-500" />
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-semibold text-orange-900">
              What should you do?
            </h4>
            <p className="text-xs leading-relaxed text-orange-800/80">
              This issue appears to be temporary. Please try again
              after a moment. If it continues, contact our support team.
            </p>
          </div>
        </div>
         {/* Footer Actions */}
         <div className="flex mt-4 p-1 items-center justify-center rounded-full border border-gray-200 gap-1">
           {/* Dismiss */}
           <button
             type="button"
             onClick={() => setserverErrorModal(false,null) }
             className="flex group flex-1 items-center justify-center cursor-pointer gap-2 rounded-full px-4 py-3 text-sm font-medium text-gray-500 transition-all duration-200 bg-gray-100 hover:bg-gray-200 hover:text-gray-900"
           >
             <span>Dismiss</span>
             <ArrowUpRight size={16} className='transition-transform duration-300 group-hover:translate-x-0.5 -group-hover:translate-y-1 group-hover:scale-103' />
           </button>

           {/* Retry */}
           <button
             type="button"
             onClick={() => {
               setserverErrorModal(false, router.refresh() ?? null);
               void retryFn?.()
             }}
             className="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-[0.98]"
           >
             <RefreshCw size={16} className="transition-transform duration-300 group-hover:rotate-45" />
             <span>Try Again</span>
           </button>
         </div>
       </div>
     </div>
      </Modal>
    </>
    )
}
