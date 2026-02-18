import React from 'react'
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Calendar,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  Ticket,
  DollarSign,
  Activity,
} from "lucide-react";

const Cards = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Revenue</span>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">$1,240,500</div>
            <div className="flex items-center gap-1 mt-2"></div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Tickets Sold</span>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">145,203</div>
            <div className="flex items-center gap-1 mt-2"></div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Avg. Order Value</span>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">$85.00</div>
            <div className="flex items-center gap-1 mt-2"></div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Events Active</span>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">42</div>
            <div className="flex items-center gap-1 mt-2"></div>
          </div>
        </div>
  )
}

export default Cards