import { Resetui } from "./reset-ui";
import type { Metadata } from "next" ;

export const metadata: Metadata = {
  title: "Reset Your Password | Paylume",
  description:
  "Securely reset your Paylume account password by entering a new password and confirming it. Ensure your password meets the required security criteria to help protect your account.",
};

export default function page() {
  return (
    <>
     <Resetui />
    </>
  )
}
