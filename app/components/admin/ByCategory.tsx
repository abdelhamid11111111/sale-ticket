"use client";
import { SortedCategory } from "@/app/types/types";
import React, { useEffect, useState } from "react";

const ByCategory = () => {
  const [categories, setCategories] = useState<SortedCategory[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/categoryData");
      const data = await res.json();
      setCategories(data.sortedRevenueByCategory);
      setTotalRevenue(data.totalRevenue);
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

  return (
    <div className="col-span-1">
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Revenue by Category
          </h2>
          <p className="text-sm text-gray-500">
            Breakdown of total ticket sales distribution
          </p>
        </div>

        {isLoading ? (
          <>
            {/* Loading Categories */}
            <div className="space-y-5 h-[355px]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2 my-7 ">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-gray-200 animate-pulse"
                      style={{ width: `${75 - i * 15}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Loading Insight */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
              <div className="h-3 w-full bg-blue-100 rounded animate-pulse" />
              <div className="h-3 w-full bg-blue-100 rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-blue-100 rounded animate-pulse" />
            </div>
          </>
        ) : categories.length === 0 ? (
          <>
            {/* Empty State */}
            <div className="flex flex-col h-[390px] items-center justify-center py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
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
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                No categories yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Revenue breakdown will appear once ticket sales come in
              </p>
            </div>
            {/* Dimmed Insight Placeholder */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <p className="text-sm text-gray-400 italic">
                No insight available yet.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Categories */}
            <div className="space-y-5">
              {categories.map((category, index) => {
                const percentage = (category.revenue / totalRevenue) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full transition-all duration-700 ease-in-out"
                        style={{
                          width: `${percentage}%`,
                          background:
                            "linear-gradient(to right, #3B82F6, #60A5FA)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Insight */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">
                  {categories[0]?.name}
                </span>{" "}
                contributes nearly{" "}
                <span className="font-semibold text-blue-600">
                  {((categories[0]?.revenue / totalRevenue) * 100).toFixed(1)}%
                </span>{" "}
                of total ticket sales. Consider launching targeted campaigns to
                further capitalize on its strong performance.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ByCategory;
