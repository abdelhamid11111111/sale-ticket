"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href='/'>
          <div className="text-xl font-bold tracking-tight text-slate-900">
            TicketFlow
          </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full flex items-center bg-slate-100 rounded-full px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-primary/40 transition">
              <input
                type="text"
                placeholder="Search events, artists, or venues..."
                className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />

              <button className="bg-primary text-white dark:bg-slate-800 px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
                Search
              </button>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              className="text-slate-600 hover:text-primary text-sm font-medium"
              href="#"
            >
              About
            </a>
            <a
              className="text-slate-600 hover:text-primary text-sm font-medium"
              href="#"
            >
              Contact
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-700"
          >
            {open ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t border-slate-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button className="bg-primary text-white dark:bg-slate-800 px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
                Search
              </button>
            </div>

            {/* Links */}
            <a href="#" className="block text-slate-700 font-medium">
              About
            </a>
            <a href="#" className="block text-slate-700 font-medium">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
