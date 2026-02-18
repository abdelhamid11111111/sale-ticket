import { Plus, Edit } from "lucide-react";
import React, { useState } from "react";

interface onUpdateCityProp {
  onEdit?: (id: string, newCity: string) => void;
  NameCity: string;
  IdCity: string;
}

const EditModal = ({ onEdit, NameCity, IdCity }: onUpdateCityProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [CityName, setCityName] = useState(NameCity);
  const [error, setError] = useState<string | null>(null);
  const id = IdCity;

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  const handleUpdate = async () => {
    if (!CityName) return;
    try {
      const res = await fetch(`/api/cities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CityName }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsOpen(false);
        onEdit?.(id, CityName);
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
        className="p-2 text-[#135bec] rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Edit className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#111418]">Update City</h2>
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
                <span className="text-[#111418] font-medium">City Name</span>
                <input
                  value={CityName}
                  onChange={(e) => setCityName(e.target.value)}
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
                onClick={handleUpdate}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#135bec] rounded-lg hover:bg-[#0e4ac4] shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Update City
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
