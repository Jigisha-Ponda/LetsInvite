import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajit Kothari & Rishta Panchani",
    location: "Mumbai",
    event: "Wedding",
    quote: "We appreciate the excellent work done on our wedding video and invitation card. He was very creative, cooperative and patient in understanding our requirements, as well as professional in his approach. The final output was well-executed and aligned perfectly with our expectations. We are happy with the overall experience.",
    rating: 5,
  },
  {
    name: "Birva",
    location: "Delhi",
    event: "Wedding",
    quote: "Great experience with Invyta. The design was creative, innovative and delivered with great attention to detail. The team was patient, understood the requirements well, and helped me achieve exactly the invitation we had in mind. 😊✨",
    rating: 5,
  },
  {
    name: "Kriti Vivek Mohata",
    location: "Bangalore",
    event: "Wedding",
    quote: "Just wanted to appreciate the invitation. We got a lot of positive feedback and everyone quite loved the use of AI in the invite. Thanks again for the creative invitation 😄",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by <span className="text-gold">Thousands</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real couples who made their celebrations extra special with Invyta.
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
              <p className="font-body text-foreground leading-relaxed mb-6 min-h-[205px]">
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
                  {/* {testimonial.location} • {testimonial.event} */}
                  {testimonial.event}
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
