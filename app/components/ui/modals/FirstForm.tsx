"use client";
import React from "react";
import { MdMailOutline, MdPersonOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import CartEventItem from "./CartEventItem";

interface Props {
  price: string;
  title: string;
  image?: string;
  form: { username: string; email: string; phone: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ username: string; email: string; phone: string }>
  >;
  eventDate: string;
}

const FirstForm = ({
  price,
  title,
  image,
  eventDate,
  form,
  setForm,
}: Props) => {
  return (
    <div>
      {/* Content */}
      <div className="px-4 sm:px-8 pb-4 sm:pb-8 pt-2">
        <div className="mb-4 sm:mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>
            Who is going?
          </h2>
          <p className="text-sm" style={{ color: "#64748b" }}>
            We will send your tickets directly to the email provided below.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-5">
          {" "}
          {/* Full Name */}
          <div>
            <label
              className="block text-sm font-semibold mb-2 pl-1"
              style={{ color: "#334155" }}
              htmlFor="fullname"
            >
              Full Name
            </label>
            <div className="relative">
              <div
                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                style={{ color: "#94a3b8" }}
              >
                <MdPersonOutline size={20} />
              </div>
              <input
                className="w-full pl-11 pr-4 py-2.5 sm:py-3.5 rounded-full outline-none transition-all"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  color: "#0f172a",
                }}
                id="fullname"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="e.g. Jane Doe"
                type="text"
              />
            </div>
          </div>
          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                className="block text-sm font-semibold mb-2 pl-1"
                style={{ color: "#334155" }}
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  style={{ color: "#94a3b8" }}
                >
                  <MdMailOutline size={20} />
                </div>
                <input
                  className="w-full pl-11 pr-4 py-3.5 rounded-full outline-none transition-all"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
                  }}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  id="email"
                  placeholder="jane@example.com"
                  type="email"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2 pl-1"
                style={{ color: "#334155" }}
                htmlFor="phone"
              >
                Phone Number
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  style={{ color: "#94a3b8" }}
                >
                  <FaPhone size={16} />
                </div>
                <input
                  className="w-full pl-11 pr-4 py-3.5 rounded-full outline-none transition-all"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
                  }}
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(555) 000-0000"
                  type="tel"
                />
              </div>
            </div>
          </div>
          {/* Event Summary */}
          <CartEventItem
            price={price}
            eventDate={eventDate}
            title={title}
            image={image}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstForm;
