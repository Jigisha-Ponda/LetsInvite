import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoCard from "../components/VideoCard";
import { Button } from "../components/ui/button";
import { MessageCircle } from "lucide-react";
import heroBg from "../assets/BannerBG.webp";
import { fetchDesignsByCategoryName } from "../lib/designs";
import { hasSupabaseConfig } from "../lib/supabase";

const WebsiteInvites = () => {
  const pageSize = 8;
  const whatsappLink =
    "https://wa.me/918487908430?text=Hi!%20I%27m%20interested%20in%20Website%20Invites.";
  const [activeFeature, setActiveFeature] = useState("rsvp");
  const [openFaq, setOpenFaq] = useState<string | null>("delivery");

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["website-invites-designs"],
      queryFn: ({ pageParam }) =>
        fetchDesignsByCategoryName("Wedding Website Invites", {
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

  const websiteInviteDesigns = data?.pages.flatMap((page) => page) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-white/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#b93b9f] mb-6">
                Website <span className="text-[#4161ef]">Invites</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground mb-8">
                Modern, shareable website invitations that make RSVPs and details effortless.
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

        {/* Social Proof */}
        <section className="py-10 lg:py-14 bg-white border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <p className="font-display text-3xl font-bold text-foreground">500+ Couples</p>
                <p className="font-body text-sm text-muted-foreground mt-2">
                  Celebrated with a custom invite site
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <p className="font-display text-3xl font-bold text-foreground">24–48 Hrs</p>
                <p className="font-body text-sm text-muted-foreground mt-2">
                  Typical delivery after details are shared
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <p className="font-display text-3xl font-bold text-foreground">1 Link</p>
                <p className="font-body text-sm text-muted-foreground mt-2">
                  Share everywhere for RSVP & event info
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 lg:py-16 bg-[#F7F5FF]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Everything Guests Need, In One Place
              </h2>
              <p className="font-body text-muted-foreground mt-3">
                Clean design, simple sharing, and a smooth RSVP experience.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
              <div className="rounded-2xl border border-border bg-white p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { id: "rsvp", label: "RSVP Tracking" },
                    { id: "schedule", label: "Schedule & Maps" },
                    { id: "story", label: "Photos & Story" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFeature(tab.id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                        activeFeature === tab.id
                          ? "bg-[#4161ef] text-white border-[#4161ef]"
                          : "bg-white text-foreground border-border hover:border-[#4161ef]"
                      }`}
                      aria-pressed={activeFeature === tab.id}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeFeature === "rsvp" && (
                  <div className="animate-fade-in">
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      Instant RSVP Tracking
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mt-2">
                      Collect responses in real time, track guest counts, and manage notes
                      without messy spreadsheets.
                    </p>
                    <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Names + RSVP status in one place</li>
                      <li>Meal preferences or notes included</li>
                      <li>Quick updates for last-minute changes</li>
                    </ul>
                  </div>
                )}

                {activeFeature === "schedule" && (
                  <div className="animate-fade-in">
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      Schedule, Location & Maps
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mt-2">
                      Keep every function organized so guests never miss a moment.
                    </p>
                    <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Timeline for each ceremony</li>
                      <li>Google Maps links for venue</li>
                      <li>Dress code and important notes</li>
                    </ul>
                  </div>
                )}

                {activeFeature === "story" && (
                  <div className="animate-fade-in">
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      Photo & Story Sections
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mt-2">
                      Add your story, engagement photos, or a gallery for guests.
                    </p>
                    <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Couple story timeline</li>
                      <li>Photo gallery grid</li>
                      <li>Shareable highlight moments</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Mobile First Design",
                    copy: "Looks perfect on phones, tablets, and desktops.",
                  },
                  {
                    title: "Customizable Theme",
                    copy: "Colors, fonts, and layout tailored to your vibe.",
                  },
                  {
                    title: "Shareable Link",
                    copy: "One link for WhatsApp, Instagram, and SMS.",
                  },
                  {
                    title: "Fast Delivery",
                    copy: "Typically ready in 24–48 hours after details are shared.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border bg-white p-6"
                  >
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mt-2">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                How It Works
              </h2>
              <p className="font-body text-muted-foreground mt-3">
                Simple steps to go live fast.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Pick a Design",
                  copy: "Choose a layout you love from our templates.",
                },
                {
                  step: "02",
                  title: "Share Your Details",
                  copy: "Send names, dates, venue, schedule, and photos.",
                },
                {
                  step: "03",
                  title: "Get Your Link",
                  copy: "We deliver your website invite ready to share.",
                },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-border p-6">
                  <p className="font-display text-2xl font-bold text-[#4161ef]">
                    {item.step}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-2">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Start on WhatsApp
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
                  {websiteInviteDesigns.length} designs
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
                Loading website invite designs...
              </p>
            )}

            {hasSupabaseConfig && isError && (
              <p className="font-body text-sm text-red-500">
                Failed to load website invite designs from ProductTemplate.
              </p>
            )}

            {hasSupabaseConfig && !isLoading && !isError && websiteInviteDesigns.length === 0 && (
              <p className="font-body text-sm text-muted-foreground">
                No website invite designs found in ProductTemplate for category_name = Wedding Website Invites.
              </p>
            )}

            {hasSupabaseConfig && !isLoading && !isError && websiteInviteDesigns.length > 0 && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {websiteInviteDesigns.map((design, index) => (
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
                    <Button
                      variant="outline"
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                    >
                      {isFetchingNextPage ? "Loading more..." : "Load More"}
                    </Button>
                  ) : (
                    <p className="font-body text-sm text-muted-foreground">
                      All items have been loaded.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 lg:py-16 bg-[#F7F5FF]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                FAQs
              </h2>
              <p className="font-body text-muted-foreground mt-3">
                Quick answers to common questions.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {[
                {
                  id: "delivery",
                  q: "How long does it take?",
                  a: "Most invites are ready in 24–48 hours after you share details.",
                },
                {
                  id: "edits",
                  q: "Can I edit after delivery?",
                  a: "Yes, you can request minor updates to text or photos.",
                },
                {
                  id: "app",
                  q: "Do guests need an app?",
                  a: "No, it’s a simple web link that works on any device.",
                },
                {
                  id: "rsvp",
                  q: "Can I include RSVP?",
                  a: "Yes, RSVP tracking is available on request.",
                },
              ].map((item) => {
                const isOpen = openFaq === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    className="w-full text-left rounded-2xl border border-border bg-white px-6 py-4"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {item.q}
                      </h3>
                      <span className="font-display text-2xl text-[#4161ef]">
                        {isOpen ? "–" : "+"}
                      </span>
                    </div>
                    {isOpen && (
                      <p className="font-body text-sm text-muted-foreground mt-2">
                        {item.a}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-16 bg-white border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Event, Your Link, Your Invite
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Share a beautiful website invite with all the details your guests need.
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
    </div>
  );
};

export default WebsiteInvites;
