"use client";
import React, { useEffect, useState } from "react";
import { BarChart3, Calendar, Ticket, DollarSign } from "lucide-react";
import { apiResCards, EventForm, Tickets } from "@/app/types/types";

const Cards = () => {
  const [ticketData, setTicketData] = useState<Tickets[]>([]);
  const [eventData, setEventData] = useState<EventForm[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/cards");
      const data: apiResCards = await res.json();
      setTicketData(data.ticketData);
      setEventData(data.eventData);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    const load = () => {
      fetchData();
    };
    load();
  }, []);

  const totalRevenue = ticketData.reduce((acc, ticket) => acc + Number(ticket.totalPrice), 0,);

  const totalTicket = ticketData.reduce((acc, ticket) => acc + Number(ticket.quantity), 0, )

  const eventPricesValue = eventData.reduce((acc, event) => acc + Number(event.price), 0,)

  const avgTicketPrice = eventPricesValue / eventData.length || 0

  const totalActiveEvent = eventData.filter((event) => new Date(event.eventDate) > new Date() ).length



  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-sm">Total Revenue</span>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</div>
        <div className="flex items-center gap-1 mt-2"></div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-sm">Tickets Sold</span>
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Ticket className="w-4 h-4 text-purple-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">{totalTicket}</div>
        <div className="flex items-center gap-1 mt-2"></div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-sm">Avg. Order Value</span>
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-orange-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">${avgTicketPrice.toFixed(2)}</div>
        <div className="flex items-center gap-1 mt-2"></div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-sm">Events Active</span>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">{totalActiveEvent}</div>
        <div className="flex items-center gap-1 mt-2"></div>
      </div>
    </div>
  );
};

export default Cards;
