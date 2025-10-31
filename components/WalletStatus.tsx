"use client";

import { useState, useEffect } from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
} from "@starknet-react/core";
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit";
import { ChevronDown, LogOut, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WalletStatus() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  });

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  async function openWalletModal() {
    const { connector } = await starknetkitConnectModal();
    if (!connector) return;
    await connect({ connector: connector as Connector });
  }

  async function handleDisconnect() {
    await disconnect(); 
    setOpen(false);
    router.push("/login"); 
  }

  if (!address) {
    return (
      <button
        onClick={openWalletModal}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
      >
        <span className="text-xl">
          <Wallet />
        </span>
        <span>Connect Wallet</span>
      </button>
    );
  }
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 bg-green-50 border rounded-lg hover:bg-green-100 transition"
      >
        <span className="text-xl">
          <Wallet />
        </span>
        <span>{short}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-lg shadow-md p-2 z-50">
          <button
            onClick={handleDisconnect}
            className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm transition"
          >
            <LogOut className="w-4 h-4" />
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
}
