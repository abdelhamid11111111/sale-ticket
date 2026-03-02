"use client";
import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationInfo, TopCity, apiResTopCities } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";

function CityRanking() {
  const [city, setCity] = useState<TopCity[]>([]);
  const [search, setSearch] = useState("");
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchCitiesData = async (page: number = 1, search: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("cityrankingpage", page.toString());
      params.set("cityrankingsearch", search);

      const res = await fetch(`/api/admin/cityData?${params}`);
      const data: apiResTopCities = await res.json();
      setCity(data.data);
      setPaginationInfo(data.Pagination);
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("cityrankingpage") || "1");
    const searchFromUrl = searchParams.get("cityrankingsearch") || "";

    const load = () => {
      setCurrentPage(pageFromUrl);
      setSearch(searchFromUrl);

      fetchCitiesData(pageFromUrl, searchFromUrl);
    };
    load();
  }, [searchParams]);

  const goToPage = (page: number) => {
    if (page >= 1 && paginationInfo && paginationInfo.totalPage >= page) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("cityrankingpage", page.toString());
      router.push(`/admin/dashboard/?${params}`, { scroll: false });
    }
  };

  const generateArray = () => {
    if (!paginationInfo) return;
    const { currentPage, totalPage } = paginationInfo;
    const generatePagination: (string | number)[] = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        generatePagination.push(i);
      }
    } else {
      generatePagination.push(1);
      if (currentPage <= 3) {
        generatePagination.push(2, 3, 4, "...", totalPage);
      } else if (currentPage > totalPage - 2) {
        generatePagination.push("...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        generatePagination.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPage,
        );
      }
    }
    return generatePagination;
  };

  return (
    <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">City Rankings</h2>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              const params = new URLSearchParams(searchParams.toString());
              params.set("cityrankingpage", "1");
              if (value) {
                params.set("cityrankingsearch", value);
              } else {
                params.delete("cityrankingsearch");
              }
              router.push(`/admin/dashboard?${params.toString()}`, {
                scroll: false,
              });
            }}
            placeholder="Search city..."
            className="pl-10 pr-4 py-2 border text-black border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="min-h-[360px]">
       <table className="w-full table-fixed">
  <thead>
    <tr className="border-b border-gray-200">
      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-16">
        Rank
      </th>
      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
        City Name
      </th>
      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-32">
        Tickets Sold
      </th>
      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-36">
        Gross Revenue
      </th>
    </tr>
  </thead>
  <tbody>
    {loading
      ? Array.from({ length: 6 }).map((_, index) => (
          <tr key={index} className="border-b border-gray-100">
            <td className="py-5 px-4">
              <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />
            </td>
            <td className="py-5 px-4">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </td>
            <td className="py-5 px-4">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse ml-auto" />
            </td>
            <td className="py-5 px-4">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse ml-auto" />
            </td>
          </tr>
        ))
      : city.map((city, index) => (
          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-4 px-4 text-sm text-gray-600">#{city.ranking}</td>
            <td className="py-4 px-4">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">{city.city}</span>
              </div>
            </td>
            <td className="py-4 px-4 text-right text-sm text-gray-900">
              {city.ticketsSold}
            </td>
            <td className="py-4 px-4 text-right">
              <span className="text-sm text-gray-900">${city.revenue}</span>
            </td>
          </tr>
        ))}

    {/* Filler rows */}
    {!loading &&
      city.length < 6 &&
      Array.from({ length: 6 - city.length }).map((_, i) => (
        <tr key={`empty-${i}`} className="border-b border-gray-100">
          <td className="py-4 px-4">&nbsp;</td>
          <td className="py-4 px-4">
            <span className="invisible">placeholder</span>
          </td>
          <td className="py-4 px-4">&nbsp;</td>
          <td className="py-4 px-4">&nbsp;</td>
        </tr>
      ))}
  </tbody>
</table>
      </div>
      {paginationInfo && paginationInfo.totalPage > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Showing {paginationInfo.offset + 1} to{" "}
            {paginationInfo.offset + city.length} of {paginationInfo.totalItems}{" "}
            entries
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              className={`p-2 border border-gray-200 rounded-lg text-sm
            ${!paginationInfo.hasPrevPage ? "" : "hover:bg-gray-200"}
           text-gray-600 `}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {generateArray()?.map((numPage, index) => (
              <React.Fragment key={index}>
                {numPage === "..." ? (
                  <span className="px-2 text-slate-400">•••</span>
                ) : (
                  <button
                    onClick={() => goToPage(numPage as number)}
                    className={`p-2 px-4  border border-gray-200 
              ${currentPage === numPage ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"}
             rounded-lg text-sm `}
                  >
                    {numPage}
                  </button>
                )}
              </React.Fragment>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={!paginationInfo.hasNextPage}
              className={`p-2 border border-gray-200
            ${!paginationInfo.hasNextPage ? "" : "hover:bg-gray-200"}
            rounded-lg text-sm text-gray-600 `}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CityRanking;
