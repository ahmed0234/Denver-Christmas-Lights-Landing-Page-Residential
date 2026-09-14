import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BeforeandAfter from "@/components/BeforeandAfter";
import Services from "@/components/Services";

// Below-the-fold components loaded progressively to preserve critical render path
const AreasServices = dynamic(() => import("@/components/AreasServices"));
const Process = dynamic(() => import("@/components/Process"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const Reviews = dynamic(() => import("@/components/Reviews"));
const Faq = dynamic(() => import("@/components/Faq"));
const FinalCTA = dynamic(() => import("@/components/FinalCTA"));
const Footer = dynamic(() => import("@/components/Footer"));
const FloatingCTA = dynamic(() => import("@/components/FloatingCTA"));

const page = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <BeforeandAfter />
      <Services />
      <AreasServices />
      <Process />
      <WhyChooseUs />
      <Reviews />
      <Faq />
      <FinalCTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default page;
