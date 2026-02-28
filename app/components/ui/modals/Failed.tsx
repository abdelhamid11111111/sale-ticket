import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

interface Prop {
  handleClose: () => void;
}

const FailedModal = ({ handleClose }: Prop) => {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
      {/* Failed Icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: "rgba(239,68,68,0.1)" }}
      >
        <MdErrorOutline size={36} style={{ color: "#ef4444" }} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>
        Purchase Failed!
      </h2>

      {/* Subtitle */}
      <p className="text-sm mb-8" style={{ color: "#64748b" }}>
        Something went wrong while processing <br /> your order. Please try
        again.
      </p>

      {/* Divider */}
      <div
        className="w-full border-t mb-8"
        style={{ borderColor: "#f1f5f9" }}
      />

      {/* Retry Button */}
      <button
        onClick={handleClose}
        className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 px-8 rounded-full transition-all active:scale-[0.98] group"
        style={{ background: "#ef4444" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#dc2626")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#ef4444")}
      >
        Try Again
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default FailedModal;
