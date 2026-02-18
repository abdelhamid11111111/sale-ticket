import Sidebar from "@/app/components/admin/Sidebar";
import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  Edit,
  Trash2,
} from 'lucide-react';




export default function ManageEventsPage() {
  return (
    <div className="flex h-screen bg-[#f6f6f8] text-slate-800">

      <div className=" shrink-0 fixed h-screen">
        {/* Sidebar */}
      <Sidebar/>
      </div>


      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden pl-64">
       

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Manage Events</h1>
                <p className="text-sm text-slate-500">
                  View, edit, and create new events for your platform.
                </p>
              </div>

              <div className="flex gap-3">
                <Link href='/admin/events/create'>
                <button className="flex items-center gap-2 cursor-pointer bg-[#135bec] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0e4bce] shadow-md">
                  <IoAddOutline className='text-xl'/>
                  Create New Event
                </button>
                </Link>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <input
                placeholder="Search events by title, artist..."
                className="md:col-span-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-[#135bec]"
              />

              <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <option>All Categories</option>
                <option>Concerts</option>
                <option>Workshops</option>
              </select>

            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 text-left">Event Details</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Date & Time</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">
                        Summer Vibes Festival 2024
                      </div>
                      <div className="text-xs text-slate-500">
                        Hyde Park, London
                      </div>
                    </td>
                    <td className="px-6 py-4">Music</td>
                    <td className="px-6 py-4">
                      <div>Aug 15, 2024</div>
                      <div className="text-xs text-slate-500">
                        06:00 PM
                      </div>
                    </td>
                    <td className="px-6 py-4 ">$145.00</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1 text-[#135bec]">
                          <Edit className='text-xs'/>
                        </button>
                        <button className="p-1 text-red-500">
                          <Trash2 className='text-2xl'/>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between items-center px-6 py-4 border-t border-slate-200 text-sm">
                <p className="text-slate-500">
                  Showing <span className="font-medium text-slate-900">1</span>{" "}
                  to <span className="font-medium text-slate-900">5</span> of{" "}
                  <span className="font-medium text-slate-900">42</span> results
                </p>

                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-500">
                    Previous
                  </button>
                  <button className="px-3 py-1.5 bg-[#135bec] text-white rounded-lg">
                    1
                  </button>
                  <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100">
                    2
                  </button>
                  <button className="px-3 py-1.5 border border-slate-200 rounded-lg">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
