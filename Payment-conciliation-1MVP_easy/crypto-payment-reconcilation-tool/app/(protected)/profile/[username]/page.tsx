import ProfilePage from "./profile-ui";
import type { Metadata } from "next" ;

export const metadata: Metadata = { 
    title: "Your Profile | Paylume",
    description: "Manage your Paylume profile, update your account details, and keep track of your Ethereum payment reconciliation activities securely.",
};

export default function page() {
  return (
    <>
     <ProfilePage />
    </>
  )
}