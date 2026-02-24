"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { EventForm } from "../../types/types";

const ProductPage = () => {
  const { title } = useParams();
  const [event, setEvent] = useState<EventForm | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/admin/event/${title}`);
        const data = await res.json();
        setEvent(data);
        // if (data.image) {
        //   setImgPreview(data.image);
        // }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchEvent();
  }, [title]);

  return (
    <div className="bg-background-light text-slate-900 font-display antialiased min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      {event && (
        <main key={event.id} className="flex-grow pt-8 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Image */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  alt={event.title}
                  className="w-full h-full object-cover"
                  src={event.image}
                />
              </div>

              {/* Right Column: Content */}
              <div className="space-y-8">
                {/* Title */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                    {event.title}
                  </h1>
                </div>

                {/* Info: Location and Time */}
                <div className="flex flex-wrap items-center gap-6">
                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaCalendarAlt className="text-lg text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        Date & Time
                      </p>
                      <p className="font-bold text-slate-900">
                        {/* Oct 12, 2024 • 9:00 AM */}
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        {"   "}•{"   "}
                        {new Date(event.eventDate).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaLocationDot className="text-lg text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        Location
                      </p>
                      <p className="font-bold text-slate-900">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-slate-200 pt-6">
                  <p className="text-slate-500 text-sm font-medium mb-1">
                    Price
                  </p>
                  <p className="text-4xl font-extrabold text-slate-900">
                    ${event.price}
                  </p>
                </div>

                {/* About this Event */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    About this Event
                  </h3>
                  <p className="leading-relaxed mb-4 text-slate-600">
                    {event.description}
                  </p>
                </div>

                {/* Book Now Button */}
                <div className="pt-4">
                  <button className="w-full bg-primary dark:bg-slate-800 hover:bg-primary-hover text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                    <span>Book Now</span>
                    <FaArrowRight />
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    No hidden fees. Cancel anytime within 24h.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Simple Footer */}
      <Footer />
    </div>
  );
};

export default ProductPage;
