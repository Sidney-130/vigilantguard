import type React from "react";
import StarknetProvider from "../Providers";
import { Toaster } from "sonner";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StarknetProvider>
      {children}
      <Toaster position="top-right" />
    </StarknetProvider>
  );
}
