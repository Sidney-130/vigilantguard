"use client";
import { useState } from "react";
import { Bell, Clock, Gauge, Settings, Menu } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <img src="logo.png" alt="logo" className="w-10 h-10" />
          <div>
            <h1 className="text-lg font-semibold">VigilantGuard</h1>
            <p className="text-md text-gray-700">Web3 Fraud Detection</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button className="text-blue-600 font-medium flex items-center gap-1">
            <Gauge size={16} /> Dashboard
          </button>
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <Clock size={16} /> Transactions
          </button>
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <Bell size={16} /> Alerts
          </button>
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <Settings size={16} /> Settings
          </button>
        </nav>

        {/* Wallet + Profile */}
        <div className="hidden md:flex items-center gap-3">
          <img src="eth-logo.png" className="w-5 h-5" />
          <span className="text-sm text-gray-600">bubu23qbase</span>
          <img src="profile-image.png" className="w-7 h-7 rounded-full" />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white p-4 space-y-4 text-sm">
          <button className="block w-full text-left text-blue-600 font-medium">
            Dashboard
          </button>
          <button className="block w-full text-left text-gray-700">
            Transactions
          </button>
          <button className="block w-full text-left text-gray-700">
            Alerts
          </button>
          <button className="block w-full text-left text-gray-700">
            Settings
          </button>

          <div className="pt-4 border-t flex items-center gap-2">
            <img src="eth-logo.png" className="w-5 h-5" />
            <span className="text-sm text-gray-600">bubu23qbase</span>
            <img src="/profile.png" className="w-7 h-7 rounded-full ml-auto" />
          </div>
        </div>
      )}
    </header>
  );
}
