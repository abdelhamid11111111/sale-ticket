import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-lg overflow-hidden h-[500px] shadow-2xl group">
        <div className="absolute inset-0 bg-slate-900">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA17QB_6ACqHBTmUHzv3feJppXqFxMRfn0bfyJhUOrUGD5mpNsbPtAA4T4wX9cxnFzapWVFzx9GVkgN0WjdWvDkf1xmweujszTGT_j9BL4g8nYr1a-u7Z5ThVDmNFp_jCrKM90K7kMDEPIVBd0gkAkF9CQjKw1gpy6vcRxt_d-FRe7M2LzARHSNyYmpmQcOP8YhXr0PsGdtwvLFcFhJCOqGl075o_CpVo95hKnyIZRXPQn6t61Zct5hiavIblrAIdE1Mz7lFfYqxiV4"
            alt="Crowd at a vibrant music concert with stage lights"
            fill
            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 via-transparent to-transparent"></div> */}
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 lg:w-1/2 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-200 text-sm font-medium">
              <FaCalendarAlt/>
              Nov 24 - 26, 2023
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Neon Nights <br /> Music Festival
          </h1>
          <p className="text-slate-300 text-lg line-clamp-2">
            Experience the ultimate fusion of electronic beats and visual art in
            the heart of the city. Three nights of unforgettable performances.
          </p>
          <div className="flex items-center gap-2 text-slate-200 mt-2">
            <FaLocationDot/>
            <span>Downtown Arena, Los Angeles</span>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 flex gap-2">
          <button className="w-3 h-3 rounded-full bg-white"></button>
          <button className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors"></button>
          <button className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors"></button>
          <button className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors"></button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
