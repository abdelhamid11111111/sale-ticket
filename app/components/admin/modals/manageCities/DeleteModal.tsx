import { Trash2 } from "lucide-react";
import React, { useState } from "react";

interface deleteCityProp {
  NameCity: string;
  IdCity: string;
  onDelete: (id: string) => Promise<void> | void;
}

const DeleteModal = ({ NameCity, IdCity, onDelete }: deleteCityProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const id = IdCity;
  const CityName = NameCity;

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/cities/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        onDelete?.(id);
        setIsOpen(false);
      } else {
        try {
          const data = await res.json();
          setError(data.error || "Failed to delete city");
        } catch {
          setError("Failed to delete city");
        }
      }
    } catch (error) {
      console.error("Request error:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  return (
    <div>
      <button
        onClick={handleModal}
        className="p-2 text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#111418]">Delete City</h2>
            </div>

            {/* Error message */}
            {error && (
              <div className="col-span-2 mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-300">
                {error}
              </div>
            )}

            {/* Body */}
            <div className="grid gap-4">
              <span>
                are you sure you want to delete this city ?{" "}
                <span className="font-semibold">{CityName}</span>
              </span>
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
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#ea2121] rounded-lg hover:bg-[#c40e0e] shadow-sm transition-colors"
              >
                Delete City
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
