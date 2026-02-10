import VideoCard from "./VideoCard";
import weddingImage from "../assets/wedding-invite-1.jpg";
import saveTheDateImage from "../assets/save-the-date-1.jpg";
import engagementImage from "../assets/engagement-1.jpg";
import birthdayImage from "../assets/birthda-1.jpg";

const featuredDesigns = [
  {
    image: weddingImage,
    title: "Royal Wedding Elegance",
    category: "Wedding",
    price: "₹2,999",
  },
  {
    image: saveTheDateImage,
    title: "Romantic Save The Date",
    category: "Save The Date",
    price: "₹1,999",
  },
  {
    image: engagementImage,
    title: "Golden Ring Ceremony",
    category: "Engagement",
    price: "₹2,499",
  },
  {
    image: birthdayImage,
    title: "Sparkling Birthday Bash",
    category: "Birthday",
    price: "₹1,499",
  },
];

const FeaturedDesigns = () => {
  return (
    <section id="featured" className="py-16 lg:py-24 bg-ivory">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDesigns.map((design, index) => (
            <div
              key={design.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <VideoCard {...design} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;
