"use client";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CartEventItem from "./CartEventItem";

interface Prop {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  price: string;
  title: string;
  eventDate: string;
  subtotal: number
  image?: string;
}

const SecondForm = ({
  quantity,
  setQuantity,
  price,
  title,
  subtotal,
  image,
  eventDate,
}: Prop) => {

  

  return (
    <div className="">
      <div className="m-8">
        <CartEventItem
          price={price}
          eventDate={eventDate}
          title={title}
          image={image}
        />
      </div>

      {/* Quantity Selector */}
      <div className="px-8 py-8 flex flex-col items-center justify-center">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
            style={{ border: "2px solid #e2e8f0", color: "#94a3b8" }}
          >
            <FaMinus size={16} />
          </button>
          <div className="flex flex-col items-center w-16">
            <span
              className="text-4xl font-extrabold"
              style={{ color: "#0f172a" }}
            >
              {quantity}
            </span>
          </div>
          <button
            onClick={() => setQuantity(Math.min(6, quantity + 1))}
            className="w-14 h-14 rounded-full flex bg-slate-900 items-center justify-center transition-all active:scale-95 text-white"
            style={{
              boxShadow: "0 10px 15px -3px rgba(19,91,236,0.3)",
            }}
          >
            <FaPlus size={16} />
          </button>
        </div>
        <p className="text-xs mt-4 font-medium" style={{ color: "#94a3b8" }}>
          Max 6 tickets per order
        </p>
      </div>

      {/* Cost Breakdown */}
      <div className="px-8 pb-4">
        <div
          className="border-t py-4 space-y-2"
          style={{ borderColor: "#f1f5f9" }}
        >
          <div
            className="flex justify-between text-sm"
            style={{ color: "#64748b" }}
          >
            <span>Total ({quantity} tickets)</span>
            <span className="font-medium" style={{ color: "#334155" }}>
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div
            className="flex justify-between text-sm"
            style={{ color: "#64748b" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SecondForm;
