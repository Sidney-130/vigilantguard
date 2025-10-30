"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center bg-white h-screen">
      <button
        className="bg-blue-600 p-4 rounded-md text-white"
        onClick={() => router.push("/login")}
      >
        Get Started
      </button>
    </div>
  );
}
