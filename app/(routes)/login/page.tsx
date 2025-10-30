"use client";

import { useState, useEffect } from "react";
import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Connector, useAccount, useConnect } from "@starknet-react/core";
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const router = useRouter();

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (address) {
      router.push("/dashboard");
    }
  }, [address, router]);

  if (!mounted) return null;

  async function openWalletModal() {
    const { connector } = await starknetkitConnectModal();
    if (!connector) return;
    await connect({ connector: connector as Connector });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-sm aspect-square bg-white rounded-3xl shadow-lg flex items-center justify-center bg-linear-to-b from-white to-slate-100 ">
          <div className="relative">
            <img src="login-image.png" alt="img" className="w-40 h-40" />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="h-screen w-full md:w-1/2 bg-slate-100 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center flex flex-col gap-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-lg font-bold text-foreground">
                  VigilantGuard
                </h1>
                <p className="text-xs text-muted-foreground">
                  Web3 Fraud Detection
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2 text-balance leading-8">
              Connect your Wallet <br /> to Sign up
            </h2>
          </div>

          {/* Connected State */}
          <div className="mt-10">
            {address && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  Connected: {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              </div>
            )}
          </div>

          {/* Wallet Button — unchanged UI, now opens MODAL */}
          <div className="space-y-3 mb-8">
            <button
              onClick={openWalletModal}
              className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 md:gap-5 justify-center text-[14px] md:text-sm"
            >
              <div className="flex items-center gap-1">
                <img src="braavos-logo.png" alt="logo" className="w-7 h-7" />{" "}
                <span>Braavos Wallet</span>
              </div>
              <div className="flex items-center gap-0.5 md:gap-1">
                <img src="agent-logo.png" alt="logo" className="w-7 h-7" />{" "}
                <span>Ready Wallet</span>
              </div>
            </button>
          </div>

          {/* Sign In Instead */}
          <div className="text-center">
            <Link
              href="/login"
              className="mt-5 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-1 transition-colors"
            >
              Sign in instead
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
