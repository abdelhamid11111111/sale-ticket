import React, { useState } from 'react';
import { Ticket, Facebook, Twitter, Instagram, Mail, ArrowRight, MapPin } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false) ;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <footer className="mt-12 bg-[#0e1330] text-[#c9cee6]">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Brand + newsletter */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-4">
            <Ticket className="w-6 h-6 text-[#ffb648] rotate-[-20deg]" strokeWidth={2} />
            <span className="text-xl font-bold text-white tracking-tight">TicketFlow</span>
          </div>
          <p className="text-sm leading-relaxed text-[#8b91b8] max-w-xs">
            Discover, explore, and buy tickets for events you love — concerts,
            shows, and everything worth showing up for.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 max-w-sm">
            <label htmlFor="footer-email" className="block text-xs font-medium text-[#8b91b8] mb-2">
              Get notified when new events drop near you
            </label>
            {submitted ? (
              <p className="text-sm text-[#ffb648] flex items-center gap-2">
                <Mail className="w-4 h-4" /> You're on the list.
              </p>
            ) : (
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 min-w-0 bg-[#171c40] border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-[#5c6290] focus:outline-none focus:ring-2 focus:ring-[#ffb648]/50 focus:border-[#ffb648]/50"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-[#ffb648] hover:bg-[#ffc670] text-[#1a1200] font-semibold text-sm px-4 py-2 rounded-md transition-colors flex items-center gap-1.5"
                >
                  Notify me
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Link columns */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-[#ffb648] transition-colors">About</a></li>
            <li><a href="#" className="hover:text-[#ffb648] transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-[#ffb648] transition-colors">Press</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-[#ffb648] transition-colors">Help center</a></li>
            <li><a href="#" className="hover:text-[#ffb648] transition-colors">Refund policy</a></li>
            <li><a href="#" className="hover:text-[#ffb648] transition-colors">Contact us</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-semibold text-white mb-4">Follow along</h4>
          <div className="flex gap-3 mb-5">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#ffb648]/60 hover:text-[#ffb648] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#ffb648]/60 hover:text-[#ffb648] transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#ffb648]/60 hover:text-[#ffb648] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm text-[#8b91b8] flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            Live events, everywhere you are.
          </p>
        </div>
      </div>

      {/* Ticket-stub tear line */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#05070f]" />
        <div className="border-t-2 border-dashed border-white/10" />
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#05070f]" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6c72a0]">
        <p>© 2026 TicketFlow. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#ffb648] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#ffb648] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#ffb648] transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
