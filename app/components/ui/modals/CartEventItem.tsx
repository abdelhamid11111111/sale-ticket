"use client";
import React from "react";

interface Props {
  price: string;
  title: string;
  eventDate: string;
  image?: string;
}

const CartEventItem = ({ price, title, image, eventDate }: Props) => {
  return (
    <div>
      <div
        className="mt-6 p-4 rounded-xl flex items-center gap-4"
        style={{
          background: "#eef4fe",
          border: "1px solid rgba(19,91,236,0.1)",
        }}
      >
        <div className="h-12 w-12 rounded-lg object-cover shrink-0 shadow-sm">
          <img
            src={image}
            alt={title}
            className="h-12 w-12 rounded-lg object-cover shrink-0 shadow-sm"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className="text-sm font-bold truncate"
            style={{ color: "#0f172a" }}
          >
            {title}
          </h4>
          <p className="text-xs" style={{ color: "#64748b" }}>
            {new Date(eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {"   "}•{"   "}
            {new Date(eventDate).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="text-right">
          <span
            className="block text-sm font-bold"
            style={{ color: "#135bec" }}
          >
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartEventItem;
