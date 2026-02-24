"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { Category, EventForm, apiRes } from "../../types/types";

const EventsGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<EventForm[]>([]);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        setCategories([{ id: "all", name: "All" }, ...data]);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchCategories();
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/usrUI/homepage");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error ", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex items-center justify-between pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Left side */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Explore Events
          </h2>
          <div className="mt-2 h-1 w-16 bg-primary rounded-full"></div>
        </div>

        {/* Right side */}
        <Link
          href="/events"
          className="text-sm font-semibold text-primary text-blue-500 hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          View all events
          <FaArrowRight />
        </Link>
      </div>

      {/* Categories - Horizontal Scroll */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium hover:bg-primary hover:dark:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Event Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-48 w-full">
              <img
                src={event.image}
                alt={event.title}
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              {/* Date + Time */}
              <div className="flex items-center justify-between text-sm">
                <span className="bg-blue-100 text-blue-600 font-semibold px-2 py-1 rounded-md text-xs">
                  {new Date(event.eventDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-slate-500 font-medium">
                  {new Date(event.eventDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900">
                {event.title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <FaLocationDot />
                {event.location}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Price</p>
                  <p className="text-lg font-bold text-slate-900">
                    ${event.price}
                  </p>
                </div>

                {/* Arrow Button */}
                <Link href={`/events/${event.title}`}>
                  <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-primary transition-all">
                    <FaArrowRight className="text-gray-400 hover:text-gray-300" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-12 mb-16 flex justify-center">
        <div className="flex items-center gap-2">
          {/* Previous */}
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition">
            <FaArrowLeft className="text-slate-600 text-sm" />
          </button>

          {/* Page Numbers */}
          <button className="w-10 h-10 rounded-full bg-primary text-gray-800 font-semibold shadow-md">
            1
          </button>

          <button className="w-10 h-10 rounded-full bg-slate-100 text-gray-800 hover:bg-slate-200 transition">
            2
          </button>

          <button className="w-10 h-10 rounded-full bg-slate-100 text-gray-800 hover:bg-slate-200 transition">
            3
          </button>

          <span className="px-2 text-slate-400">...</span>

          <button className="w-10 h-10 rounded-full bg-slate-100 text-gray-800 hover:bg-slate-200 transition">
            10
          </button>

          {/* Next */}
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition">
            <FaArrowRight className="text-slate-600 text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsGrid;
