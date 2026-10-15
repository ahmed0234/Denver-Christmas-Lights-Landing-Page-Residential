import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BeforeandAfter from "@/components/BeforeandAfter";
import Services from "@/components/Services";
import AreasServices from "@/components/AreasServices";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

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
      <ReviewsSection />
      <FaqSection />
      <FinalCTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default page;
