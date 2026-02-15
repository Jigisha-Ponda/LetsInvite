import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { Button } from "../components/ui/button";
import { fetchDesignById } from "../lib/designs";
import { hasSupabaseConfig } from "../lib/supabase";

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M20.52 3.48A11.8 11.8 0 0 0 12.07 0C5.58 0 .3 5.28.3 11.77c0 2.07.54 4.1 1.57 5.89L0 24l6.51-1.82a11.72 11.72 0 0 0 5.56 1.42h.01c6.49 0 11.77-5.28 11.77-11.77 0-3.14-1.22-6.09-3.33-8.35Zm-8.45 18.1h-.01a9.76 9.76 0 0 1-4.97-1.35l-.36-.21-3.86 1.08 1.03-3.77-.24-.39a9.77 9.77 0 0 1-1.5-5.17C2.16 6.36 6.64 1.88 12.07 1.88c2.61 0 5.06 1.02 6.9 2.88a9.7 9.7 0 0 1 2.84 6.9c0 5.42-4.41 9.92-9.74 9.92Zm5.35-7.39c-.29-.14-1.73-.85-2-.95-.27-.1-.46-.14-.65.14-.19.29-.75.95-.92 1.14-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.31-1.42-.86-.77-1.44-1.72-1.6-2.01-.17-.29-.02-.44.13-.58.13-.13.29-.33.44-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.57-.89-2.14-.24-.58-.48-.5-.65-.51-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.77.36-.26.29-1 1-1 2.44s1.03 2.84 1.17 3.03c.14.19 2.01 3.07 4.87 4.3.68.29 1.22.47 1.63.6.69.22 1.32.19 1.82.11.56-.08 1.73-.7 1.98-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33Z" />
  </svg>
);

