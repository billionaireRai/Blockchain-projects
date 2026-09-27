'use client'

import Web3 from 'web3' ;
import { useRef } from 'react' ;
import { toast } from 'react-toastify' ;

export default function useConnectWallet() {
  const connectionRef = useRef<Web3 | null>(null) ; // for persistent connection reference...
  const connectWallet = async () => {
    if (!window.ethereum) { 
      toast.error('Wallets browser extenstion missing !!') ;
      throw new Error('Wallets browser extenstion missing...') ;
    }

    const web3 = new Web3(window.ethereum) ;
    connectionRef.current = web3 ;

    await window.ethereum.request({ method: 'eth_requestAccounts' }) ;

    return connectionRef ;
  }

  return { connectWallet } ;
}