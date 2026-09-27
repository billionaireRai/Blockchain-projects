'use client'

import { walletAddRegex } from '@/lib/Regex';
import axios from 'axios' ;

export default function useWalletAuthentication() {
    const getPublicWalletAddress = () => {

    }

    const sendWalletAddressToServer = (address:string) => { 

    }

    const signMessageViaWallet = () => { 

    }

    const verifyMessageByServer = (message:string) => {

    }

    return { getPublicWalletAddress , sendWalletAddressToServer , signMessageViaWallet , verifyMessageByServer } ;
}