import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedProductsCarousel from "@/components/landing/FeaturedProductsCarousel";
import PricingSection from "@/components/landing/PricingSection";
import FeaturedStoresCarousel from "@/components/landing/FeaturedStoresCarousel";
import PartnersSection from "@/components/landing/PartnersSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>HojiVirtual - O Seu Mercado Online em Angola</title>
        <meta name="description" content="Compre e venda produtos locais de forma segura no mercado Hoji Ya Henda digital. A plataforma líder de comércio informal em Angola." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <HowItWorks />
          <FeaturedProductsCarousel />
          {/* <PricingSection /> */}
          <FeaturedStoresCarousel />
          <PartnersSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
