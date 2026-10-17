
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface globalUiState {
    deleteModal:boolean ;
    removeModal:boolean ;
    setdeleteModal:(value:boolean) => void ;
    setremoveModal:(value:boolean) => void ;
}

export const useAuthState = create<globalUiState>()(persist((set) => ({
    deleteModal:false ,
    removeModal:false ,
    setdeleteModal:(value:boolean) => set({ deleteModal:value }),
    setremoveModal:(value:boolean) => set({ removeModal:value })
    }),
    {
      name: "globalui-states",
    }
  )
);