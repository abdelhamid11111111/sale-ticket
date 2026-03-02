"use client";
import { SortedCategory } from "@/app/types/types";
import React, { useEffect, useState } from "react";

const ByCategory = () => {
  const [categories, setCategories] = useState<SortedCategory[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/categoryData");
      const data = await res.json();
      setCategories(data.sortedRevenueByCategory);
      setTotalRevenue(data.totalRevenue);
    } catch (error) {
      console.error("Error ", error);
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
      <div className="bg-white p-6 rounded-xl border border-gray-200 h-full">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Revenue by Category
        </h2>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-900">{((category.revenue / totalRevenue) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${((category.revenue / totalRevenue) * 100)}%`,
                    backgroundColor: "#3B82F6",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ByCategory;
