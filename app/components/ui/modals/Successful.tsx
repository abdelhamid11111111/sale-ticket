"use client";

import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const SuccessModal = () => {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
      {/* Success Icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: "rgba(34,197,94,0.1)" }}
      >
        <FaCheckCircle size={36} style={{ color: "#22c55e" }} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>
        Purchase Successful!
      </h2>

      {/* Subtitle */}
      <p className="text-sm mb-8" style={{ color: "#64748b" }}>
        Your tickets have been booked. <br /> Check your email for confirmation.
      </p>

      {/* Divider */}
      <div
        className="w-full border-t mb-8"
        style={{ borderColor: "#f1f5f9" }}
      />

      {/* Go Home Button */}
      <Link href={'/'}>
      <button
       
        className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 px-8 rounded-full transition-all active:scale-[0.98] group"
        style={{ background: "#135bec" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#0e45b5")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#135bec")}
      >
        Go to Home
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      </Link>
    </div>
  );
};

export default SuccessModal;
