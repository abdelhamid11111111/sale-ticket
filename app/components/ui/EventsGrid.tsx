"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Category, EventForm, apiRes, PaginationInfo } from "../../types/types";

const EventsGrid = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<EventForm[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
    null,
  );

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
  }, []);

  const handleFilter = async (categoryId: string) => {
    const params = new URLSearchParams();

    params.set("page", "1");

    params.set("categoryId", categoryId);

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const fetchEvents = async (page: number = 1, categoryId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/usrUI/homepage?page=${page}&categoryId=${categoryId}`,
      );
      const data: apiRes = await res.json();
      setEvents(data.data);
      setPaginationInfo(data.Pagination);
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page") || 1);
    const categoryFromUrl = searchParams.get("categoryId") || "";
    const load = async () => {
      setCurrentPage(pageFromUrl);
      setSelectedCategory(categoryFromUrl);

      fetchEvents(pageFromUrl, categoryFromUrl);
    };
    load();
  }, [searchParams]);

  const goToPage = (page: number) => {
    if (page >= 1 && paginationInfo && paginationInfo.totalPage >= page) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      router.push(`/?${params.toString()}`, { scroll: false });
    }
  };

  const generateEventsPagination = () => {
    if (!paginationInfo) return [];
    const { currentPage, totalPage } = paginationInfo;
    const generateArray: (string | number)[] = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        generateArray.push(i);
      }
    } else {
      generateArray.push(1);
      if (currentPage <= 3) {
        generateArray.push(2, 3, 4, "...", totalPage);
      } else if (currentPage > totalPage - 2) {
        generateArray.push("...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        generateArray.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPage,
        );
      }
    }
    return generateArray;
  };

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
          className="text-sm font-semibold text-primary text-blue-500 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          View all events
          <FaArrowRight />
        </Link>
      </div>

      {/* Categories - Horizontal Scroll */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-6">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 w-full">
            {categories.map((cat) => (
              <button
                onClick={() => handleFilter(cat.id)}
                key={cat.id}
                className={`px-4 py-2 bg-slate-100 rounded-full text-sm font-medium hover:bg-primary
            transition-colors whitespace-nowrap shrink-0
            ${
              selectedCategory === cat.id
                ? "bg-slate-100 text-slate-800"
                : "dark:bg-slate-800 hover:dark:bg-slate-700"
            }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Event Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        ) : events.length === 0 ? (
          <div className="col-span-2 sm:col-span-2 lg:col-span-4 flex flex-col items-center justify-center py-24 px-6">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
              <span className="text-4xl">🎟️</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              No events found
            </h3>
            <p className="text-sm text-slate-400 text-center max-w-xs mb-6">
              {selectedCategory
                ? "No events match the selected category. Try a different one."
                : "There are no upcoming events right now. Check back soon!"}
            </p>
            <button
              onClick={() => handleFilter("")}
              className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          events.map((event, index) => (
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

      {/* Pagination */}
      {paginationInfo && paginationInfo?.totalPage > 1 && (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-12 mb-16 flex justify-center">
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={paginationInfo?.hasPrevPage === false}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition disabled:opacity-40"
            >
              <FaArrowLeft className="text-slate-600 text-sm" />
            </button>

            {/* Page Numbers */}
            {generateEventsPagination()?.map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === "..." ? (
                  <span className="px-2 text-slate-400">•••</span>
                ) : (
                  <button
                    onClick={() => goToPage(pageNum as number)}
                    className={`w-10 h-10 rounded-full font-semibold transition ${
                      currentPage === pageNum
                        ? "bg-gray-800 text-white"
                        : "bg-slate-100 text-gray-800 hover:bg-slate-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={paginationInfo?.hasNextPage === false}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition disabled:opacity-40"
            >
              <FaArrowRight className="text-slate-600 text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsGrid;
