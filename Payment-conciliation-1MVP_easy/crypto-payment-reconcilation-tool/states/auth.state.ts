
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Usertype } from "@/types/user.type";
import { AuthStatus } from "@/types/authstatus.type";

interface UserAuthenticationState {
    user:Usertype | null ;
    isAuth:boolean ;
    authStatus:AuthStatus
}

export const useAuthState = create<UserAuthenticationState>()(persist((set) => ({
      user: { userId: "4950jfbhdgfr03", username: "@amritanshraii", email: "amritansh6136@gmail.com" },
      isAuth: true,
      authStatus: "authenticated",
      setUser: (usr: Usertype) => set({ user: usr }),
      setisAuth: (value: boolean) => set({ isAuth: value }),
      setauthStatus: (status: AuthStatus) => set({ authStatus: status })
    }),
    {
      name: "auth-states",
    }
  )
);