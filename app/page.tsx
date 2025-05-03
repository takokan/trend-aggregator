import Brands from "@/components/Brands";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="font-sans text-gray-900 antialiased">
      <Header/>
      <Hero />
      <Brands />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
