import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import VideoCard from "../components/VideoCard";
import { Button } from "../components/ui/button";
import { MessageCircle } from "lucide-react";
import babyShowerImage from "../assets/birthda-1.jpg"; // change if needed
import { fetchDesignsByCategoryName } from "../lib/designs";
import { hasSupabaseConfig } from "../lib/supabase";

const BabyShower = () => {
  const whatsappLink =
    "https://wa.me/918141721001?text=Hi!%20I%27m%20interested%20in%20Baby%20Shower%20Video%20Invites.";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["babyshower-designs"],
    queryFn: () => fetchDesignsByCategoryName("Baby Shower"),
    enabled: hasSupabaseConfig,
    staleTime: 60_000,
  });

  const babyShowerDesigns = data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-secondary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={babyShowerImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Baby Shower <span className="text-gold">Video Invites</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground mb-8">
                Celebrate the joy of welcoming your little one with adorable, heartwarming
                baby shower video invitations.
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
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <p className="font-body text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {babyShowerDesigns.length} designs
                </span>
              </p>
            </div>

            {!hasSupabaseConfig && (
              <p className="font-body text-sm text-muted-foreground">
                Supabase env values are missing. Add `VITE_SUPABASE_URL` and
                `VITE_SUPABASE_ANON_KEY` in your `.env`.
              </p>
            )}

            {hasSupabaseConfig && isLoading && (
              <p className="font-body text-sm text-muted-foreground">
                Loading baby shower designs...
              </p>
            )}

            {hasSupabaseConfig && isError && (
              <p className="font-body text-sm text-red-500">
                Failed to load baby shower designs from ProductTemplate.
              </p>
            )}

            {hasSupabaseConfig &&
              !isLoading &&
              !isError &&
              babyShowerDesigns.length === 0 && (
                <p className="font-body text-sm text-muted-foreground">
                  No baby shower designs found in ProductTemplate for
                  category_name = Baby Shower.
                </p>
              )}

            {hasSupabaseConfig &&
              !isLoading &&
              !isError &&
              babyShowerDesigns.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {babyShowerDesigns.map((design, index) => (
                    <div
                      key={`${design.title}-${index}`}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <VideoCard {...design} />
                    </div>
                  ))}
                </div>
              )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-16 bg-white border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Planning a Special Celebration?
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              We create customized baby shower video invites tailored to your theme and style.
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
      {/* <WhatsAppFloat /> */}
    </div>
  );
};

export default BabyShower;
