import React from "react";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";

const topEvents = [
  {
    name: "Summer Waves Festival",
    subtitle: "Main Stadium",
    category: "Music",
    date: "Oct 24, 2023",
    tickets: 2440,
    revenue: "$185,400",
    status: "Sold Out",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    name: "City Marathon 2023",
    subtitle: "Downtown Circuit",
    category: "Sports",
    date: "Nov 02, 2023",
    tickets: 5100,
    revenue: "$122,800",
    status: "Selling Fast",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    name: "Summer Waves Festival",
    subtitle: "Main Stadium",
    category: "Music",
    date: "Oct 24, 2023",
    tickets: 2440,
    revenue: "$185,400",
    status: "Sold Out",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    name: "City Marathon 2023",
    subtitle: "Downtown Circuit",
    category: "Sports",
    date: "Nov 02, 2023",
    tickets: 5100,
    revenue: "$122,800",
    status: "Selling Fast",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    name: "Summer Waves Festival",
    subtitle: "Main Stadium",
    category: "Music",
    date: "Oct 24, 2023",
    tickets: 2440,
    revenue: "$185,400",
    status: "Sold Out",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    name: "City Marathon 2023",
    subtitle: "Downtown Circuit",
    category: "Sports",
    date: "Nov 02, 2023",
    tickets: 5100,
    revenue: "$122,800",
    status: "Selling Fast",
    statusColor: "bg-blue-100 text-blue-700",
  },
];

const EventsSales = () => {
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
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            View All
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Event Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Category
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Tickets Sold
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Gross Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {topEvents.map((event, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {event.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {event.subtitle}
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
                  {event.date}
                </td>
                <td className="py-4 px-4 text-right text-sm text-gray-900">
                  {event.tickets.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right text-sm font-medium text-gray-900">
                  {event.revenue}
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
    </div>
  );
};

export default EventsSales;
