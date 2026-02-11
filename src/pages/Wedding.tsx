import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import VideoCard from "../components/VideoCard";
import { Button } from "../components/ui/button";
import { MessageCircle, Filter } from "lucide-react";
import weddingImage from "../assets/wedding-invite-1.jpg";
import heroImage from "../assets/hero-wedding-bg.jpg";

const weddingDesigns = [
  { image: weddingImage, title: "Royal Wedding Elegance", category: "Wedding", price: "₹2,999" },
  { image: heroImage, title: "Traditional Mandap", category: "Wedding", price: "₹3,499" },
  { image: weddingImage, title: "Modern Love Story", category: "Wedding", price: "₹2,499" },
  { image: heroImage, title: "Bollywood Romance", category: "Wedding", price: "₹3,999" },
  { image: weddingImage, title: "Elegant Floral", category: "Wedding", price: "₹2,799" },
  { image: heroImage, title: "Vintage Gold", category: "Wedding", price: "₹2,999" },
  { image: weddingImage, title: "Royal Palace", category: "Wedding", price: "₹4,499" },
  { image: heroImage, title: "Minimalist Chic", category: "Wedding", price: "₹1,999" },
];

const Wedding = () => {
  const whatsappLink = "https://wa.me/998141721001?text=Hi!%20I%27m%20interested%20in%20Wedding%20Video%20Invites.";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-cream overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={weddingImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Wedding <span className="text-gold">Video Invites</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground mb-8">
                Cinematic, AI-powered video invitations that capture the magic of your love story. 
                Make your wedding announcement as special as your big day.
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
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <p className="font-body text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{weddingDesigns.length} designs</span>
              </p>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {weddingDesigns.map((design, index) => (
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
              Don't See What You're Looking For?
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              We create 100% custom designs. Share your vision with us!
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

export default Wedding;
