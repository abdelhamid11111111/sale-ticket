import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";

const ProductPage = () => {
  return (
    <div className="bg-background-light text-slate-900 font-display antialiased min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img
                alt="Large auditorium filled with people under dramatic blue stage lighting"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmMtB7rsE36nU5YCUzfGSCs02DVeK6lAXtV1dfJUlRjWd9KUCXYFfIuJ054oIqhsARGJ6I8fHRmBSkzDCjxgqU-N89SW8D00tnVRmhbjvdPsGbQHJa6aREJRVAGkhnVhGFnNN1bRCu1o5u3jn5Ayb0SyVr3zYWroQCdUWdxP2NVDqkqW3l_1cXCzjyirZU_5qN5ze_xPEtegu1_ja562DtCBI8vz7Z0ngBHmAMme7PnHVSVGMIv8weyrKJx3QOm9t4H1BmIpjc2MpS"
              />
            </div>

            {/* Right Column: Content */}
            <div className="space-y-8">
              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                  Design Futures 2024: Shaping Tomorrow
                </h1>
              </div>

              {/* Info: Location and Time */}
              <div className="flex flex-wrap items-center gap-6">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaCalendarAlt className="text-lg text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                      Date & Time
                    </p>
                    <p className="font-bold text-slate-900">
                      Oct 12, 2024 • 9:00 AM
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaLocationDot className="text-lg text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                      Location
                    </p>
                    <p className="font-bold text-slate-900">
                      Moscone Center, SF
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-slate-200 pt-6">
                <p className="text-slate-500 text-sm font-medium mb-1">
                  Price
                </p>
                <p className="text-4xl font-extrabold text-slate-900">
                  $299
                </p>
              </div>

              {/* About this Event */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  About this Event
                </h3>
                <p className="leading-relaxed mb-4 text-slate-600">
                  Join us for the premier design conference of the year, where
                  creativity meets technology. Design Futures 2024 brings
                  together the brightest minds in UX, product design, and
                  creative technology to explore what lies ahead. Over three
                  immersive days, you engage with industry leaders through
                  keynote speeches, hands-on workshops, and networking sessions
                  designed to spark innovation.
                </p>
                <p className="leading-relaxed text-slate-600">
                  This theme, Shaping Tomorrow, focuses on the ethical
                  responsibilities of designers in an AI-driven world. We will
                  delve into topics such as sustainable design systems,
                  inclusive accessibility, and the future of human-computer
                  interaction. Whether you are a junior designer or a seasoned
                  creative director, this event offers actionable insights to
                  elevate your craft.
                </p>
              </div>

              {/* Book Now Button */}
              <div className="pt-4">
                <button className="w-full bg-primary dark:bg-slate-800 hover:bg-primary-hover text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                  <span>Book Now</span>                                                            
                  <FaArrowRight />
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  No hidden fees. Cancel anytime within 24h.
                </p>
              </div>
            </div>  
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <Footer />
    </div>
  );
};

export default ProductPage;