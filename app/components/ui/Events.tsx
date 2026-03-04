"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { EventForm, Category, PaginationInfo, apiRes } from "../../types/types";
import { useRouter, useSearchParams } from "next/navigation";

const Events = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<EventForm[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
    null,
  );
  const router = useRouter();
  const searchParams = useSearchParams();

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
    router.push(`/events?${params.toString()}`);
  };

  const fetchEvents = async (page: number = 1, categoryId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/usrUI/events?page=${page}&categoryId=${categoryId}`,
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
    const pageFromUrl = Number(searchParams.get("page") || "1");
    const categoryIdFromUrl = searchParams.get("categoryId") || "";
    const load = async () => {
      setCurrentPage(pageFromUrl);
      setSelectedCategory(categoryIdFromUrl);
      fetchEvents(pageFromUrl, categoryIdFromUrl);
    };
    load();
  }, [searchParams]);

  const goToPage = (page: number) => {
    if (page >= 1 && paginationInfo && paginationInfo.totalPage >= page) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`/events?${params.toString()}`, { scroll: false });
    }
  };

  const generatePagination = () => {
    if (!paginationInfo) return;
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
      {/* Navbar */}
      <Navbar query="" />
      {/* Filter Bar */}
      <div className="flex items-center justify-between pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Left side */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Explore All Events
          </h2>
          <div className="mt-2 h-1 w-16 bg-primary rounded-full"></div>
        </div>
      </div>

      {/* Categories - Horizontal Scroll */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-6">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 w-max">
            {categories.map((cat) => (
              <button
                onClick={() => handleFilter(cat.id)}
                key={cat.id}
                className={`px-4 py-2 bg-slate-100 rounded-full text-sm font-medium hover:bg-primary
            transition-colors whitespace-nowrap shrink-0
            ${
              selectedCategory === cat.id
                ? "bg-slate-100 text-slate-800"
                : "text-neutral-200 bg-slate-800 hover:dark:bg-slate-700 "
            }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Event Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-4">
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
          <div className="col-span-2 sm:col-span-5 lg:col-span-5 flex flex-col items-center justify-center py-24 px-6">
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
              {/* Removed max-w-xs mx-auto — let the card fill its grid cell */}
              <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 w-full">
                <div className="relative w-full aspect-square">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={600}
                    height={100}
                    className="object-cover bg-gray-500 w-full h-full"
                  />
                  {new Date(event.eventDate) < new Date() && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white text-xl font-bold tracking-widest">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3 space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-md text-xs flex items-center gap-1.5">
                      <span>
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
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
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <FaLocationDot className="flex-shrink-0" />
                    <span className="truncate">
                      {event.location}, {event.city.name}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                        Price
                      </p>
                      <p className="text-base font-bold text-slate-900">
                        ${event.price}
                      </p>
                    </div>
                    <Link href={`/events/${event.title}`}>
                      <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-primary transition-all">
                        <FaArrowRight className="text-gray-400 hover:text-gray-300 text-sm" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))
        )}
      </section>

      {/* Pagination */}
      {paginationInfo && paginationInfo.totalPage > 1 && (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-12 mb-16 flex justify-center">
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={!paginationInfo.hasPrevPage}
              className={`w-10 h-10 flex items-center justify-center rounded-full
               bg-slate-100  ${!paginationInfo.hasPrevPage ? "" : "hover:bg-slate-200 transition"}`}
            >
              <FaArrowLeft className="text-slate-600 text-sm" />
            </button>

            {/* Page Numbers */}
            {generatePagination()?.map((numPage, index) => (
              <React.Fragment key={index}>
                {numPage === "..." ? (
                  <span className="px-2 text-slate-400">•••</span>
                ) : (
                  <button
                    onClick={() => goToPage(numPage as number)}
                    className={`w-10 h-10 rounded-full font-semibold transition ${
                      currentPage === numPage
                        ? "bg-gray-800 text-white"
                        : "bg-slate-100 text-gray-800 hover:bg-slate-200"
                    }`}
                  >
                    {numPage}
                  </button>
                )}
              </React.Fragment>
            ))}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={!paginationInfo.hasNextPage}
              className={`w-10 h-10 flex items-center justify-center rounded-full
               bg-slate-100  ${!paginationInfo.hasNextPage ? "" : "hover:bg-slate-200 transition"}`}
            >
              <FaArrowRight className="text-slate-600 text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Events;
