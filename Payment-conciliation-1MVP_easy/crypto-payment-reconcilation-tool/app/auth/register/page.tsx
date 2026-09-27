import { Register } from './register-ui' ;
import type { Metadata } from "next" ;

export const metadata: Metadata = {
  title: "Get Registered On Paylume | Paylume",
  description:
    "Complete registration by Creating your Paylume account and start reconciling Ethereum payments for free with confidence...",
};

export default function page() {
  return (
    <>
     <Register />
    </>
  )
}