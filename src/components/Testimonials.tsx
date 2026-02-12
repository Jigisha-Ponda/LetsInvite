import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya & Arjun",
    location: "Mumbai",
    event: "Wedding",
    quote: "Our wedding invite video was absolutely stunning! Everyone kept asking how we got such a cinematic video made. Let's Invite made our special day even more memorable.",
    rating: 5,
  },
  {
    name: "Sneha Sharma",
    location: "Delhi",
    event: "Birthday Party",
    quote: "Ordered a birthday invite for my daughter's first birthday. The video was so beautiful that guests were emotional watching it. Highly recommend!",
    rating: 5,
  },
  {
    name: "Rahul & Neha",
    location: "Bangalore",
    event: "Engagement",
    quote: "The AI-powered customization is incredible. They understood exactly what we wanted and delivered beyond our expectations. Worth every rupee!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by <span className="text-gold">Thousands</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real couples who made their celebrations extra special with Let's Invite.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="luxury-card p-6 lg:p-8 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-primary" />
              </div>

              {/* Quote */}
              <p className="font-body text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Author */}
              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  {testimonial.location} • {testimonial.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
