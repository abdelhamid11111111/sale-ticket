import { Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { PaginationInfo, EventsAdmin } from "../../../../types/types";

interface deleteCategoryProp {
  Title: string;
  Id: string;
  onDelete: (page: number, categoryId: string) => void;
  currentPage: number;
  selectedCategory: string;
  paginationInfo: PaginationInfo | null;
  events: EventsAdmin[];
}

const DeleteModalEvent = ({
  Title,
  Id,
  onDelete,
  currentPage,
  selectedCategory,
  paginationInfo,
  events,
}: deleteCategoryProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const id = Id;
  const EventTitle = Title;

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setIsOpen(false);
        if (
          paginationInfo &&
          paginationInfo.currentPage > 1 &&
          events.length === 1
        ) {
          onDelete(currentPage - 1, selectedCategory);
        } else {
          onDelete(currentPage, selectedCategory);
        }
      } else {
        try {
          const data = await res.json();
          setError(data.error || "Failed to delete event");
        } catch {
          setError("Failed to delete event");
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
      {/* Trigger — matches the red trash icon style in your table */}
      <button
        onClick={handleModal}
        className="p-1 text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 size={20} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">
                Delete Event
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                  {error}
                </div>
              )}
              <p className="text-sm text-gray-500 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-800">
                  {EventTitle}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={15} />
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModalEvent;
