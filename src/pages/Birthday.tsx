import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import VideoCard from "../components/VideoCard";
import { Button } from "../components/ui/button";
import { MessageCircle, Filter } from "lucide-react";
import birthdayImage from "../assets/birthda-1.jpg";
import heroImage from "../assets/hero-wedding-bg.jpg";

const birthdayDesigns = [
  { image: birthdayImage, title: "Sparkling Birthday Bash", category: "Birthday", price: "₹1,499" },
  { image: heroImage, title: "Confetti Celebration", category: "Birthday", price: "₹1,799" },
  { image: birthdayImage, title: "Kids Party Magic", category: "Birthday", price: "₹1,299" },
  { image: heroImage, title: "Elegant Adult Party", category: "Birthday", price: "₹1,999" },
  { image: birthdayImage, title: "First Birthday Special", category: "Birthday", price: "₹2,499" },
  { image: heroImage, title: "Milestone Celebration", category: "Birthday", price: "₹2,299" },
  { image: birthdayImage, title: "Themed Party Invite", category: "Birthday", price: "₹1,699" },
  { image: heroImage, title: "Golden Birthday", category: "Birthday", price: "₹1,899" },
];

const Birthday = () => {
  const whatsappLink = "https://wa.me/919999999999?text=Hi!%20I%27m%20interested%20in%20Birthday%20Video%20Invites.";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-cream overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={birthdayImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Birthday <span className="text-gold">Video Invites</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground mb-8">
                Make every birthday unforgettable with fun, vibrant video invitations. 
                From first birthdays to milestone celebrations!
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
                Showing <span className="font-semibold text-foreground">{birthdayDesigns.length} designs</span>
              </p>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {birthdayDesigns.map((design, index) => (
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
              Planning a Themed Party?
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              From princesses to superheroes, we create custom invites for any theme!
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

export default Birthday;
