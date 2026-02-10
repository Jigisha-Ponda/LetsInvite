import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import weddingImage from "../assets/wedding-invite-1.jpg";
import saveTheDateImage from "../assets/save-the-date-1.jpg";
import engagementImage from "../assets/engagement-1.jpg";
import birthdayImage from "../assets/birthda-1.jpg";

const categories = [
  {
    title: "Wedding Video Invites",
    description: "Cinematic invitations for your special day",
    image: weddingImage,
    href: "/wedding",
    count: "50+ Designs",
  },
  {
    title: "Save The Date",
    description: "Elegant announcements to mark the calendar",
    image: saveTheDateImage,
    href: "/save-the-date",
    count: "30+ Designs",
  },
  {
    title: "Engagement / Ring Ceremony",
    description: "Celebrate your promise of forever",
    image: engagementImage,
    href: "/engagement",
    count: "25+ Designs",
  },
  {
    title: "Birthday Video Invites",
    description: "Fun & memorable party invitations",
    image: birthdayImage,
    href: "/birthday",
    count: "40+ Designs",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Explore Our <span className="text-gold">Collections</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect video invite for every celebration. Each design crafted with AI precision and human creativity.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.href}
              className="group luxury-card overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                  <span className="inline-block px-2 py-1 rounded-full bg-primary/90 text-xs font-body font-medium mb-2">
                    {category.count}
                  </span>
                  <h3 className="font-display text-xl font-bold mb-1">
                    {category.title}
                  </h3>
                  <p className="font-body text-sm opacity-90 mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 font-body text-sm font-medium group-hover:gap-3 transition-all">
                    View Collection
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
