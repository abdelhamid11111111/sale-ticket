import Image from "next/image";
import Navbar from "../components/ui/Navbar";
import HeroSection from "../components/ui/HeroSection";
import EventsGrid from "../components/ui/EventsGrid";
import Footer from "../components/ui/Footer";



const HomePage = () => {
  return (
    <div className="bg-background-light font-display text-slate-800 dark:text-slate-100 antialiased min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="grow">

        {/* Hero Section */}
        <HeroSection />

        {/* Events with filter and pagination */}
        <EventsGrid/>

        {/* Footer */}
        <Footer/>
        
      </main>
    </div>
  );
};

export default HomePage;