const toYouTubeEmbedUrl = (url?: string) => {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([^?&/]+)/,
    /youtube\.com\/shorts\/([^?&/]+)/,
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=0&mute=0&playsinline=1&rel=0`;
    }
  }
  return null;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { data: design, isLoading, isError } = useQuery({
    queryKey: ["design-details", id],
    queryFn: () => fetchDesignById(id ?? ""),
    enabled: Boolean(id) && hasSupabaseConfig,
    staleTime: 60_000,
  });

  const defaultMessage = design
    ? `Hi! I'm interested in the "${design.title}" video invite design.`
    : "Hi! I'm interested in this video invite design.";
  const messageWithVideo =
    design?.videoSrc ? `${defaultMessage}\n\nVideo link: ${design.videoSrc}` : defaultMessage;
  const whatsappLink = `https://wa.me/918141721001?text=${encodeURIComponent(messageWithVideo)}`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const youtubeEmbed = toYouTubeEmbedUrl(design?.videoSrc);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const galleryImages = [...(design?.cardImages ?? []), design?.image]
    .filter((img): img is string => Boolean(img))
    .slice(0, 4);
  const activeImage = galleryImages[selectedIndex] || design?.image || "/placeholder.svg";
  const hasGallery = galleryImages.length > 0;

  useEffect(() => {
    setSelectedIndex(0);
  }, [design]);

  useEffect(() => {
    if (!isPreviewOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPreviewOpen(false);
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isPreviewOpen]);

  const goNext = () => {
    if (galleryImages.length < 2) return;
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goPrev = () => {
    if (galleryImages.length < 2) return;
    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleShare = async () => {
    if (!design) return;
    const shareData = {
      title: design.title,
      text: `Check this invite design: ${design.title}`,
      url: shareUrl,
    };
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="min-h-screen bg-white opacity-100">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {!hasSupabaseConfig && (
            <p className="font-body text-sm text-muted-foreground">
              Supabase env values are missing. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your `.env`.
            </p>
          )}
          {hasSupabaseConfig && isLoading && (
            <p className="font-body text-sm text-muted-foreground">Loading design details...</p>
          )}
          {hasSupabaseConfig && isError && (
            <p className="font-body text-sm text-red-500">Failed to load design details.</p>
          )}
          {hasSupabaseConfig && !isLoading && !isError && !design && (
            <p className="font-body text-sm text-muted-foreground">Design not found.</p>
          )}

          {design && (
            <>
              <div className="mt-6 mb-6 text-sm text-muted-foreground">
                <span>{design.category}</span> / <span>{design.title}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col lg:flex-row gap-4 items-start">
                  <div className="w-100 lg:w-28 shrink-0 flex flex-row lg:flex-col mx-auto gap-3">
                    {galleryImages.map((thumb, index) => (
                      <button
                        key={`${thumb}-${index}`}
                        type="button"
                        onClick={() => {
                          setSelectedIndex(index);
                          setIsPreviewOpen(true);
                        }}
                        className={`rounded-xl overflow-hidden border-2 transition ${selectedIndex === index ? "border-primary" : "border-border"
                          }`}
                      >
                        <img
                          src={thumb}
                          alt={`${design.title} preview ${index + 1}`}
                          className="w-full aspect-[9/14] object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="relative flex-1 rounded-2xl overflow-hidden bg-card shadow-card mx-5">
                    {youtubeEmbed ? (
                      <iframe
                        src={youtubeEmbed}
                        title={design.title}
                        className="w-full aspect-[9/14]"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : design.videoSrc ? (
                      <video
                        className="w-full aspect-[9/14] object-cover"
                        src={design.videoSrc}
                        poster={design.image}
                        controls
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <button type="button" onClick={() => setIsPreviewOpen(true)} className="w-full">
                        <img
                          src={activeImage}
                          alt={design.title}
                          className="w-full aspect-[9/14] object-cover"
                        />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{design.title}</h1>
                  <h2 className="font-display text-xl text-foreground mb-2">
                    {design.subtitle || "Description"}
                  </h2>
                  {design.price && (
                    <div className="flex items-center gap-3 mb-6">
                      <p className="font-display text-3xl text-blue-600 font-semibold">
                        {design.price}
                      </p>
                      {design.originalPrice && (
                        <p className="text-lg text-muted-foreground ">
                          <span className="line-through text-lg text-muted-foreground h">
                            {design.originalPrice}
                          </span>
                          (50% off)
                        </p>
                      )}
                    </div>
                  )}
                  <div className="space-y-4 mb-8">
                    <Button variant="whatsapp" size="lg" className="w-48" asChild>
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="w-5 h-5" />
                        Order On WhatsApp
                      </a>
                    </Button>
                  </div>

                  {(design.heading || design.description) && (
                    <div className="rounded-xl bg-white shadow-card p-5">
                      <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                        {design.heading || "Description"}
                      </h2>
                      {design.description && (
                        <p className="font-body text-muted-foreground leading-relaxed">{design.description}</p>
                      )}
                      <h5 className="font-display text-xl font-semibold text-foreground mt-5 mb-2">Features ✨</h5>
                      <ul className="font-body text-md text-muted-foreground leading-relaxed">
                        <li>1080×1920 HD Resolution (Mobile Size)</li>
                        <li>Hand-Drawn Traditional Design</li>
                        <li>Clean Video (No Watermark)</li>
                        <li>Digitally Shared on WhatsApp</li>
                        <li>Customizable Templates</li>
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            </>
          )}
        </div>
      </main>
      {isPreviewOpen && hasGallery && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute right-5 top-5 h-10 w-10 rounded-full bg-card/90 border border-border flex items-center justify-center"
            onClick={() => setIsPreviewOpen(false)}
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 border border-border flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 border border-border flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <img
            src={activeImage}
            alt={design?.title || "Preview"}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain bg-card"
          />
        </div>
      )}
      <Footer />
      {/* <WhatsAppFloat /> */}
    </div>
  );
};

export default ProductDetails;
