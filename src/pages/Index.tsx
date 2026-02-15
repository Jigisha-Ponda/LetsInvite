import Header from "../components/Header";
import InteractiveHeroSection from "../components/InteractiveHeroSection";
import TabsCarouselSection from "../components/TabsCarouselSection";
import CategoriesSection from "../components/CategoriesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";
import FeaturedDesigns from "../components/FeaturedDesigns";
import AISection from "../components/AISection";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import HeroSection from "../components/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <InteractiveHeroSection />
        <FeaturedDesigns />
        {/* <HeroSection/> */}
        {/* <TabsCarouselSection /> */}
        <HowItWorks />
        {/* <CategoriesSection /> */}
        <WhyChooseUs />
        <AISection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      {/* <WhatsAppFloat /> */}
    </div>
  );
};

export default Index;
