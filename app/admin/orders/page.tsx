import Sidebar from "@/app/components/admin/Sidebar";
import { CiSearch } from "react-icons/ci";
import { Edit, Trash, Trash2 } from "lucide-react";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";

export default function SoldTicketsLog() {
  // Table data array
  const tableData = [
    {
      id: 1,
      eventName: "Summer Waves Fest",
      eventDate: "Aug 24, 2023",
      buyerName: "Olivia Rhye",
      transactionId: "#TRX-88392",
      email: "olivia@untitledui.com",
      phone: "+1 (555) 123-4567",
      city: "San Francisco",
      quantity: 2,
      totalPrice: "$240.00",
      status: "Paid",
      statusColor: "green",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCxqPXHwktfv4W_WwXE52BW0hDZvKdRyq8mkpB9UtWryBN_n9QkoNIEtAZA4oBbzJGx44HXLcBgZoMhuiwSlp9903RbB0D04zZiC1ZdjF300L-_Au3U6O2c26jSrJ1JuwmpAlakGWdpTuXtkbq2D3kX8kuEYoT6t5oEntAcfmltAsg3GiYYA-DiT_IkgnZBsQTZc4vMZOetlGzpe2Ypdq5WqnyHMJH49AJQVEymYuERv5l7WhllBp9qgBYKZJ55wANoH14qmON6sPjl",
      hasImage: true,
    },
    {
      id: 2,
      eventName: "Tech Summit 2024",
      eventDate: "Sep 12, 2023",
      buyerName: "Phoenix Baker",
      transactionId: "#TRX-88391",
      email: "phoenix@baker.com",
      phone: "+1 (555) 987-6543",
      city: "New York",
      quantity: 1,
      totalPrice: "$850.00",
      status: "Paid",
      statusColor: "green",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_IPhFStUZZbVuUL5DMEteCfrl1kJajcn4s9QalLUVA0YsDdq95IC5nS2dMq7YbYuJwOxqJLq5T9opA0R2xYXyLwLTdSBOTRQSYt68fUk8F-yWPRldOfZSqu-y3xPj85jHPNyZlb4OipXy3cuI6t4jbqp44qsz_r_vGZxFxC6YuyZmb6SaOFF-Q3iGkxSY6W6xnT5opNQPbPFjEqdZq7Z93BvJNqRJWTsHrhrKkC40sOb5o13lLWCCQZCQ-sH_uDDhTUjLdU7AlGNI",
      hasImage: true,
    },
    {
      id: 3,
      eventName: "Comedy Night Live",
      eventDate: "Oct 05, 2023",
      buyerName: "Lana Steiner",
      transactionId: "#TRX-88390",
      email: "lana@company.com",
      phone: "+44 20 7123 4567",
      city: "London",
      quantity: 4,
      totalPrice: "$120.00",
      status: "Refunded",
      statusColor: "red",
      hasImage: false,
      // icon: "theater_comedy",
      // iconBg: "indigo",
    },
    {
      id: 4,
      eventName: "Art Workshop",
      eventDate: "Nov 11, 2023",
      buyerName: "Demi Wilkinson",
      transactionId: "#TRX-88389",
      email: "demi@design.com",
      phone: "+1 (555) 234-5678",
      city: "Melbourne",
      quantity: 1,
      totalPrice: "$45.00",
      status: "Pending",
      statusColor: "yellow",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ7JWp5hwkk4_Xsc6PHRsz-BCmVNlJbkFf9_csR70gT1L65Ha5XX2hvLsjo-SDeUz3v3qqZROJ7smgpBgqLCtAE0WJC3dW6xz5xM6t4wV7fMj6DA6_uuV8wUV7PUljssfhszen9UdkWIJd8PA2uNpuhdyMPP4p21pROCGmGOFX6_YhCHrtfSt-uAFcGRexGuVRa86ngccWA-W1xFp9VFDoJ9QgdyskuBfUl1sUfer3Ux0QsqVYVHb94APyWjlRx1Tf6hZY5J_-KCxw",
      hasImage: true,
    },
    {
      id: 5,
      eventName: "Neon Nights",
      eventDate: "Dec 01, 2023",
      buyerName: "Candice Wu",
      transactionId: "#TRX-88388",
      email: "candice@wu.com",
      phone: "+1 (555) 345-6789",
      city: "Toronto",
      quantity: 3,
      totalPrice: "$180.00",
      status: "Paid",
      statusColor: "green",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmaV0Yl6YshMBe7B85dbQjZAqyjzuxiW93GLOuKCIZWnTDd_liap78qhzjdjUMTKEIGLwXHgj7Nmxa3mcHqes890gl3ctDYbu7yRH-Ry0NFaCUoZ62OY_Pl-AIhF76y-aH3EAO4jLrkzaQGdoRCDwhC1dte1uRm4XbkHc-wzMeZjJMA-i-5b7OWUNdWrSHGIa5Vt9Cw8C47PHEu3VeMBfMl7l8zJ1RAb8vtXTp7h2n_z_PxtZaY5iUMw6LBFJONeXMbntatl74Q4d2",
      hasImage: true,
    },
    {
      id: 6,
      eventName: "Food Truck Festival",
      eventDate: "Dec 15, 2023",
      buyerName: "Natali Craig",
      transactionId: "#TRX-88387",
      email: "natali@craig.com",
      phone: "+1 (555) 456-7890",
      city: "Austin",
      quantity: 6,
      totalPrice: "$60.00",
      status: "Paid",
      statusColor: "green",
      hasImage: false,
      // icon: "restaurant",
      // iconBg: "pink",
    },
  ];

  // Status filter options
  const statusOptions = ["All Statuses", "Completed", "Refunded", "Pending"];

  // Pagination data
  const pagination = {
    currentPage: 1,
    totalPages: 12,
    showingFrom: 1,
    showingTo: 6,
    totalResults: 128,
  };

  return (
    <div className="font-display bg-background-light text-slate-800 antialiased bg-[#f6f6f8] min-h-screen flex">
      {/* SideBar */}
      <Sidebar />

      {/* Main Content - with sidebar offset */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1920px] mx-auto w-full">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Sold Tickets Log
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Review and manage all ticket transactions across events.
              </p>
            </div>
          </div>

          {/* Filters & Toolbar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search */}
              <div className="col-span-1 md:col-span-5 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CiSearch />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none sm:text-sm transition-shadow"
                  placeholder="Search by buyer name, email, or event..."
                  type="text"
                />
              </div>
              {/* Date Filter */}
              <div className="col-span-1 md:col-span-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    className="block w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 sm:text-sm"
                    type="date"
                  />
                </div>
                <span className="text-slate-400">-</span>
                <div className="relative flex-1">
                  <input
                    className="block w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 sm:text-sm"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data Table Container */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
            {/* Table Header (Sticky) */}
            <div className="overflow-auto custom-scrollbar flex-1 relative">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-50 shadow-sm"
                    >
                      <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                        Event Name
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-50 shadow-sm"
                    >
                      Buyer
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-50 shadow-sm"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-50 shadow-sm"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-50 shadow-sm"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-50 shadow-sm"
                    >
                      <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-primary transition-colors">
                        Total Price
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {tableData.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {row.hasImage ? (
                              <img
                                alt={row.eventName}
                                className="h-10 w-10 rounded-lg object-cover"
                                src={row.image}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">
                              {row.eventName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {row.eventDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900 font-medium">
                          {row.buyerName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {row.transactionId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">
                          {row.email}
                        </div>
                        <div className="text-xs text-slate-500">
                          {row.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-700">
                          {row.city}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-700 tabular-nums">
                        {row.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-slate-900 tabular-nums">
                        {row.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-slate-200 bg-white px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-sm text-slate-500 text-center sm:text-left">
                  Showing{" "}
                  <span className="font-medium text-slate-900">
                    {pagination.showingFrom}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-slate-900">
                    {pagination.showingTo}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-900">
                    {pagination.totalResults}
                  </span>{" "}
                  results
                </div>
                <nav
                  aria-label="Pagination"
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                >
                  <button className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                    <span className="sr-only">Previous</span>
                    <FaArrowLeftLong />
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-primary/10 text-sm font-medium text-primary hover:bg-primary/20 z-10">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 hidden md:inline-flex">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">
                    ...
                  </span>
                  <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                    {pagination.totalPages}
                  </button>
                  <button className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                    <span className="sr-only">Next</span>
                    <FaArrowRight />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
