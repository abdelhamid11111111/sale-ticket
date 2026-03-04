import Image from "next/image";
import Navbar from "../components/ui/Navbar";
import HeroSection from "../components/ui/HeroSection";
import EventsGrid from "../components/ui/EventsGrid";
import Footer from "../components/ui/Footer";
import { Suspense } from "react";



const HomePage = () => {
  return (
<div className="bg-background-light font-display text-slate-800 dark:text-slate-100 antialiased min-h-screen flex flex-col transition-colors duration-300 overflow-x-hidden w-full">      
      {/* Navbar */}
      <Navbar query=""/>

      {/* Main Content */}
      <main className="grow">

        {/* Hero Section */}
        <HeroSection />

        {/* Events with filter and pagination */}
        <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 rounded-xl mx-8" />}>
          <EventsGrid />
        </Suspense>

        {/* Footer */}
        <Footer/>
        
      </main>
    </div>
  );
};

export default HomePage;
