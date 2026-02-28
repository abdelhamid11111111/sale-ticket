"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  FileText,
  Tag,
  Building2,
  Save,
  X,
} from "lucide-react";
import Sidebar from "@/app/components/admin/Sidebar";
import Link from "next/link";
import { City, Category } from "@/app/types/types";
import { useParams } from "next/navigation";

const UpdateEventForm = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null as File | null,
    location: "",
    price: "",
    eventDate: "",
    categoryId: "",
    cityId: "",
  });
  const route = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/admin/cities");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/admin/events/${id}`);
        const data = await res.json();
        setForm({
          title: data.title,
          description: data.description,
          location: data.location,
          price: data.price,
          eventDate: data.eventDate?.slice(0, 16),
          image: null,
          categoryId: data.category?.id,
          cityId: data.city?.id,
        });
        if (data.image) {
          setImagePreview(data.image);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchEvent();
    fetchCategories();
    fetchCities();
  }, [id]);

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("price", form.price);
      formData.append("eventDate", form.eventDate);
      formData.append("categoryId", form.categoryId);
      formData.append("cityId", form.cityId);
      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        route.push("/admin/events");
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error: ", error);
      setError(
        error instanceof Error ? error.message : "Network error occurred",
      );
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // pick the pic file
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      // if exist put it in form object
      setForm({ ...form, image: file });

      // put pic in statePreview
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Update New Event</h1>
          <p className="text-gray-500 mt-1">
            Fill in the details to update an event
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl">
          <form className="bg-white rounded-xl border border-gray-200 p-8">
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                <span className="w-5 h-5 shrink-0 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
                  !
                </span>
                {error}
              </div>
            )}
            {/* Title */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Event Title *
              </label>
              <div className="relative">
                <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="Enter event title"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                rows={4}
                placeholder="Describe your event..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* City and Category - Two columns */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* City Select */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  City *
                </label>
                <div className="relative">
                  <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  <select
                    id="city"
                    name="city"
                    value={form.cityId}
                    onChange={(e) =>
                      setForm({ ...form, cityId: String(e.target.value) })
                    }
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Category Select */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Category *
                </label>
                <div className="relative">
                  <Tag className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  <select
                    id="category"
                    name="category"
                    value={form.categoryId}
                    onChange={(e) =>
                      setForm({ ...form, categoryId: String(e.target.value) })
                    }
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Venue Location *
              </label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  required
                  placeholder="Enter venue address"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Event Date and Price - Two columns */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Event Date */}
              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Event Date & Time *
                </label>
                <div className="relative">
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  <input
                    type="datetime-local"
                    id="eventDate"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={(e) =>
                      setForm({ ...form, eventDate: e.target.value })
                    }
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Ticket Price *
                </label>
                <div className="relative">
                  <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Event Image *
              </label>

              {!imagePreview ? (
                <div className="relative">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-72 h-72 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                        <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          or drag and drop
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 group-hover:bg-blue-100 text-gray-500 group-hover:text-blue-600 text-xs rounded-full transition-colors">
                        PNG, JPG, JPEG up to 10MB
                      </span>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="flex gap-5 items-start">
                  {/* Square Image Preview */}
                  <div className="relative w-72 h-72 shrink-0 rounded-xl overflow-hidden border-2 border-gray-200 group">
                    <img
                      src={imagePreview}
                      alt="Event preview"
                      className="w-full h-full object-cover"
                    />
                    {/* Dim overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {/* Hidden input to allow re-selection */}
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  {/* File Info & Actions — outside the image */}
                  <div className="flex flex-col justify-between h-72 py-1">
                    {/* File details */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <ImageIcon className="w-5 h-5 text-blue-500 shrink-0" />
                        <p className="text-sm font-semibold truncate max-w-[180px]">
                          {selectedFile?.name}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 text-xs text-gray-500">
                        <span>
                          <span className="font-medium text-gray-600">
                            Type:
                          </span>{" "}
                          {selectedFile?.type}
                        </span>
                        <span>
                          <span className="font-medium text-gray-600">
                            Size:
                          </span>{" "}
                          {selectedFile
                            ? (selectedFile.size / 1024).toFixed(1) + " KB"
                            : "—"}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 text-green-700 text-xs rounded-full w-fit">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        Ready to upload
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="image"
                        className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-300 transition-colors"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Change Image
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedFile(null);
                          setForm({ ...form, image: null });
                        }}
                        className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 border border-red-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleCreate}
                type="button"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                <Save className="w-5 h-5" />
                Update Event
              </button>
              <Link href="/admin/events">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  <X className="w-5 h-5" />
                  Reset
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventForm;
