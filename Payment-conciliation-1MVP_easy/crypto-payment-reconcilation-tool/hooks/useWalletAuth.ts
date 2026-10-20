'use client'

import { walletAddRegex } from '@/lib/regex.utils';
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