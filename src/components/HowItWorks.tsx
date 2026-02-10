import { Search, SlidersHorizontal } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Design",
    description: "Browse our collection and pick the perfect video invite style for your celebration.",
    icon: Search,
  },
  {
    number: "02",
    title: "Share Details on WhatsApp",
    description: "Send us your event details, photos, and preferences via WhatsApp. It's that simple!",
    icon: SlidersHorizontal,
  },
  {
    number: "03",
    title: "AI + Designers Create Magic",
    description: "Our AI generates the video while expert designers perfect every detail for you.",
    icon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Preview & Receive",
    description: "Review your video invite, request edits if needed, and receive the final masterpiece.",
    icon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-gold">Works</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your dream video invite is easier than you think. Just 4 simple steps to your perfect invitation.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Number Circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-display text-xl font-bold mb-6 shadow-md z-10">
                  {step.number}
                </div>
                
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
