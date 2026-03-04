"use client";
import React from "react";
import Sidebar from "@/app/components/admin/Sidebar";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { PaginationInfo, Tickets, apiResTicket } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function SoldTicketsLog() {
  const [tickets, setTicket] = useState<Tickets[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchTickets = async (page: number = 1, search: string, from: string, to: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?page=${page}&search=${search}&from=${from}&to=${to}`);
      const data: apiResTicket = await res.json();
      setTicket(data.data);
      setPaginationInfo(data.Pagination);
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page") || 1);
    const searchFromUrl = searchParams.get("search") || "";
    const fromFromUrl = searchParams.get("from") || "";
    const toFromUrl = searchParams.get("to") || "";

    setCurrentPage(pageFromUrl);
    setSearch(searchFromUrl);
    setFrom(fromFromUrl);
    setTo(toFromUrl);

    const load = () => {
      fetchTickets(pageFromUrl, searchFromUrl, fromFromUrl, toFromUrl);
    };
    load();
  }, [searchParams]);

  const goToPage = (page: number) => {
    if (page >= 1 && paginationInfo && paginationInfo.totalPage >= page) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`/admin/orders?${params.toString()}`);
    }
  };

  const generatePages = () => {
    if (!paginationInfo) return;
    const { currentPage, totalPage } = paginationInfo;
    const arrayPages: (string | number)[] = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        arrayPages.push(i);
      }
    } else {
      arrayPages.push(1);
      if (currentPage <= 3) {
        arrayPages.push(2, 3, 4, "...", totalPage);
      } else if (currentPage > totalPage - 2) {
        arrayPages.push("...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        arrayPages.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage);
      }
    }

    return arrayPages;
  };

  return (
    <div className="font-display bg-background-light text-slate-800 antialiased bg-[#f6f6f8] min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-480 mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Sold Tickets Log</h1>
              <p className="text-sm text-slate-500 mt-1">
                Review and manage all ticket transactions across events.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="col-span-1 md:col-span-5 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <CiSearch />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none sm:text-sm"
                  placeholder="Search by buyer name..."
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
                    router.push(`/admin/orders?${params.toString()}`);
                  }}
                  type="text"
                />
              </div>
              <div className="col-span-1 md:col-span-4 flex items-center gap-2">
                <div className="flex flex-col w-full">
                  <span className="text-xs text-slate-400 mb-1 pl-1">From</span>
                  <input
                    className="block w-full pl-3 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 sm:text-sm"
                    type="date"
                    value={from}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFrom(value);
                      const params = new URLSearchParams(searchParams.toString());
                      if (value) {
                        params.set("from", value);
                      } else {
                        params.delete("from");
                      }
                      params.set("page", "1");
                      router.push(`/admin/orders?${params.toString()}`);
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-xs text-slate-400 mb-1 pl-1">To</span>
                  <input
                    className="block w-full pl-3 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 sm:text-sm"
                    type="date"
                    value={to}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTo(value);
                      const params = new URLSearchParams(searchParams.toString());
                      if (value) {
                        params.set("to", value);
                      } else {
                        params.delete("to");
                      }
                      params.set("page", "1");
                      router.push(`/admin/orders?${params.toString()}`);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-162.5">
            <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="sticky top-0 px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider bg-white w-[28%]">
                      Event
                    </th>
                    <th className="sticky top-0 px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider bg-white w-[15%]">
                      Buyer
                    </th>
                    <th className="sticky top-0 px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider bg-white w-[22%]">
                      Contact
                    </th>
                    <th className="sticky top-0 px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider bg-white w-[12%]">
                      City
                    </th>
                    <th className="sticky top-0 px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider bg-white w-[8%]">
                      Qty
                    </th>
                    <th className="sticky top-0 px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider bg-white w-[15%]">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Loading */}
                  {loading &&
                    Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="border-b border-slate-50 animate-pulse">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-14 w-14 rounded-lg bg-slate-100 shrink-0" />
                            <div className="space-y-2 min-w-0 flex-1">
                              <div className="h-3 w-28 bg-slate-100 rounded-full" />
                              <div className="h-2 w-16 bg-slate-100 rounded-full" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-3 w-24 bg-slate-100 rounded-full" />
                        </td>
                        <td className="px-6 py-4 space-y-2">
                          <div className="h-3 w-36 bg-slate-100 rounded-full" />
                          <div className="h-2 w-24 bg-slate-100 rounded-full" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-3 w-16 bg-slate-100 rounded-full" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="h-7 w-7 rounded-lg bg-slate-100 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="h-3 w-14 bg-slate-100 rounded-full ml-auto" />
                        </td>
                      </tr>
                    ))}

                  {/* Empty */}
                  {!loading && tickets.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                            {search || from || to ? (
                              <CiSearch className="text-2xl text-slate-400" />
                            ) : (
                              <span className="text-2xl">🎟️</span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-slate-700">
                            {search || from || to ? "No results found" : "No tickets yet"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {search && !from && !to
                              ? `No tickets matched "${search}"`
                              : !search && (from || to)
                                ? "No tickets found in the selected date range"
                                : search && (from || to)
                                  ? `No tickets matched "${search}" in the selected date range`
                                  : "Tickets will appear here once orders come in"}
                          </p>
                          {(search || from || to) && (
                            <button
                              onClick={() => {
                                setSearch("");
                                setFrom("");
                                setTo("");
                                router.push(`/admin/orders?page=1`);
                              }}
                              className="mt-1 text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Data */}
                  {!loading &&
                    tickets.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                      >
                        {/* Event */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={row.event.image}
                              alt={row.event.title}
                              className="w-14 h-14 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-medium text-sm text-slate-800 truncate">
                                {row.event.title}
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                {new Date(row.event.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Buyer */}
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-800 truncate">
                            {row.buyer.name}
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700 truncate">
                            {row.buyer.email}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 truncate">
                            {row.buyer.phone}
                          </div>
                        </td>

                        {/* City */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 truncate block">
                            {row.city.name}
                          </span>
                        </td>

                        {/* Qty */}
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700">
                            {row.quantity}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <span className="text-sm font-bold text-slate-900">
                            ${row.totalPrice}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {paginationInfo && paginationInfo.totalPage > 1 && (
              <div className="border-t border-slate-100 bg-white px-6 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-400">
                    Showing{" "}
                    <span className="font-semibold text-slate-700">
                      {paginationInfo.offset + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-slate-700">
                      {tickets.length + paginationInfo.offset}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-700">
                      {paginationInfo.totalItems}
                    </span>{" "}
                    results
                  </p>

                  <nav className="inline-flex items-center gap-1">
                    <button
                      disabled={!paginationInfo?.hasPrevPage}
                      onClick={() => goToPage(currentPage - 1)}
                      className={`p-2 rounded-lg border border-slate-200 text-slate-500 
                        ${!paginationInfo?.hasPrevPage ? " " : "hover:bg-slate-200"}
                         transition-colors`}
                    >
                      <FaArrowLeftLong className="text-xs" />
                    </button>

                    {generatePages()?.map((numPage, index) => (
                      <React.Fragment key={index}>
                        <button
                          onClick={() => goToPage(numPage as number)}
                          className={`w-9 h-9 rounded-lg border border-slate-200
                       ${currentPage === numPage ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-200"}
                        text-sm transition-colors`}
                        >
                          {numPage === "..." ? (
                            <span className="w-9 h-9 inline-flex items-center justify-center text-slate-400 text-sm">
                              ...
                            </span>
                          ) : (
                            numPage
                          )}
                        </button>
                      </React.Fragment>
                    ))}

                    <button
                      disabled={!paginationInfo?.hasNextPage}
                      onClick={() => goToPage(currentPage + 1)}
                      className={`p-2 rounded-lg border border-slate-200 text-slate-500 
                        ${!paginationInfo?.hasNextPage ? "" : "hover:bg-slate-200"}
                         transition-colors`}
                    >
                      <FaArrowRight className="text-xs" />
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}