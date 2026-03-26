import { useInfiniteQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import VideoCard from "../components/VideoCard";
import { Button } from "../components/ui/button";
import { MessageCircle } from "lucide-react";
import heroBg from "../assets/BannerBG.webp";
import { fetchDesignsByCategoryName } from "../lib/designs";
import { hasSupabaseConfig } from "../lib/supabase";

const BabyShower = () => {
  const pageSize = 8;
  const whatsappLink =
    "https://wa.me/918487908430?text=Hi!%20I%27m%20interested%20in%20Baby%20Shower%20Video%20Invites.";

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["babyshower-designs"],
    queryFn: ({ pageParam }) =>
      fetchDesignsByCategoryName("Baby Shower", {
        limit: pageSize,
        offset: Number(pageParam ?? 0),
        exactMatch: true,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < pageSize ? undefined : allPages.length * pageSize,
    enabled: hasSupabaseConfig,
    staleTime: 60_000,
  });

  const babyShowerDesigns = data?.pages.flatMap((page) => page) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-white/60">
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#b93b9f] mb-6">
                Baby Shower <span className="text-[#4161ef]">Video Invites</span>
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
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {babyShowerDesigns.map((design, index) => (
                      <div
                        key={`${design.id || design.title}-${index}`}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <VideoCard {...design} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-center">
                    {hasNextPage ? (
                      <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? "Loading more..." : "Load More"}
                      </Button>
                    ) : (
                      <p className="font-body text-sm text-muted-foreground">All items have been loaded.</p>
                    )}
                  </div>
                </>
              )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-16 bg-white border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Theme, Your Moment, Your Invite
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Beautifully designed baby shower video invitations made just for your special day.
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
