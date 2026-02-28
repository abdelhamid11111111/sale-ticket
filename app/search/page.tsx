"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { EventForm } from "../types/types";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const [results, setResults] = useState<EventForm[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/usrUI/search?query=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      fetchResults();
    };
    load();
  }, [query]);

  return (
    <div className="">
      {/* Navigation */}

      <div className="sticky top-0 z-50">
        <Navbar query={query} />
      </div>

      {/* Main Content */}
      <div className="text-2xl font-bold text-slate-900 px-4 sm:px-6 mt-14 lg:px-8 max-w-7xl mx-auto">
        Results found for keyword, {query}
      </div>
      <section className="px-4 sm:px-6 pt-5 lg:px-8 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-slate-100 rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-48 w-full bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-24 bg-slate-200 rounded-md" />
                <div className="h-4 w-36 bg-slate-200 rounded-md" />
                <div className="h-3 w-20 bg-slate-200 rounded-md" />
                <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                  <div className="h-5 w-12 bg-slate-200 rounded-md" />
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          ))
        ) : results.length === 0 ? (
          <div className="col-span-2 sm:col-span-2 lg:col-span-4 flex flex-col items-center justify-center py-24 px-6">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
              <span className="text-4xl">🎟️</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              No events found
            </h3>
            <p className="text-sm text-slate-400 text-center max-w-xs mb-6">
              No results found. Please try a different search term.
            </p>
          </div>
        ) : (
          results.map((event, index) => (
            <React.Fragment key={index}>
              {/* {new Date(event.eventDate) < new Date() && ( */}
              <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative h-48 w-full">
                  <div className="relative w-full h-full">
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
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    {/* Date + Time together in one pill */}
                    <div className="flex items-center gap-2 bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-md text-xs">
                      <span>
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short", // "Mar 7, 2026" instead of "March 7, 2026"
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-blue-400">|</span>
                      <span>
                        {new Date(event.eventDate).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 truncate">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FaLocationDot />
                    <span style={{ display: "flex", gap: "4px" }}>
                      <span>{event.location},</span>
                      <span>{event.city.name}</span>
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Price</p>
                      <p className="text-lg font-bold text-slate-900">
                        ${event.price}
                      </p>
                    </div>
                    <Link href={`/events/${event.title}`}>
                      <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-primary transition-all">
                        <FaArrowRight className="text-gray-400 hover:text-gray-300" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* )} */}
            </React.Fragment>
          ))
        )}
      </section>

      {/* Simple Footer */}
      <Footer />
    </div>
  );
};

export default SearchPage;
