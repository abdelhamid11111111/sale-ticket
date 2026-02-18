"use client";
import React, { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdCalendar } from "react-icons/io";
import { FaCity } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BsTicketPerforatedFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [selected, setSelected] = useState();

  const routes = [
    {
      name: "dashboard",
      icon: BiSolidDashboard,
      route: "dashboard",
    },
    {
      name: "Events",
      icon: IoMdCalendar,
      route: "events",
    },
    {
      name: "Orders",
      icon: BsTicketPerforatedFill,
      route: "orders",
    },
    {
      name: "Cities",
      icon: FaCity,
      route: "cities",
    },
    {
      name: "Categories",
      icon: MdCategory,
      route: "categories",
    },
  ];

  const path = usePathname();

  const onclick = () => {
    // if(path){
    //   routes.find((route) => route.route === path)
    // }
  };

  return (
    <aside className="hidden fixed lg:flex w-64 flex-col border-r h-screen border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-center border-b border-slate-200 px-6">
        <span className="text-xl font-bold text-[#135bec] tracking-tight">
          TicketMaster Admin
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
        {routes.map((route, index) => (
          <div key={index} onClick={onclick}>
            <Link
              href={`/admin/${route.route}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-blue-50
                ${path === `/admin/${route.route}` && "text-slate-600 bg-blue-100"}
                `}
            >
              <route.icon className="text-xl" />
              {route.name}
            </Link>
          </div>
        ))}

        {/* <a className="flex items-center gap-3 rounded-lg px-3 py-2 bg-[#135bec]/10 text-[#135bec]">
          <IoMdCalendar className="text-xl"/>
          Events
        </a> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
