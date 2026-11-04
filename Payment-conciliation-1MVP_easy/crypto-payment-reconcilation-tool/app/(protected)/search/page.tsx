import SearchPage from "./search-ui";
import type { Metadata } from "next" ;

export const metadata: Metadata = { 
    title: "Search Results | Paylume",
    description:
    "Search Paylume to quickly find transactions, payment records, and relevant account information across your Ethereum payment reconciliation dashboard.",
};;

export default function page() {
  return (
    <>
     <SearchPage />
    </>
  )
}