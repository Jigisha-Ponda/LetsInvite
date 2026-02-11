import { Sparkles, Zap, Clock, Palette } from "lucide-react";

const AISection = () => {
  return (
    <section id="ai-section" className="py-16 lg:py-24 bg-secondary overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">
                Powered by AI
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6 leading-tight">
              AI Smart Invites — 
              <span className="text-primary"> The Future of Invitations</span>
            </h2>

            <p className="font-body text-lg text-secondary-foreground/80 mb-8 leading-relaxed">
              Our AI technology analyzes your preferences and creates stunning video invitations in record time. 
              Combined with our expert designers' touch, you get the perfect blend of speed and artistry.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Zap, title: "Lightning Fast", desc: "24-48 hour delivery" },
                { icon: Palette, title: "Fully Custom", desc: "Tailored to your style" },
                { icon: Clock, title: "Quick Edits", desc: "Fast revision turnaround" },
                { icon: Sparkles, title: "Premium Quality", desc: "HD cinematic videos" },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-secondary-foreground">
                      {feature.title}
                    </h4>
                    <p className="font-body text-sm text-secondary-foreground/70">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative flex justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Animated Circles */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
              <div className="absolute inset-8 rounded-full border-2 border-primary/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-16 rounded-full border-2 border-primary/40 animate-pulse" style={{ animationDelay: "1s" }} />
              
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow animate-float">
                  <Sparkles className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-8 p-3 rounded-lg bg-card shadow-card animate-float" style={{ animationDelay: "0.5s" }}>
                <span className="font-body text-sm font-medium text-foreground">AI Generated</span>
              </div>
              <div className="absolute bottom-12 left-0 p-3 rounded-lg bg-card shadow-card animate-float" style={{ animationDelay: "1s" }}>
                <span className="font-body text-sm font-medium text-foreground">4K Quality</span>
              </div>
              <div className="absolute bottom-4 right-0 p-3 rounded-lg bg-card shadow-card animate-float" style={{ animationDelay: "1.5s" }}>
                <span className="font-body text-sm font-medium text-foreground">24hr Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
