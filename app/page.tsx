"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Shield } from "lucide-react";
import { features } from "@/components/Constants";

export default function Landing() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const router = useRouter();

  return (
    <div className="font-sans text-gray-800">
      <header className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={35}
            height={35}
            className="object-contain"
          />
          <div>
            {" "}
            <div className="text-lg font-semibold">VigilantGuard</div>
            <p className="text-sm">Web3 Fraud Detection</p>
          </div>
        </div>
        <button
          className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          onClick={() => router.push("/login")}
        >
          Get Started
        </button>
      </header>

      {/* Hero */}
      <section
        className="text-center py-20 px-4 bg-[#E6EEF5]"
        data-aos="fade-up"
      >
        <div className="">
          <div className="flex items-center gap-2 justify-center mb-3 text-xs text-blue-600 font-medium">
            <Shield size={16} />
            <p className="">Web3 Fraud Detection Platform</p>
          </div>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-linear-to-r from-[#155DFC] to-[#9810FA] bg-clip-text text-transparent">
          VigilantGuard
        </h1>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-600 mb-8">
          Protect your digital assets with AI-powered fraud detection. Real-time
          monitoring, behavioral analysis, and blockchain security combined.
        </p>
        <div className="flex justify-center gap-3">
          <button
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
            onClick={() => router.push("/login")}
          >
            <div className="flex items-center gap-3">
              {" "}
              Get Started <ArrowRight size={14} />
            </div>
          </button>
          <button className="border border-gray-300 px-5 py-2 rounded-md text-sm hover:bg-blue-200">
            Watch Demo
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 text-sm text-primary">
          <div>
            <div className="text-xl font-semibold">99.8%</div>
            <p className="text-neutral-800">Detection Accuracy</p>
          </div>
          <div>
            <div className="text-xl font-semibold">&lt;0.3s</div>
            <p className="text-neutral-800">Response Time</p>
          </div>
          <div>
            <div className="text-xl font-semibold">1.2%</div>
            <p className="text-neutral-800">False Positive Rate</p>
          </div>
          <div>
            <div className="text-xl font-semibold">$50M+</div>
            <p className="text-neutral-800">Assets Protected</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Comprehensive Protection
        </h2>
        <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
          Advanced security features designed to keep your Web3 transactions{" "}
          <br />
          safe from fraud and scams.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white flex items-start gap-4"
              data-aos="fade-up"
            >
              <div className="mt-1 shrink-0 w-9 h-9 text-primary bg-primary/10 p-2 flex items-center rounded-sm">
                {item.icon}
              </div>

              <div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        className="py-20 px-6 bg-blue-600 text-white text-center mx-8 rounded-3xl md:mx-20"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <p className="mb-8">
          Three simple steps to secure your Web3 transactions
        </p>
        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Connect Your Wallet",
              description:
                "Securely connect your Web3 wallet to start monitoring your transactions",
            },
            {
              title: "Configure Settings",
              description:
                "Customize your security preferences and risk tolerance levels",
            },
            {
              title: "Stay Protected",
              description:
                "Receive real-time alerts and automatic protection against fraud",
            },
          ].map((step, i) => (
            <div key={i}>
              <div className="text-3xl font-medium mb-2">{i + 1}</div>
              <p className="text-sm">{step.title}</p>
              <p className="text-sm opacity-80">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-24 text-center px-6" data-aos="fade-up">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          Ready to Secure Your Web3 Transactions?
        </h3>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Join thousands of users protecting their digital assets with
          VigilantGuard.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md"
          onClick={() => router.push("/login")}
        >
          Launch Dashboard
        </button>
      </section>
      <footer className="py-10 text-center text-xs text-gray-500 border-t border-gray-200">
        © 2025 VigilantGuard. All rights reserved.
      </footer>
    </div>
  );
}
