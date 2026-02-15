import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { fetchFeaturedDesigns } from "../lib/designs";
import { hasSupabaseConfig } from "../lib/supabase";

const FeaturedDesigns = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-designs"],
    queryFn: () => fetchFeaturedDesigns(8),
    enabled: hasSupabaseConfig,
    staleTime: 60_000,
  });
  const designs = data ?? [];

  const birthdayDesigns = designs
    .filter((d) => d.category === "Birthday")
    .slice(0, 4);

  const babyShowerDesigns = designs
    .filter((d) => d.category === "Baby Shower")
    .slice(0, 4);

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-gold">Video Designs</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-picked designs loved by hundreds of couples. Each one crafted to make your celebration unforgettable.
          </p>
        </div>

        {/* Designs Grid */}
        {!hasSupabaseConfig && (
          <p className="font-body text-sm text-muted-foreground">
            Supabase env values are missing. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your `.env`.
          </p>
        )}
        {hasSupabaseConfig && isLoading && (
          <p className="font-body text-sm text-muted-foreground">Loading featured designs...</p>
        )}
        {hasSupabaseConfig && isError && (
          <p className="font-body text-sm text-red-500">
            Failed to load featured designs from ProductTemplate.
          </p>
        )}
        {hasSupabaseConfig && !isLoading && !isError && designs.length === 0 && (
          <p className="font-body text-sm text-muted-foreground">
            No featured designs found in ProductTemplate. If rows exist in Supabase dashboard, enable
            anon SELECT policy (RLS) for ProductTemplate and ProductCategory.
          </p>
        )}
        {/* {hasSupabaseConfig && !isLoading && !isError && designs.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {designs.map((design, index) => (
              <div
                key={`${design.title}-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <VideoCard {...design} />
              </div>
            ))}
          </div>
        )} */}

        {hasSupabaseConfig && !isLoading && !isError && designs.length > 0 && (
          <div className="space-y-16">

            {/* 🎂 Birthday */}
            {birthdayDesigns.length > 0 && (
              <div>
                <h3 className="font-display text-2xl font-semibold mb-6 text-start">
                  Birthday <span className="text-gold">Invites</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {birthdayDesigns.map((design, index) => (
                    <div
                      key={`birthday-${design.id}`}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <VideoCard {...design} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 👶 Baby Shower */}
            {babyShowerDesigns.length > 0 && (
              <div>
                <h3 className="font-display text-2xl font-semibold mb-6 text-start">
                  Baby Shower <span className="text-gold">Invites</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {babyShowerDesigns.map((design, index) => (
                    <div
                      key={`baby-${design.id}`}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <VideoCard {...design} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDesigns;
