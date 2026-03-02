"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { apiResTopEvents, TopEvent, PaginationInfo } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";

const EventsSales = () => {
  const [events, setEvents] = useState<TopEvent[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEvents = async (page: number = 1, search: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/eventsales?page=${page}&search=${search}`,
      );
      const data: apiResTopEvents = await res.json();
      setEvents(data.data);
      setPaginationInfo(data.Pagination);
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const pageFromURL = Number(searchParams.get("page") || "1");
    const searchFromURL = searchParams.get("search") || "";

    const load = () => {
      setCurrentPage(pageFromURL);
      setSearch(searchFromURL);
      fetchEvents(pageFromURL, searchFromURL);
    };
    load();
  }, [searchParams]);

  const goToPage = (page: number) => {
    if (page >= 1 && paginationInfo && paginationInfo.totalPage >= page) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", page.toString());
      router.push(`/admin/dashboard?${params.toString()}`, { scroll: false });
    }
  };

  const generateArray = () => {
    if (!paginationInfo) return;
    const { currentPage, totalPage } = paginationInfo;
    const arrayPagination: (string | number)[] = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        arrayPagination.push(i);
      }
    } else {
      arrayPagination.push(1);
      if (currentPage <= 3) {
        arrayPagination.push(2, 3, 4, "...", totalPage);
      } else if (currentPage > totalPage - 2) {
        arrayPagination.push("...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        arrayPagination.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPage,
        );
      }
    }
    return arrayPagination;
  };

  return (
    <div>
      <div className="flex justify-between mt-16 items-center mb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Sales</h1>
        </div>
      </div>

      {/* Top Performing Events */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Top Performing Events
          </h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <CiSearch />
            </div>
            <input
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                const params = new URLSearchParams(searchParams.toString());
                if (value) {
                  params.set("search", value);
                } else {
                  params.delete("search");
                }
                params.set("page", "1");
                router.push(`/admin/dashboard?${params.toString()}`, {
                  scroll: false,
                });
              }}
              type="text"
              placeholder="Search events..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-[35%]">
                Event Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-[15%]">
                Category
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-[20%]">
                Date
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-[15%]">
                Tickets Sold
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-[15%]">
                Gross Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100 animate-pulse">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200" />
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-gray-200 rounded-full" />
                        <div className="h-2 w-20 bg-gray-200 rounded-full" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-3 w-24 bg-gray-200 rounded-full" />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="h-3 w-10 bg-gray-200 rounded-full ml-auto" />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="h-3 w-14 bg-gray-200 rounded-full ml-auto" />
                  </td>
                </tr>
              ))
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-[130px] gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      No events found
                    </p>
                    <p className="text-xs text-gray-400">
                      Try adjusting your search
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {events.map((event, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <div className="font-medium text-gray-900">
                            {event.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.location}, &nbsp;{event.city}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                        • {event.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-gray-900">
                      {event.ticketsSold}
                    </td>
                    <td className="py-4 px-4 text-right text-sm font-medium text-gray-900">
                      ${event.revenue}
                    </td>
                  </tr>
                ))}
                {Array.from({ length: Math.max(0, 6 - events.length) }).map(
                  (_, i) => (
                    <tr key={`empty-${i}`} className=" border-gray-100">
                      <td colSpan={5} className="h-[77px]" />
                    </tr>
                  ),
                )}
              </>
            )}
          </tbody>
        </table>

        {paginationInfo && paginationInfo.totalPage > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Showing {paginationInfo.offset + 1} to{" "}
              {paginationInfo.offset + events.length} of{" "}
              {paginationInfo.totalItems} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={!paginationInfo.hasPrevPage}
                className={`p-2 border  border-gray-200
            ${!paginationInfo.hasPrevPage ? "" : "hover:bg-gray-200"}
            rounded-lg text-sm text-gray-600`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {generateArray()?.map((pageNum, index) => (
                <React.Fragment key={index}>
                  {pageNum === "..." ? (
                    <span className="px-2 text-slate-400">•••</span>
                  ) : (
                    <button
                      onClick={() => goToPage(pageNum as number)}
                      className={`p-2 px-4 border border-gray-200 rounded-lg 
                        ${currentPage === pageNum ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-600"}
                        text-sm  `}
                    >
                      {pageNum}
                    </button>
                  )}
                </React.Fragment>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={!paginationInfo.hasNextPage}
                className={`p-2 border border-gray-200
            ${!paginationInfo.hasNextPage ? "" : "hover:bg-gray-200"}
            rounded-lg text-sm text-gray-600`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsSales;
