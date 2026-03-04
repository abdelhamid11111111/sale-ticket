"use client";
import React, { useEffect, useState } from "react";
import CityRanking from "./CityRanking";
import { apiResTopCities, CityPercentage, TopCity } from "@/app/types/types";

const City = () => {
  const [cities, setCities] = useState<CityPercentage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/cityData");
      const data: apiResTopCities = await res.json();
      setCities(data.revenueEach);
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const load = () => {
      fetchData();
    };
    load();
  }, []);

  const percentage = cities[0]
    ? (cities[0].revenue / cities[0].totalRevenue) * 100
    : 0;

  return (
    <div>
      <div className="flex justify-between mt-16 items-center mb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            City Sales Distribution
          </h1>
        </div>
      </div>

      {/* City Rankings and Visual Breakdown */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* City Rankings */}
        <CityRanking />

        {/* Visual Breakdown */}
        {/* Visual Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Visual Breakdown
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-4 p-2 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gray-200 animate-pulse"
                      style={{ width: `${80 - i * 12}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) :  cities.length === 0 || percentage === 0  ? (
            <div className="flex flex-col my-13 items-center justify-center py-10 text-center">
              <div className="w-12 h-12 my-20 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                No city data yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Sales data will appear here once available
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cities.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.name}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {item.totalRevenue > 0 ? ((item.revenue / item.totalRevenue) * 100).toFixed(1) : '0.0'}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${item.totalRevenue > 0 ? ((item.revenue / item.totalRevenue) * 100).toFixed(1) : '0.0'}%`,
                        backgroundColor: "#3B82F6",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">
              Demographic Insight
            </h3>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg shrink-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              {isLoading ? (
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : cities.length === 0 || percentage === 0  ? (
                <p className="text-sm text-gray-400 italic">
                  No insight available — check back once sales data is recorded.
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {cities[0]?.name}
                  </span>{" "}
                  accounts for nearly {percentage > 0 ? percentage.toFixed(1) : '0.0'}% of all ticket
                  sales of all time. Consider targeted campaigns in this region.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
