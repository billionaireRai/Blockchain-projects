import { Login } from './login-ui' ;
import type { Metadata } from "next" ;

export const metadata: Metadata = {
  title: "Log In Your Account | Paylume",
  description:
    "Securely log in to your Paylume account to reconcile crypto payments, track blockchain transactions, and manage payment activity.",
};

export default function page() {
  return (
    <>
     <Login />
    </>
  )
}
