import { MessageCircle, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface VideoCardProps {
  id?: string;
  image: string;
  title: string;
  category: string;
  price?: string;
  whatsappMessage?: string;
  videoSrc?: string;
}

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
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&playsinline=1&rel=0`;
    }
  }
  return null;
};

const VideoCard = ({ id, image, title, category, price, whatsappMessage, videoSrc }: VideoCardProps) => {
  const defaultMessage = `Hi! I'm interested in the "${title}" video invite design.`;
  const baseMessage = whatsappMessage?.trim() || defaultMessage;
  const messageWithVideo = videoSrc ? `${baseMessage}\n\nVideo link: ${videoSrc}` : baseMessage;
  const whatsappLink = `https://wa.me/918141721001?text=${encodeURIComponent(messageWithVideo)}`;
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = Boolean(videoSrc);
  const youtubeEmbedUrl = toYouTubeEmbedUrl(videoSrc);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPlaying) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => { });
  }, [isPlaying]);

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!id) return;
    const target = event.target as HTMLElement;
    if (target.closest("button, a, video, iframe")) return;
    navigate(`/design/${id}`);
  };

  return (
    <div
      className={`group luxury-card overflow-hidden ${id ? "cursor-pointer" : ""}`}
      onClick={handleCardClick}
      role={id ? "button" : undefined}
      tabIndex={id ? 0 : undefined}
      onKeyDown={
        id
          ? (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              navigate(`/design/${id}`);
            }
          }
          : undefined
      }
    >
      {/* Video Preview Container */}
      <div className="relative aspect-[9/14] overflow-hidden bg-muted">
        {!isPlaying && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {hasVideo && isPlaying &&
          (youtubeEmbedUrl ? (
            <iframe
              className="h-full w-full"
              src={youtubeEmbedUrl}
              title={title}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
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
          ))}
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
      <div className="p-4 bg-white">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-1">
          {title}
        </h3>
        {price && (
          <p className="font-body text-sm text-muted-foreground mb-3">
            Starting at <span className="text-primary font-semibold">{price}</span>
          </p>
        )}
        <Button variant="whatsapp" size="sm" className="w-full bg-[linear-gradient(110deg,hsl(240,60%,36%)_0%,hsl(232,66%,40%)_30%,hsl(222,72%,46%)_65%,hsl(212,82%,54%)_100%)] 
 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5" asChild>
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
