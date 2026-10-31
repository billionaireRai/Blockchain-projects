
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface globalUiState {
    deleteModal:boolean ;
    logoutModal:boolean ;
    clientErrorModal:boolean ;
    serverErrorModal:boolean ;
    addWalletModal:boolean ;
    addWorkspaceModal:boolean ;
    retryFn: (() => void | Promise<void>) | null;
    setdeleteModal:(value:boolean) => void ;
    setlogoutModal:(value:boolean) => void ;
    setclientErrorModal:(value:boolean) => void ;
    setserverErrorModal:(value:boolean,retryFn:(() => void | Promise<void>) | null) => void ;
    setaddWalletModal:(value:boolean) => void ;
}

export const useGlobalUI = create<globalUiState>()(persist((set) => ({
    deleteModal:true ,
    logoutModal:false ,
    clientErrorModal:false ,
    serverErrorModal:false ,
    addWalletModal:false ,
    addWorkspaceModal:false ,
    retryFn: null,
    setdeleteModal:(value:boolean) => set({ deleteModal:value }),
    setlogoutModal:(value:boolean) => set({ logoutModal:value }),
    setclientErrorModal:(value:boolean) => set({ clientErrorModal:value }),
    setserverErrorModal:(value:boolean,retryFn:(() => void | Promise<void>) | null) => set({ serverErrorModal:value , retryFn }),
    setaddWalletModal:(value:boolean) => set({ addWalletModal:value }),
    setaddWorkspaceModal:(value:boolean) => set({ addWorkspaceModal:value })
    }),
    {
      name: "globalui-states",
    }
  )
);