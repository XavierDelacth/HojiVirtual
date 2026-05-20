import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewHeroSection from "@/components/landing/NewHeroSection";
import CategoriesBar from "@/components/landing/CategoriesBar";
import FeaturedProductsGrid from "@/components/landing/FeaturedProductsGrid";
import AdvertisementBanners from "@/components/landing/AdvertisementBanners";
import HowItWorksNew from "@/components/landing/HowItWorksNew";
import FeaturedStoresGrid from "@/components/landing/FeaturedStoresGrid";
import PartnersBar from "@/components/landing/PartnersBar";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>HojiVirtual - O Seu Mercado Online em Angola</title>
        <meta name="description" content="Compre e venda produtos locais de forma segura no mercado Hoji Ya Henda digital. A plataforma líder de comércio informal em Angola." />
      </Helmet>
      
      <div className="min-h-screen bg-[#f8f7f4] overflow-x-hidden">
        <Navbar />
        <main className="pt-20">
          {/* 1. NAVBAR - mantido na estrutura de layout */}
          
          {/* 2. HERO SECTION - novo design com gradiente e layout flex */}
          <NewHeroSection />
          
          {/* 3. BARRA DE CATEGORIAS - novo componente */}
          <CategoriesBar />
          
          {/* 4. PRODUTOS EM DESTAQUE - grid de 4 colunas */}
          <FeaturedProductsGrid />
          
          {/* 5. BANNERS PUBLICITÁRIOS - novo componente com Multicaixa e Tupuca */}
          <AdvertisementBanners />
          
          {/* 6. COMO FUNCIONA - reestruturado */}
          <HowItWorksNew />
          
          {/* 7. LOJAS REGISTADAS - grid de 4 colunas */}
          <FeaturedStoresGrid />
          
          {/* 8. FAIXA DE PARCEIROS - simplificado */}
          <PartnersBar />
          
          {/* 9. FOOTER - mantido na estrutura de layout */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
