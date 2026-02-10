import { Sparkles, Heart, Film, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI + Human Creativity",
    description: "Our AI generates stunning visuals while expert designers add the personal touch that makes your invite unique.",
  },
  {
    icon: Heart,
    title: "100% Custom Made",
    description: "Every video is crafted specifically for your celebration with your details, photos, and personal style.",
  },
  {
    icon: Film,
    title: "Cinematic Video Quality",
    description: "Professional-grade 4K videos with smooth animations, beautiful transitions, and stunning effects.",
  },
  {
    icon: MessageCircle,
    title: "Simple WhatsApp Ordering",
    description: "No complex forms or accounts. Just message us on WhatsApp and we'll handle the rest.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-ivory">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-gold">Let's Invite</span>?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine cutting-edge AI technology with human artistry to create invitations that truly stand out.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
