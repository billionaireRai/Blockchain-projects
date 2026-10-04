import { Forgotui } from "./forgot-ui";
import type { Metadata } from "next" ;

export const metadata: Metadata = {
  title: "Forgot Your Password | Paylume",
  description:
    "Reset your Paylume account password securely. Enter your registered email address and we’ll send you a link to create a new password.",
};

export default function page() {
  return (
    <>
     <Forgotui />
    </>
  )
}
