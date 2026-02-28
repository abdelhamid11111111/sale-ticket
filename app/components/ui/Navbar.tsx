"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PropType {
  query: string;
}

export default function Navbar({ query }: PropType) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(query ?? "");
  const router = useRouter();

  const handleSearch = async () => {
    if (!search.trim()) return;
    const encoded = encodeURIComponent(search.trim());
    router.push(`/search?query=${encoded}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="text-xl font-bold tracking-tight text-slate-900">
              TicketFlow
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full flex items-center bg-slate-100 rounded-full px-2 py-1 shadow-sm">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-primary text-white px-5 py-2 dark:bg-slate-800 rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
              >
                Search
              </button>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              className="text-white bg-primary dark:bg-slate-800 hover:bg-slate-600 rounded-full px-5 py-2 text-sm font-medium transition-all"
              href="/mytickets"
            >
               MyTickets
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-700 p-2"
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
          <div className="px-4 py-5 space-y-4">

            {/* Mobile Search */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search events..."
                className="w-full px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-primary text-white dark:bg-slate-800 px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
              >
                Search
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* MyTickets - full width card style */}
            <Link
              href="/mytickets"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 transition-all"
            >
              <span className="text-2xl">🎟️</span>
              <div>
                <p className="text-sm font-semibold text-slate-800">My Tickets</p>
                <p className="text-xs text-slate-400">View your booked events</p>
              </div>
              <span className="ml-auto text-slate-400 text-lg">›</span>
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}