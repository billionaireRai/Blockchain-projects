import { EIP1193Provider } from 'web3'

declare global {
  interface Window {
    ethereum?: EIP1193Provider
  }
}

export {}