"use client";
import Sidebar from "@/app/components/admin/Sidebar";
import Cards from "@/app/components/admin/Cards";
import City from "@/app/components/admin/City";
import EventsSales from "@/app/components/admin/EventsSales";
import Graph from "@/app/components/admin/Graph";
import ByCategory from "@/app/components/admin/ByCategory";



const Dashboard = () => {

  return (
    <div className="min-h-screen bg-[#f6f6f8]">

      {/* Sidebar */}
      <div className="w-64 shrink-0 fixed h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Revenue Analytics
            </h1>
            <p className="text-gray-500 mt-1">Global performance overview</p>
          </div>
        </div>

        {/* Top Metrics */}
        <Cards />

        <div className="grid grid-cols-3 gap-6 mb-8">
            
          {/* LEFT COLUMN - Graph */}
          <div className="col-span-2">
            <Graph />
          </div>

          {/* RIGHT COLUMN - Revenue by Category */}
          <ByCategory/>

        </div>

        {/* City Sales Distribution */}
        <City />

        {/* Event Sales */}
        <EventsSales />

      </div>
    </div>
  );
};

export default Dashboard;
