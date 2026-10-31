'use client'

import { Trash2 , AlertTriangle , X, LoaderCircleIcon } from 'lucide-react';
import Modal from './Modal';
import { useGlobalUI } from '@/states/ui.state';
import { useState } from 'react';
import { MiniLoader } from './MiniLoader';

type DeletionForTypes = 'Wallet' | 'Workspace' | 'Item' ;

interface DeleteModalProps {
    type?: DeletionForTypes ;
    onTrigger:() => void ;
}

export function DeleteModal ({ onTrigger , type='Item' } : DeleteModalProps ) {
  const [isDeleting, setisDeleting] = useState<boolean>(false) ;
  const { deleteModal , setdeleteModal } = useGlobalUI() ; // ui states hook initialization...
  const upperCaseType = type.toUpperCase() ;

  // fucntion for deletion...
  async function handleDeletionLogic() : Promise<void> {
    setisDeleting(true);
    // onTrigger();
  }

  if (!deleteModal) return null ;

  return (
  <Modal showPop={deleteModal} >
    <div className="w-full max-w-lg font-rubik rounded-2xl bg-white py-2 px-4 shadow-xl">
     {/* Header */}
     <div className="flex items-center justify-between">
      <section className='flex gap-1 items-center rounded-lg'>
       {/* Warning Icon */}
       <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-red-50">
         <Trash2 size={28} className="text-red-500" />
       </div>
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          Perform delete {upperCaseType} ?
        </h2>
      </section>
    
       {/* Close Button */}
        <button
          type="button"
          onClick={() => setdeleteModal(false)}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent text-gray-400 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-900 active:scale-95"
        >
          <X size={17} strokeWidth={1.8} />
        </button>
     </div>
    
     {/* Content */}
     <div className="p-1 rounded-lg">
       <p className="p-2 rounded-lg text-sm leading-6 text-gray-500">
         Are you sure you want to delete this {upperCaseType} ?
         This action is permanent and cannot be undone.
       </p>
     </div>
    
     {/* Warning Message */}
     <div className="mt-2 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/70 p-3.5">
       <AlertTriangle
         size={18}
         className="mt-0.5 shrink-0 text-red-500"
       />
       <p className="text-xs leading-5 text-red-700">
         Once deleted, this {upperCaseType} its associated data
         will be permanently removed from your access...
       </p>
     </div>
    
     {/* Action Buttons */}
      <div className="flex mt-4 p-1 items-center justify-center rounded-full border border-gray-200 gap-1">
       <button
         onClick={() => setdeleteModal(false)}
         className="rounded-full cursor-pointer flex-1 border border-gray-100 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
       >
         Cancel
       </button>
       <button disabled={isDeleting} onClick={handleDeletionLogic} className="flex items-center justify-center gap-2 rounded-full cursor-pointer flex-1 bg-red-600 px-5 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-red-600 text-white shadow-sm transition hover:bg-red-700 active:scale-[1.01]">
         { isDeleting ? ( 
            <>
              <MiniLoader />
              <span>Deleting</span>
            </> 
           ) : ( 
            <>
              <Trash2 size={18} /><span>Delete {type}</span>
            </>
         )}
       </button>
     </div>
    </div>
   </Modal>
  )
}

