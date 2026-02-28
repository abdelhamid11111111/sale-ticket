"use client";
import React, { useEffect, useState } from "react";
import { FaTicket, FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";
import Navbar from "../components/ui/Navbar";
import { Tickets } from "../types/types";




const MyTickets = () => {
  const [tickets, setTickets] = useState<Tickets[]>([]);

  const fetchTickets = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/usrUI/mytickets?sessionId=${sessionId}`);
      if (!res.ok) return;
      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    const load = () => {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) return;
      fetchTickets(sessionId);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f6f6f8" }}>
      <Navbar query="" />
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#0f172a" }}
            >
              <FaTicket size={16} color="#fff" />
            </div>
            <h1
              className="text-3xl font-extrabold"
              style={{ color: "#0f172a" }}
            >
              My Tickets
            </h1>
          </div>
          <p className="text-sm pl-1" style={{ color: "#64748b" }}>
            All your purchased tickets in one place.
          </p>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-2xl overflow-hidden border"
              style={{
                background: "#ffffff",
                borderColor: "#f1f5f9",
                boxShadow: "0 4px 20px -4px rgba(0,0,0,0.06)",
              }}
            >
              <div className="p-5">
                <div className="flex gap-4">
                  {/* Image */}
                  <img
                    src={ticket.event.image}
                    alt={ticket.event.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className="font-bold text-base leading-tight truncate"
                        style={{ color: "#0f172a" }}
                      >
                        {ticket.event.title}
                      </h3>
                    </div>
                    <div
                      className="flex items-center gap-1 text-xs mb-1"
                      style={{ color: "#64748b" }}
                    >
                      <FaCalendarAlt size={11} />
                      <span>
                        {new Date(ticket.event.eventDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                        {"  -   "}
                        {new Date(ticket.event.eventDate).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "#64748b" }}
                    >
                      <FaLocationDot size={11} />
                      <span className="truncate">{ticket.event.location}{'  -  '}{ticket.city.name}</span>
                    </div>
                  </div>
                </div>

                {/* Divider dashed */}
                <div
                  className="my-4 border-t border-dashed"
                  style={{ borderColor: "#e2e8f0" }}
                />

                {/* Bottom row */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>
                      Quantity
                    </p>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#0f172a" }}
                    >
                      {ticket.quantity} Tickets
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>
                      Total Price
                    </p>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#135bec" }}
                    >
                      ${ticket.totalPrice}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>
                      Order ID
                    </p>
                    <div className="flex items-center gap-1">
                      <MdConfirmationNumber
                        size={12}
                        style={{ color: "#135bec" }}
                      />
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#0f172a" }}
                      >
                        {ticket.id}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>
                      Purchased
                    </p>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#0f172a" }}
                    >
                      {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "#f1f5f9" }}
            >
              <FaTicket size={28} style={{ color: "#94a3b8" }} />
            </div>
            <h3 className="text-lg font-bold mb-1" style={{ color: "#0f172a" }}>
              No tickets yet
            </h3>
            <p className="text-sm text-center" style={{ color: "#94a3b8" }}>
              Your purchased tickets will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
