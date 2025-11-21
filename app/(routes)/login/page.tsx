"use client";

import { useState, useEffect } from "react";
import { Shield, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect({
    mutation: {
      onError: (error) => {
        handleConnectionError(error.message);
      },
      onSuccess: () => {
        setShowContinueButton(true);
      },
    },
  });
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const filteredConnectors = connectors.filter((connector) =>
    ["metamask", "okx"].some((wallet) =>
      connector.name.toLowerCase().includes(wallet)
    )
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected) {
      setShowContinueButton(true);
    }
  }, [isConnected]);

  useEffect(() => {
    if (error) {
      handleConnectionError(error.message);
    }
  }, [error]);

  if (!mounted) return null;

  function handleConnectionError(message: string) {
    let friendlyMessage = "Please use metamask";

    if (message.includes("rejected")) {
      friendlyMessage = "Connection was rejected. Please try again.";
    } else if (message.includes("user rejected")) {
      friendlyMessage = "You cancelled the connection. Feel free to try again.";
    }

    toast.error(friendlyMessage);
  }

  function handleContinueToDashboard() {
    router.push("/dashboard");
  }

  return (
    <div className="h-screen bg-background flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-sm aspect-square bg-white rounded-3xl shadow-lg flex items-center justify-center bg-linear-to-b from-white to-slate-100 ">
          <div className="relative">
            <img src="login-image.png" alt="img" className="w-40 h-40" />
          </div>
        </div>
      </div>

      <div className="h-screen w-full md:w-1/2 bg-slate-100 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
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

          <div className="mt-10">
            {address && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
                <p className="text-sm text-green-800">
                  Connected: {address.slice(0, 6)}...{address.slice(-4)}
                </p>
                <button
                  onClick={() => {
                    disconnect();
                    setShowContinueButton(false);
                  }}
                  className="text-xs text-red-600 hover:text-red-800 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3 mb-8 mt-4">
            {!isConnected && (
              <div className="space-y-3">
                {filteredConnectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => {
                      setConnectionError(null);
                      connect({ connector });
                    }}
                    className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 md:gap-5 justify-center text-[14px] md:text-sm"
                  >
                    <span>{connector.name}</span>
                  </button>
                ))}
              </div>
            )}

            {showContinueButton && isConnected && (
              <button
                onClick={handleContinueToDashboard}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Continue to Dashboard
              </button>
            )}
          </div>

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
