"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/admin/Sidebar";
import { Search, MapPin, Plus } from "lucide-react";
import AddModal from "../../../app/components/admin/modals/manageCities/AddModal";
import { City } from "../../types/types";
import DeleteModal from "../../../app/components/admin/modals/manageCities/DeleteModal";
import EditModal from "../../../app/components/admin/modals/manageCities/EditModal";

export default function ManageCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/admin/cities");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleDeleteCity = async (id: string) => {
    setCities((prev) => prev.filter((city) => city.id !== id));
  };

  const handleEdit = async (id: string, newCity: string) => {
    setCities((prev) =>
      prev.map((city) => (city.id === id ? { ...city, name: newCity } : city)),
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      <div className="flex h-screen overflow-hidden">
        {/* ---------- SIDEBAR ---------- */}
        <Sidebar />

        {/* ---------- MAIN CONTENT ---------- */}
        <main className="flex flex-1 flex-col overflow-hidden pl-64">
          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* ----- PAGE HEADER ----- */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Manage Cities
                  </h1>
                  <p className="mt-1.5 text-sm text-gray-500">
                    A list of all the cities where active venues and events are
                    hosted.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-3">
                  <AddModal
                    onAddCity={(newCity) =>
                      setCities((prev) => [newCity, ...prev])
                    }
                  />
                </div>
              </div>

              {/* ----- SEARCH BAR ----- */}
              {cities.length > 0 && (
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cities..."
                    className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-none"
                  />
                </div>
              )}

              {/* ----- CITIES GRID - CARDS ----- */}
              {loading && (
                <>
                  {/* ----- LOADING SKELETON ----- */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                      >
                        <div className="p-5 animate-pulse">
                          <div className="flex items-start justify-between">
                            {/* City Name Skeleton */}
                            <div className="flex-1 space-y-3">
                              <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>
                              {/* <div className="h-4 w-1/2 bg-gray-100 rounded-md"></div> */}
                            </div>

                            {/* Action Buttons Skeleton */}
                            <div className="flex items-center gap-2 ml-4">
                              <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
                              <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {cities.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cities.map((city) => (
                    <div
                      key={city.id}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                    >
                      <div className="p-5">
                        {/* City Name and Actions */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {city.name}
                            </h3>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1">
                            <EditModal onEdit={handleEdit} IdCity={city.id} NameCity={city.name} />
                            <DeleteModal
                              onDelete={handleDeleteCity}
                              NameCity={city.name}
                              IdCity={city.id}
                              key={city.id}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {cities.length === 0 && loading === false && (
                /* ----- EMPTY STATE ----- */
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="relative mb-6">
                    {/* Decorative circles */}
                    <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-purple-100 rounded-full opacity-20 animate-pulse delay-75"></div>

                    {/* Icon container */}
                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center shadow-sm">
                      <MapPin
                        className="w-12 h-12 text-[#135bec]"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No cities yet
                  </h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    Get started by adding your first city. Cities help you
                    organize events by location.
                  </p>

                  <AddModal
                    onAddCity={(newCity) =>
                      setCities((prev) => [newCity, ...prev])
                    }
                  />

                  {/* Optional: Feature list */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-[#135bec]" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Organize by Location
                      </h4>
                      <p className="text-sm text-gray-500">
                        Group events by city for better management
                      </p>
                    </div>

                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Search className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Easy Discovery
                      </h4>
                      <p className="text-sm text-gray-500">
                        Help users find events in their area
                      </p>
                    </div>

                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Plus className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Quick Setup
                      </h4>
                      <p className="text-sm text-gray-500">
                        Add cities in seconds and start organizing
                      </p>
                    </div>
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
