import { MessageCircle, Play } from "lucide-react";
import { Button } from "./ui/button";

interface VideoCardProps {
  image: string;
  title: string;
  category: string;
  price?: string;
  whatsappMessage?: string;
}

const VideoCard = ({ image, title, category, price, whatsappMessage }: VideoCardProps) => {
  const defaultMessage = `Hi! I'm interested in the "${title}" video invite design.`;
  const whatsappLink = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappMessage || defaultMessage)}`;

  return (
    <div className="group luxury-card overflow-hidden">
      {/* Video Preview Container */}
      <div className="relative aspect-[9/16] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated">
            <Play className="w-6 h-6 text-primary ml-1" />
          </div>
        </div>
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
