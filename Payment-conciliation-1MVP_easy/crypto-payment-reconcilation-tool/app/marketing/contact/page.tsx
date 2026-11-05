import { Contact } from "./contact-ui";
import type { Metadata } from "next" ;

export const metadata: Metadata = {
  title: "Get in Touch | Paylume",
  description:
    "Enjoying Paylume or interested in working together ? Get in touch for professional inquiries, business collaborations, partnerships, and opportunities to build with us.",
};


export default function page() {
  return (
    <>
     <Contact />
    </>
  )
}