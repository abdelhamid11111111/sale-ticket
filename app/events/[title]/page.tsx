"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { EventForm } from "../../types/types";
import FirstForm from "../../components/ui/modals/Form";

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
      <Navbar query="" />

      {/* Main Content */}
      {event ? 
      (
        <main key={event.id} className="row pt-8 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Image */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover bg-gray-500 w-full h-full"
                />
                {new Date(event.eventDate) < new Date() && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold tracking-widest">
                      SOLD OUT
                    </span>
                  </div>
                )}
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
                        <span style={{ display: "flex", gap: "4px" }}>
                          <span>{event.location},</span>
                          <span>{event.city.name}</span>
                        </span>
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

                {new Date(event.eventDate) > new Date() && (
                  <div className="pt-4">
                    <FirstForm
                      price={event.price}
                      title={event.title}
                      image={event.image}
                      eventDate={event.eventDate}
                      cityId={event.city.id}
                      eventId={event.id}
                    />

                    <p className="text-center text-xs text-slate-400 mt-4">
                      No hidden fees. Cancel anytime within 24h.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="grow pt-8 pb-20 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Image skeleton */}
              <div className="w-full aspect-square rounded-lg bg-slate-200" />

              {/* Right: Content skeleton */}
              <div className="space-y-8">
                {/* Title */}
                <div className="space-y-3">
                  <div className="h-10 w-3/4 bg-slate-200 rounded-lg" />
                  <div className="h-10 w-1/2 bg-slate-200 rounded-lg" />
                </div>

                {/* Date & Location */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200" />
                    <div className="space-y-2">
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                      <div className="h-4 w-32 bg-slate-200 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200" />
                    <div className="space-y-2">
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-slate-200 pt-6 space-y-2">
                  <div className="h-3 w-10 bg-slate-200 rounded" />
                  <div className="h-10 w-28 bg-slate-200 rounded-lg" />
                </div>

                {/* About */}
                <div className="space-y-3">
                  <div className="h-6 w-40 bg-slate-200 rounded-lg" />
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded" />
                </div>

                {/* Button */}
                <div className="pt-4 space-y-3">
                  <div className="h-14 w-full bg-slate-200 rounded-full" />
                  <div className="h-3 w-48 bg-slate-200 rounded mx-auto" />
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
