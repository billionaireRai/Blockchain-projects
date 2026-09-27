
import { Verifyemail } from './verifyemail-ui' ;
import type { Metadata } from "next" ;

export const metadata: Metadata = {
  title: "Email Verification | Paylume",
  description:
    "Enter your verification code to confirm your email and complete your Paylume registration process.",
  robots: { index: false , follow: false }
};


export default function page() {
  return (
    <>
     <Verifyemail />
    </>
  )
}

