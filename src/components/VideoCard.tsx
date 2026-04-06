import { MessageCircle, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface VideoCardProps {
  id?: string;
  image: string;
  title: string;
  category: string;
  price?: string;
  whatsappMessage?: string;
  videoSrc?: string;
  vercelLink?: string;
  forceWebsiteInvitesUi?: boolean;
}

// const toYouTubeEmbedUrl = (url?: string) => {
//   if (!url) return null;
//   const patterns = [
//     /youtube\.com\/watch\?v=([^?&/]+)/,
//     /youtube\.com\/shorts\/([^?&/]+)/,
//     /youtu\.be\/([^?&/]+)/,
//     /youtube\.com\/embed\/([^?&/]+)/,
//   ];

//   for (const pattern of patterns) {
//     const match = url.match(pattern);
//     if (match?.[1]) {
//       return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&playsinline=1&rel=0`;
//     }
//   }
//   return null;
// };

const resolveImageUrl = (url?: string) => {
  if (!url) return "";

  // Supabase public URL
  if (url.includes("supabase.co")) return url;

  // If already thumbnail format
  if (url.includes("drive.google.com/thumbnail")) return url;

  // Convert ANY Drive link
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match?.[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }

  return url;
};



const toYouTubeEmbedUrl = (url?: string) => {
  if (!url) return null;

  // If already a clean video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return `https://www.youtube.com/embed/${url}?autoplay=1&mute=1&playsinline=1&rel=0`;
  }

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

const toYouTubeShareUrl = (url?: string) => {
  if (!url) return null;

  // If already a full URL, keep as-is
  if (/^https?:\/\//i.test(url)) return url;

  // If already a clean video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return `https://www.youtube.com/shorts/${url}`;
  }

  const patterns = [
    /youtube\.com\/watch\?v=([^?&/]+)/,
    /youtube\.com\/shorts\/([^?&/]+)/,
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/shorts/${match[1]}`;
    }
  }

  return url;
};

const toDriveEmbedUrl = (url?: string) => {
  if (!url) return null;

  // If already preview format
  if (url.includes("drive.google.com/file") && url.includes("/preview")) {
    return url;
  }

  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match?.[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }

  return null;
};



const VideoCard = ({
  id,
  image,
  title,
  category,
  price,
  whatsappMessage,
  videoSrc,
  vercelLink,
  forceWebsiteInvitesUi,
}: VideoCardProps) => {
  const defaultMessage = `Hi! I'm interested in the "${title}" video invite design.`;
  const baseMessage = whatsappMessage?.trim() || defaultMessage;
  const videoLinkForMessage = toYouTubeShareUrl(videoSrc) || videoSrc;
  const messageWithVideo = videoSrc ? `${baseMessage}\n\nVideo link: ${videoLinkForMessage}` : baseMessage;
  const whatsappLink = `https://wa.me/918487908430?text=${encodeURIComponent(messageWithVideo)}`;
  const youtubeShareUrl = toYouTubeShareUrl(videoSrc);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageSrc, setImageSrc] = useState(resolveImageUrl(image) || "/placeholder.svg");
  const [imageFailed, setImageFailed] = useState(false);
  const hasVideo = Boolean(videoSrc);
  const youtubeEmbedUrl = toYouTubeEmbedUrl(videoSrc);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const driveEmbedUrl = toDriveEmbedUrl(videoSrc);
  const isWebsiteInviteCategory = (category || "").toLowerCase().includes("website invite");
  const isWebsiteInvites =
    typeof forceWebsiteInvitesUi === "boolean"
      ? forceWebsiteInvitesUi
      : location.pathname === "/website-invites" || isWebsiteInviteCategory;
  const allowVideoPlayback = !isWebsiteInvites;

  useEffect(() => {
    if (!isPlaying) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => { });
  }, [isPlaying]);

  useEffect(() => {
    setImageSrc(resolveImageUrl(image) || "/placeholder.svg");
    setImageFailed(false);
  }, [image]);

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
      <div className="relative aspect-[9/13.5] overflow-hidden bg-white">
        {!isPlaying && !imageFailed && (
          <img
            src={imageSrc}
            alt={title}
            onError={() => {
              if (imageSrc !== "/placeholder.svg") {
                setImageSrc("/placeholder.svg");
                return;
              }
              setImageFailed(true);
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {!isPlaying && imageFailed && (
          <div className="h-full w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 flex items-center justify-center text-center px-4">
            <p className="text-sm font-medium text-slate-500">Preview not available</p>
          </div>
        )}
        {hasVideo && allowVideoPlayback && isPlaying &&
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
          ) : driveEmbedUrl ? (
            <iframe
              className="h-full w-full"
              src={driveEmbedUrl}
              title={title}
              allow="autoplay"
              allowFullScreen
            />
          )
            : (
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
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
        {hasVideo && allowVideoPlayback && !isPlaying && (
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
        <div className="absolute top-3 left-3 right-3 flex justify-start">
          <span className="max-w-full px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-[11px] font-body font-medium text-foreground border border-border truncate">
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
        {isWebsiteInvites ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {vercelLink ? (
              <Button variant="outline" size="sm" className="w-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 border" asChild>
                <a href={vercelLink} target="_blank" rel="noopener noreferrer">
                  Have a look
                </a>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  if (!id) return;
                  navigate(`/design/${id}`);
                }}
              >
                Have a look
              </Button>
            )}
            <Button variant="whatsapp" size="sm" className="w-full" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Order
              </a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="whatsapp"
              size="sm"
              className="w-full bg-[linear-gradient(110deg,hsl(240,60%,36%)_0%,hsl(232,66%,40%)_30%,hsl(222,72%,46%)_65%,hsl(212,82%,54%)_100%)] 
 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Inquire Now
              </a>
            </Button>
            {/* {youtubeShareUrl && (
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href={youtubeShareUrl} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
              </Button>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
