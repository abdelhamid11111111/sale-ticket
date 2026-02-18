import React from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const cityData = [
  {
    rank: 1,
    code: "NY",
    name: "New York",
    tickets: 15408,
    contribution: 18.1,
  },
  { rank: 2, code: "LD", name: "London", tickets: 12290, contribution: 14.5 },
  { rank: 3, code: "TK", name: "Tokyo", tickets: 9855, contribution: 11.2 },
  { rank: 4, code: "PA", name: "Paris", tickets: 8420, contribution: 9.8 },
  {
    rank: 5,
    code: "LA",
    name: "Los Angeles",
    tickets: 7150,
    contribution: 8.1,
  },
  { rank: 6, code: "BE", name: "Berlin", tickets: 5980, contribution: 6.5 },
];

function CityRanking() {
  return (
    <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">City Rankings</h2>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search city..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
              Rank
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
              City Name
            </th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
              Tickets Sold
            </th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
              % Contribution
            </th>
          </tr>
        </thead>
        <tbody>
          {cityData.map((city) => (
            <tr
              key={city.rank}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-4 px-4 text-sm text-gray-600">#{city.rank}</td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">
                      {city.code}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{city.name}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-right text-sm text-gray-900">
                {city.tickets.toLocaleString()}
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-900">
                    {city.contribution}%
                  </span>
                  <div className="w-16 bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${city.contribution * 5}%` }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          Showing 1 to 6 of 24 entries
        </span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CityRanking;
