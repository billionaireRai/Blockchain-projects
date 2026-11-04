import Documentations from "./docs-ui";
import type { Metadata } from "next" ;

export const metadata: Metadata = {
  title: "How Paylume Works | Paylume Docs",
  description:
    "Explore how Paylume works behind the scenes, from detecting and verifying Ethereum transactions to automatically reconciling payments with confidence.",
};

export default function page() {
  return (
    <>
     <Documentations />
    </>
  )
}