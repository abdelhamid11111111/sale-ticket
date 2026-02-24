import { Trash2 } from "lucide-react";
import React, { useState } from "react";

interface deleteCategoryProp {
  Name: string;
  Id: string;
  onDelete: (id: string) => Promise<void> | void;
}

const DeleteModal = ({ Name, Id, onDelete }: deleteCategoryProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const id = Id;
  const CategoryName = Name;

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete?.(id);
        setIsOpen(false);
      } else {
        try {
          const data = await res.json();
          setError(data.error || "Failed to delete Category");
        } catch {
          setError("Failed to delete Category");
        }
      }
    } catch (error) {
      console.error("Request error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    }
  };

  return (
    <div>
      <button
        onClick={handleModal}
        className="p-2 text-red-600 text-xl rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Trash2 className="text-xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#111418]">Delete Category</h2>
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
                are you sure you want to delete this category ?{" "}
                <span className="font-semibold">{CategoryName}</span>
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
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
