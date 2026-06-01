import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Features from "@/components/sections/Features";
import Portfolio from "@/components/sections/Portfolio";
import Workflow from "@/components/sections/Workflow";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Testimonials from "@/components/sections/Testimonials";
import AIAssistant from "@/components/sections/AIAssistant";
import PremiumPricingCalculator from "@/components/sections/PremiumPricingCalculator";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      <Stats />
      <Services />
      <Features />
      <Portfolio />
      <Workflow />
      <Pricing />
      <Faq />
      <Testimonials/>
      <Contact />
      <PremiumPricingCalculator />
      <Footer />
      <AIAssistant/>
    </>
  );
}