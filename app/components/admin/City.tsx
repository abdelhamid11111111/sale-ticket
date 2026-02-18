import React from "react";
import CityRanking from "./CityRanking";


const visualBreakdown = [
  { city: "New York", percentage: 15.4, color: "#3B82F6" },
  { city: "London", percentage: 12.3, color: "#3B82F6" },
  { city: "Tokyo", percentage: 9.8, color: "#60A5FA" },
  { city: "Paris", percentage: 8.4, color: "#60A5FA" },
  { city: "Los Angeles", percentage: 7.1, color: "#93C5FD" },
  { city: "Berlin", percentage: 5.9, color: "#93C5FD" },
];

const City = () => {
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
        <CityRanking/>

        {/* Visual Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Visual Breakdown
          </h2>
          <div className="space-y-4">
            {visualBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {item.city}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.percentage * 6}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">
              Demographic Insight
            </h3>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg shrink-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">New York</span>{" "}
                accounts for nearly 20% of all ticket sales this quarter.
                Consider targeted campaigns in this region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
