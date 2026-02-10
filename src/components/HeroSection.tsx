import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-wedding-bg.jpg";

const HeroSection = () => {
  const whatsappLink = "https://wa.me/919999999999?text=Hi!%20I%27m%20interested%20in%20your%20AI%20video%20invites.";

  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-luxury opacity-50" />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8860b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">
                AI-Powered Video Invites
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in stagger-1">
              India's Best <span className="text-gold">AI Video Invites</span> for Weddings & Celebrations
            </h1>

            {/* Subtext */}
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in stagger-2">
              Fully custom, cinematic, and modern video invitations. A smarter way to invite your loved ones to celebrate.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in stagger-3">
              <Button variant="hero" size="xl" asChild>
                <Link to="/wedding">
                  Explore Video Invites
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Order on WhatsApp
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 animate-fade-in stagger-4">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">500+</p>
                <p className="font-body text-xs text-muted-foreground">Happy Couples</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">4.9★</p>
                <p className="font-body text-xs text-muted-foreground">Client Rating</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">24hrs</p>
                <p className="font-body text-xs text-muted-foreground">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Content - Video Preview */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-2xl" />
              
              {/* Video Container */}
              <div className="relative w-64 md:w-72 lg:w-80 video-preview animate-scale-in shadow-glow">
                <img
                  src={heroImage}
                  alt="Wedding Video Invite Preview"
                  className="w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-elevated animate-float cursor-pointer hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-2" />
                  </div>
                </div>
                {/* Label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                    <p className="font-body text-xs text-muted-foreground">Featured Design</p>
                    <p className="font-display text-sm font-semibold text-foreground">Royal Wedding Invite</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
