import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Category } from "../../../types/types";


interface AddCategoryProp {
    onAddCategory?: (newCategory: Category) => void; 
}


const AddModal = ({onAddCategory}:AddCategoryProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [CategoryName, setCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
    setCategoryName("");
  };

  const handleReq = async () => {
    if (!CategoryName) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CategoryName }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsOpen(false);
        setCategoryName("");
        onAddCategory?.(data)
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Request error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleModal}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#135bec] rounded-lg hover:bg-[#0e4ac4] shadow-sm transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Category
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#111418]">Add Categories</h2>
            </div>

            {/* Error message */}
            {error && (
              <div className="col-span-2 mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-300">
                {error}
              </div>
            )}

            {/* Body */}
            <div className="grid gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-[#111418] font-medium">Category Name</span>
                <input
                  value={CategoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  type="text"
                  placeholder="Enter city name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-base text-[#111418] focus:border-blue-500 focus:outline-none focus:ring-0"
                />
              </label>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeModal}
                className="text-[#617589] bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReq}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#135bec] rounded-lg hover:bg-[#0e4ac4] shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddModal;
