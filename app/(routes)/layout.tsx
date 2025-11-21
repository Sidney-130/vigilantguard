import type React from "react";
import { Toaster } from "sonner";
import { Web3Provider } from "@/hooks/WagmiProvider";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Web3Provider>
      {children}
      <Toaster position="top-right" />
    </Web3Provider>
  );
}
