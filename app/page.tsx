"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <button className="bg-blue-600 p-4" onClick={() => router.push("/login")}>
        Get Started
      </button>
    </div>
  );
}
