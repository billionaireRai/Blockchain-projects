
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRoles } from "@/types/userrole.type";

interface WorkspaceState {
  userRole:UserRoles
  activeWorkspaceId: string | null ;
  setActiveWorkspace: (id: string,role:UserRoles) => void ;
  clearWorkspace: () => void ;
}

export const useWorkspaceState = create<WorkspaceState>()(persist((set) => ({
    userRole:"GUEST" ,
    activeWorkspaceId: "ru38ryfbj9dfu3", // default state before authentication...
    clearWorkspace: () => set({ activeWorkspaceId: null , userRole:"GUEST" }), // generally used after logout...
    setActiveWorkspace: (id,role) => set({ activeWorkspaceId: id , userRole: role }), // trigger after successfull authentication...
    
  }),
  {
    name:'workspace-states'
  }
));