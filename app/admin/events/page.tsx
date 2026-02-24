"use client";
import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "@/app/components/admin/Sidebar";
import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";
import { apiRes, Category, PaginationInfo } from "@/app/types/types";
import { Edit, Trash2, Calendar } from "lucide-react";
import { EventsAdmin } from "../../../app/types/types";
import { FaRegEye } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteModalEvent from "@/app/components/admin/modals/event/DeleteModelEvent";

export default function ManageEventsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<EventsAdmin[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
    null,
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchCategories();
  }, []);

  // this useEffect bring page and categoryId values into states, to back into same currentPage if we visit other route like edit or product page
  useEffect(() => {
    // extract values from url using searchParams
    const pageFromUrl = Number(searchParams.get("page") || 1);
    const categoryFromUrl = searchParams.get("categoryId") || "";

    const searchFromUrl = searchParams.get("search") || "";
    setSearch(searchFromUrl);

    // put pageFromUrl in this state, and if user load page keep same page, URL -> UI
    setCurrentPage(pageFromUrl);
    // put categoryFromUrl in this state, and if user load page keep same categoryId in url, URL -> UI
    setSelectedCategory(categoryFromUrl);

    fetchEvents(pageFromUrl, categoryFromUrl);
  }, [searchParams]);

  // fetch events
  const fetchEvents = async (page: number = 1, categoryId: string = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/events?page=${page}&categoryId=${categoryId}&search=${search}`,
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

  // to validate page number after click next or prev
  const goToPage = (page: number) => {
    if (page >= 1 && paginationInfo && paginationInfo.totalPage >= page) {
      // so this keep full url values, page and categoryId, cuz searchParams.toString() take copy of url.
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));

      router.push(`/admin/events?${params.toString()}`);
    }
  };

  // generate pagination section
  const generatePages = () => {
    if (!paginationInfo) return [];
    const { currentPage, totalPage } = paginationInfo;
    const generateItems: (string | number)[] = [];

    // if we hv less then 7 pages, fetch them all
    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        generateItems.push(i);
      }
    } else {
      // fix always first page
      generateItems.push(1);

      if (currentPage <= 3) {
        // near start
        generateItems.push(2, 3, 4, "...", totalPage);
      } else if (currentPage > totalPage - 2) {
        // near end
        generateItems.push(
          "...",
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage,
        );
      } else {
        // middle pages
        generateItems.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPage,
        );
      }
    }
    return generateItems;
  };

  return (
    <div className="flex h-screen bg-[#f6f6f8] text-slate-800">
      <div className=" shrink-0 fixed h-screen">
        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden pl-64">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Manage Events</h1>
                <p className="text-sm text-slate-500">
                  View, edit, and create new events for your platform.
                </p>
              </div>

              <div className="flex gap-3">
                <Link href="/admin/events/create">
                  <button className="flex items-center gap-2 cursor-pointer bg-[#135bec] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0e4bce] shadow-md">
                    <IoAddOutline className="text-xl" />
                    Create New Event
                  </button>
                </Link>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <input
                placeholder="Search events by title, artist..."
                value={search}
                className="md:col-span-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-[#135bec]"
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);

                  // copy current URL params
                  const params = new URLSearchParams(searchParams.toString());

                  if (value) {
                    params.set("search", value);
                  } else {
                    params.delete("search");
                  }

                  // reset to first page when search changes
                  params.set("page", "1");

                  // push new URL with updated params
                  router.push(`/admin/events?${params.toString()}`);
                }}
              />

              <select
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                value={selectedCategory}
                onChange={(e) => {
                  const value = e.target.value;

                  // so this not keep url values that does not change.
                  const params = new URLSearchParams();

                  if (value) {
                    params.set("categoryId", value);
                  }

                  // and it will keep page value cuz it mentioned.
                  params.set("page", "1");

                  params.set("search", search);

                  // so if user click categoryId it drive url to add categoryId and first page, UI -> URL
                  router.push(`/admin/events?${params.toString()}`);
                }}
              >
                <option value="">All Categories</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 text-left">Event Details</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Date & Time</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                {/* <tbody className="divide-y divide-slate-200"> */}
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    // Loading skeleton — matches your real rows exactly
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={`skeleton-${index}`} className="animate-pulse">
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-4">
                            <span className="w-14 h-14 rounded-lg bg-slate-200" />
                            <span className="flex flex-col gap-2">
                              <span className="h-3.5 w-36 rounded-md bg-slate-200" />
                              <span className="h-2.5 w-24 rounded-md bg-slate-200" />
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="h-3.5 w-16 rounded-md bg-slate-200" />
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex flex-col gap-2">
                            <span className="h-3.5 w-28 rounded-md bg-slate-200" />
                            <span className="h-2.5 w-16 rounded-md bg-slate-200" />
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="h-3.5 w-10 rounded-md bg-slate-200" />
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center justify-end gap-2">
                            <span className="w-5 h-5 rounded bg-slate-200" />
                            <span className="w-5 h-5 rounded bg-slate-200" />
                            <span className="w-5 h-5 rounded bg-slate-200" />
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      {events &&
                        events.map((event) => (
                          <tr key={event.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  className="w-14 h-14 rounded-lg object-cover"
                                />
                                <div>
                                  <div className="font-medium">
                                    {event.title}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {event.location}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              {event.category?.name}
                            </td>

                            <td className="px-6 py-4">
                              <div>
                                {new Date(event.eventDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </div>
                              <div className="text-xs text-slate-500">
                                {new Date(event.eventDate).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </div>
                            </td>

                            <td className="px-6 py-4">${event.price}</td>

                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center  justify-end gap-2">
                                <Link href={`/events/${event.title}`}>
                                  <button className="hover:text-blue-300">
                                    <FaRegEye size={20} />
                                  </button>
                                </Link>
                                <Link href={`/admin/events/${event.id}`}>
                                  <button className="p-1 text-[#135bec]">
                                    <Edit size={20} className="text-xs" />
                                  </button>
                                </Link>
                                <DeleteModalEvent
                                  Title={event.title}
                                  Id={event.id}
                                  onDelete={fetchEvents}
                                  currentPage={currentPage}
                                  selectedCategory={selectedCategory}
                                  paginationInfo={paginationInfo}
                                  events={events}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}

                      {events.length < 5 &&
                        events.length >= 1 &&
                        Array.from({ length: 5 - events.length }).map(
                          (_, index) => (
                            <tr key={`empty-${index}`} className="border-none">
                              <td
                                colSpan={5}
                                className="h-[86px] border-none p-0"
                              />
                            </tr>
                          ),
                        )}
                    </>
                  )}
                </tbody>
                {/* </tbody> */}
              </table>
              {events.length === 0 && !loading && (
                <span className="flex flex-col items-center justify-center py-20 px-6">
                  <span className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-slate-400" />
                  </span>
                  <h3 className="text-base font-semibold text-slate-800 mb-1">
                    No events found
                  </h3>
                  <p className="text-sm text-slate-400 text-center mb-6">
                    {selectedCategory
                      ? "No events match the selected category."
                      : "You haven't created any events yet."}
                  </p>
                  <Link href="/admin/events/create">
                    <button className="flex items-center gap-2 bg-[#135bec] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0e4bce] transition-colors">
                      <IoAddOutline className="text-lg" />
                      Create your first event
                    </button>
                  </Link>
                </span>
              )}
              {/* Pagination */}
              {paginationInfo && paginationInfo.totalPage > 1 && (
                <div className="flex justify-between items-center px-6 py-4 border-t border-slate-200 text-sm">
                  <p className="text-slate-500">
                    Showing{" "}
                    <span className="font-medium text-slate-900">
                      {paginationInfo.offset + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-slate-900">
                      {paginationInfo.offset + 5 > paginationInfo.totalItems
                        ? paginationInfo.totalItems
                        : paginationInfo.offset + 5}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-slate-900">
                      {paginationInfo.totalItems}
                    </span>{" "}
                    results
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={!paginationInfo.hasPrevPage}
                      className={`px-3 py-1.5 border border-slate-200 rounded-lg ${
                        paginationInfo.hasPrevPage ? "" : "text-slate-500"
                      } `}
                    >
                      Previous
                    </button>

                    {generatePages()?.map((numPage, index) => (
                      <React.Fragment key={index}>
                        {numPage === "..." ? (
                          <span className="px-3 py-2  text-sm">•••</span>
                        ) : (
                          <button
                            onClick={() => goToPage(numPage as number)}
                            className={`px-3 py-1.5 rounded-lg transition-colors ${
                              currentPage === numPage
                                ? "bg-[#135bec] text-white"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {numPage}
                          </button>
                        )}
                      </React.Fragment>
                    ))}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={!paginationInfo.hasNextPage}
                      className={`px-3 py-1.5 border border-slate-200 rounded-lg ${
                        paginationInfo.hasNextPage ? "" : "text-slate-500"
                      } `}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
