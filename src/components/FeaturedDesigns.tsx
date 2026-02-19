import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import { fetchDesignsByCategoryName } from "../lib/designs";
import { hasSupabaseConfig } from "../lib/supabase";
import birthdayInvites from "../assets/BirthdayInvites.png";
import babyShowerInvites from "../assets/BabyShowerInvites.png";

const FeaturedDesigns = () => {
  const {
    data: birthdayDesigns = [],
    isLoading: birthdayLoading,
    isError: birthdayError,
  } = useQuery({
    queryKey: ["featured-birthday-designs"],
    queryFn: () => fetchDesignsByCategoryName("Birthday", 4),
    enabled: hasSupabaseConfig,
    staleTime: 60_000,
  });

  const {
    data: babyShowerDesigns = [],
    isLoading: babyLoading,
    isError: babyShowerError,
  } = useQuery({
    queryKey: ["featured-baby-shower-designs"],
    queryFn: () => fetchDesignsByCategoryName("Baby Shower", 4),
    enabled: hasSupabaseConfig,
    staleTime: 60_000,
  });

  const isLoading = birthdayLoading || babyLoading;
  const isError = birthdayError || babyShowerError;
  const totalDesigns = birthdayDesigns.length + babyShowerDesigns.length;
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
        {hasSupabaseConfig && !isLoading && !isError && totalDesigns === 0 && (
          <p className="font-body text-sm text-muted-foreground">
            No featured designs found in ProductTemplate. If rows exist in Supabase dashboard, enable
            anon SELECT policy (RLS) for ProductTemplate and ProductCategory.
          </p>
        )}

        {hasSupabaseConfig && !isLoading && !isError && totalDesigns > 0 && (
          <div className="space-y-16">

            {/* 🎂 Birthday */}
            {birthdayDesigns.length > 0 && (
              <div>
                {/* <h3 className="font-display text-3xl font-semibold mb-6 text-center text-white">
                  <span className="inline-block bg-[#1B51B6] px-5 py-3 rounded-lg">
                    Birthday <span className="text-white">Invites</span>
                  </span>
                </h3> */}
                <div className="flex items-center justify-center mb-10">
                  <img
                    src={birthdayInvites}
                    alt="Birthday Invite"
                    className="max-w-52 max-h-52 object-contain"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {birthdayDesigns.map((design, index) => (
                    <div
                      key={`birthday-${design.id || design.title}-${index}`}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <VideoCard {...design} />
                    </div>
                  ))}
                </div>
                <div className="mt-5 mb-6 text-center">
                  <Link
                    to="/birthday"
                    className="inline-block bg-[#1B51B6] px-5 py-2 rounded-lg font-display text-md font-semibold text-white"
                  >
                    View All
                  </Link>
                </div>
              </div>
            )}

            {/* 👶 Baby Shower */}
            {babyShowerDesigns.length > 0 && (
              <div>
                <div className="flex items-center justify-center mb-10">
                  <img
                    src={babyShowerInvites}
                    alt="Baby Shower Invite"
                    className="max-w-56 max-h-56 object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {babyShowerDesigns.map((design, index) => (
                    <div
                      key={`baby-${design.id || design.title}-${index}`}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <VideoCard {...design} />
                    </div>
                  ))}
                </div>
                <div className="mt-5 mb-6 text-center">
                  <Link
                    to="/baby-shower"
                    className="inline-block bg-[#1B51B6] px-5 py-2 rounded-lg font-display text-md font-semibold text-white"
                  >
                    View All
                  </Link>
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
