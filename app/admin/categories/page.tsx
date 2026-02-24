"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/admin/Sidebar";
import { Plus, Edit, MapPin, Trash2, Search } from "lucide-react";
import { Category } from "@/app/types/types";
import AddModal from "../../../app/components/admin/modals/manageCategories/AddModal";
import EditModal from "../../../app/components/admin/modals/manageCategories/EditModal";
import DeleteModal from "../../../app/components/admin/modals/manageCategories/DeleteModal";

export default function ManageCategories() {
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategory(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategory(data);
        setLoading(!loading);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchCategories();
  }, []);

  const updateState = (id: string, updateName: string) => {
    setCategory((prev) => 
      prev.map((category) => (category.id === id ? {...category, name: updateName} : category))
    )
  };

  const deleteEle =(id: string) => {
    setCategory((prev) => prev.filter((category) => category.id !== id))
  }

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
                    Manage Categories
                  </h1>
                  <p className="mt-1.5 text-sm text-gray-500">
                    A list of all the categories where active venues and events
                    are hosted.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-3">
                  <AddModal
                    onAddCategory={(newCategory) =>
                      setCategory((prev) => [newCategory, ...prev])
                    }
                  />
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
                          <EditModal Name={category.name} UpdateState={updateState} Id={category.id} />
                          <DeleteModal Name={category.name} onDelete={deleteEle} Id={category.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ----- EMPTY STATE ----- */}
              {category.length === 0 && loading === false && (
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
                    No categories yet
                  </h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    Get started by adding your first category. Categories help
                    you organize events by desire.
                  </p>

                  <AddModal />

                  {/* Optional: Feature list */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-[#135bec]" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Organize by Category
                      </h4>
                      <p className="text-sm text-gray-500">
                        Group events by category for better management
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
                        Help users find events in their categories
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
                        Add categories in seconds and start organizing
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
