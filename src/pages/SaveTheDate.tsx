import Header from "../components/Header";;
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";;
import VideoCard from "../components/VideoCard";
import { Button } from "../components/ui/button";
import { MessageCircle, Filter } from "lucide-react";
import saveTheDateImage from "../assets/save-the-date-1.jpg";
import heroImage from "../assets/hero-wedding-bg.jpg";

const saveTheDateDesigns = [
  { image: saveTheDateImage, title: "Romantic Sunset", category: "Save The Date", price: "₹1,999" },
  { image: heroImage, title: "Golden Hour Love", category: "Save The Date", price: "₹2,499" },
  { image: saveTheDateImage, title: "Floral Dreams", category: "Save The Date", price: "₹1,799" },
  { image: heroImage, title: "Modern Minimal", category: "Save The Date", price: "₹1,499" },
  { image: saveTheDateImage, title: "Vintage Romance", category: "Save The Date", price: "₹2,299" },
  { image: heroImage, title: "Elegant Script", category: "Save The Date", price: "₹1,999" },
];

const SaveTheDate = () => {
  const whatsappLink = "https://wa.me/919999999999?text=Hi!%20I%27m%20interested%20in%20Save%20The%20Date%20Video%20Invites.";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-cream overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={saveTheDateImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Save The Date <span className="text-gold">Video Invites</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground mb-8">
                Beautiful video announcements to mark your special date on everyone's calendar. 
                Create excitement before the big day arrives.
              </p>
              <Button variant="hero" size="xl" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Order on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Designs Grid */}
        <section className="py-12 lg:py-16 bg-ivory">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <p className="font-body text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{saveTheDateDesigns.length} designs</span>
              </p>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {saveTheDateDesigns.map((design, index) => (
                <div
                  key={`${design.title}-${index}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <VideoCard {...design} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Custom Save The Date? We've Got You!
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Share your love story and we'll create something unique just for you.
            </p>
            <Button variant="whatsapp" size="lg" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Request Custom Design
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default SaveTheDate;
