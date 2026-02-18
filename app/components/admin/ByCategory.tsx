import React from "react";

const revenueByCategory = [
  {
    name: "Music Festivals",
    percentage: 40,
    amount: "$42,020",
    color: "#3B82F6",
  },
  { name: "Sports", percentage: 30, amount: "$37,215", color: "#8B5CF6" },
  {
    name: "Theater & Arts",
    percentage: 20,
    amount: "$24,810",
    color: "#F59E0B",
  },
  { name: "Comedy", percentage: 10, amount: "$12,450", color: "#EF4444" },
];

const ByCategory = () => {
  return (
    <div className="col-span-1">
      <div className="bg-white p-6 rounded-xl border border-gray-200 h-full">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Revenue by Category
        </h2>
        <div className="space-y-2">
          {revenueByCategory.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-900">
                    {category.percentage}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${category.percentage}%`,
                    backgroundColor: category.color,
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
