"use client";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { EventForm } from "@/app/types/types";
import Link from "next/link";

const HeroSection = () => {
  const [events, setEvents] = useState<EventForm[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/usrUI/slides");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      fetchEvents();
    };
    load();
  }, []);

  return (
    <section className="relative pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-black text-4xl font-bold mb-4">Last Events</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        <div className="flex gap-4 animate-scroll">
          {events.length === 0
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden w-96 h-96 shrink-0 bg-slate-200 animate-pulse"
                >
                  <div className="absolute bottom-0 left-0 p-4 w-full flex flex-col gap-2">
                    <div className="h-3 w-24 bg-slate-300 rounded-md" />
                    <div className="h-5 w-48 bg-slate-300 rounded-md" />
                    <div className="h-3 w-32 bg-slate-300 rounded-md" />
                  </div>
                </div>
              ))
            : events.map((e) => (
                <div
                  key={e.id}
                  className="relative rounded-lg overflow-hidden w-96 h-96 shrink-0 group"
                >
                  <Link href={`/events/${e.title}`}>
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-slate-900">
                      <img
                        src={e.image}
                        alt={e.title}
                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* <Image
                  src={e.title}
                  alt={e.image}
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                /> */}
                    </div>

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-4 w-full flex flex-col items-start gap-1">
                      <span className="flex items-center gap-1 text-slate-200 text-xs font-medium">
                        <FaCalendarAlt />
                        {new Date(e.eventDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>

                      <h2 className="text-lg font-bold text-white leading-tight">
                        {e.title}
                      </h2>

                      <div className="flex items-center gap-1 text-slate-300 text-xs">
                        <FaLocationDot />
                        <span>
                          <span style={{ display: "flex", gap: "4px" }}>
                            <span>{e.location},</span>
                            <span>{e.city.name}</span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
