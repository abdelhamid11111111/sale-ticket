"use client";
import { useState } from "react";
import Sidebar from "@/app/components/admin/Sidebar";
import { Plus, Edit, Trash2, Search } from "lucide-react";

// ==================== TYPES ====================
interface Category {
  id: number;
  name: string;
}

// ==================== CONSTANTS ====================
const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Music Festivals",
  },
  {
    id: 2,
    name: "Sports",
  },
  {
    id: 3,
    name: "Theater & Arts",
  },
  {
    id: 4,
    name: "Comedy",
  },
  {
    id: 5,
    name: "Movies",
  },
];

export default function ManageCategories() {
  const [category] = useState<Category[]>(CATEGORIES);

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      <div className="flex h-screen overflow-hidden">
        {/* ---------- SIDEBAR ---------- */}
        <Sidebar />

        {/* ---------- MAIN CONTENT ---------- */}
        <main className="flex flex-1 flex-col overflow-hidden pl-64">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* ----- PAGE HEADER ----- */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Manage Categories
                  </h1>
                  <p className="mt-1.5 text-sm text-gray-500">
                    A list of all the categories where active venues and events
                    are hosted.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-3">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#135bec] rounded-lg hover:bg-[#0e4ac4] shadow-sm transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </button>
                </div>
              </div>

              {/* ----- SEARCH BAR ----- */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none  focus:ring-none"
                />
              </div>

              {/* ----- CITIES GRID - CARDS ----- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                  >
                    <div className="p-5">
                      {/* Category Name and Actions */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {category.name}
                          </h3>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1">
                          <button className="p-2 text-[#135bec] text-3xl rounded-lg hover:bg-gray-100 transition-colors">
                            <Edit className="text-3xl" />
                          </button>
                          <button className="p-2 text-red-600 text-xl rounded-lg hover:bg-gray-100 transition-colors">
                            <Trash2 className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ----- EMPTY STATE ----- */}
              {category.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No cities found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
