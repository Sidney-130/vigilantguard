import type React from "react";
import StarknetProvider from "../Providers";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StarknetProvider>{children}</StarknetProvider>;
}
