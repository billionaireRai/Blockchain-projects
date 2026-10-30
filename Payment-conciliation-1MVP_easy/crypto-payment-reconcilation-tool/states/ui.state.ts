
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface globalUiState {
    deleteModal:boolean ;
    removeModal:boolean ;
    clientErrorModal:boolean ;
    serverErrorModal:boolean ;
    retryFn: (() => void | Promise<void>) | null;
    setdeleteModal:(value:boolean) => void ;
    setremoveModal:(value:boolean) => void ;
    setclientErrorModal:(value:boolean) => void ;
    setserverErrorModal:(value:boolean,retryFn:(() => void | Promise<void>) | null) => void
}

export const useGlobalUI = create<globalUiState>()(persist((set) => ({
    deleteModal:false ,
    removeModal:false ,
    clientErrorModal:false ,
    serverErrorModal:true ,
    retryFn: null,
    setdeleteModal:(value:boolean) => set({ deleteModal:value }),
    setremoveModal:(value:boolean) => set({ removeModal:value }),
    setclientErrorModal:(value:boolean) => set({ clientErrorModal:value }),
    setserverErrorModal:(value:boolean,retryFn:(() => void | Promise<void>) | null) => set({ serverErrorModal:value , retryFn })
    }),
    {
      name: "globalui-states",
    }
  )
);