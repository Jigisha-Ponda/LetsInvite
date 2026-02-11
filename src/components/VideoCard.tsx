import { MessageCircle, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface VideoCardProps {
  image: string;
  title: string;
  category: string;
  price?: string;
  whatsappMessage?: string;
  videoSrc?: string;
}

const VideoCard = ({ image, title, category, price, whatsappMessage, videoSrc }: VideoCardProps) => {
  const defaultMessage = `Hi! I'm interested in the "${title}" video invite design.`;
  const whatsappLink = `https://wa.me/918141721001?text=${encodeURIComponent(whatsappMessage || defaultMessage)}`;
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = Boolean(videoSrc);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [isPlaying]);

  return (
    <div className="group luxury-card overflow-hidden">
      {/* Video Preview Container */}
      <div className="relative aspect-[9/14] overflow-hidden bg-muted">
        {!isPlaying && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {hasVideo && isPlaying && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={image}
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
          />
        )}
        {/* Play Overlay */}
        {hasVideo && !isPlaying && (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            aria-label={`Play ${title}`}
          >
            <div className="w-16 h-16 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated">
              <Play className="w-6 h-6 text-primary ml-1" />
            </div>
          </button>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-body font-medium text-foreground border border-border">
            {category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-1">
          {title}
        </h3>
        {price && (
          <p className="font-body text-sm text-muted-foreground mb-3">
            Starting at <span className="text-primary font-semibold">{price}</span>
          </p>
        )}
        <Button variant="whatsapp" size="sm" className="w-full" asChild>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            Inquire Now
          </a>
        </Button>
      </div>
    </div>
  );
};

export default VideoCard;
