"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet2 } from "lucide-react";

export function Connectwallet() {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        return (
          <button
            type="button"
            disabled={!mounted || !openConnectModal}
            onClick={openConnectModal}
            className="border-none outline-none text-red-600 bg-red-50 cursor-pointer shadow-sm hover:shadow-md hover:bg-red-100 active:bg-red-50 hover:scale-103 rounded-xl py-2 px-4 flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Wallet2 /><span>Connect Wallet</span>
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}