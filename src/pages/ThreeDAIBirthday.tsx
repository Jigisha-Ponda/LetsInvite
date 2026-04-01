import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import {
  Box,
  Cpu,
  Film,
  MessageCircle,
  Sparkles,
  Wand2,
} from "lucide-react";
import heroBg from "../assets/BannerBG.webp";

const ThreeDAIBirthday = () => {
  const whatsappLink =
    "https://wa.me/918487908430?text=Hi!%20I%27m%20interested%20in%203D%20AI%20Birthday%20Video%20Invites.";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[radial-gradient(70%_60%_at_70%_10%,rgba(65,97,239,0.22),transparent),radial-gradient(70%_60%_at_0%_20%,rgba(255,166,96,0.18),transparent)]">
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-white/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
              <div className="text-center lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1 text-xs font-semibold tracking-wide text-primary">
                  <Cpu className="h-4 w-4" />
                  3D AI Birthday Video Invites
                </p>
                <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  A cinematic 3D invite that feels larger than life
                </h1>
                <p className="font-body text-lg md:text-xl text-muted-foreground mt-4">
                  AI-crafted visuals, custom themes, and dynamic motion designed to wow guests
                  instantly.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-foreground">
                  {[
                    { label: "3D depth + motion", Icon: Box },
                    { label: "AI-enhanced visuals", Icon: Sparkles },
                    { label: "Custom theme", Icon: Wand2 },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 shadow-sm"
                    >
                      <item.Icon className="h-3.5 w-3.5 text-primary" />
                      {item.label}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
                  <Button variant="hero" size="xl" asChild>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5" />
                      Order on WhatsApp
                    </a>
                  </Button>
                  <Button variant="hero-outline" size="xl" asChild>
                    <a href="#preview">See a Sample</a>
                  </Button>
                </div>
              </div>
              <div className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-md shadow-[0_50px_120px_-80px_rgba(0,0,0,0.55)] p-6">
                <div className="rounded-2xl border border-border/70 bg-white p-6 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    What makes it 3D AI
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
                    Layered scenes, depth, and camera motion
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    We blend AI-enhanced assets, parallax motion, and clean typography for a
                    premium, cinematic feel.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-xl border border-border/80 bg-secondary p-4 text-center">
                      <p className="font-semibold text-foreground">HD Render</p>
                      <p className="text-xs text-muted-foreground">Crisp details</p>
                    </div>
                    <div className="rounded-xl border border-border/80 bg-secondary p-4 text-center">
                      <p className="font-semibold text-foreground">24–48 Hrs</p>
                      <p className="text-xs text-muted-foreground">Typical delivery</p>
                    </div>
                  </div>
                  <div className="mt-5 pt-5 border-t border-border/60 text-xs text-muted-foreground">
                    Includes name, age, date, venue, and RSVP details.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                Features
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Why 3D AI invites feel premium
              </h2>
              <p className="font-body text-muted-foreground mt-3">
                Layered depth, cinematic lighting, and custom motion that stand out instantly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "3D Depth Layers",
                  copy: "Objects and text with real depth for a cinematic look.",
                },
                {
                  title: "AI Art Direction",
                  copy: "Unique visuals shaped around your theme and vibe.",
                },
                {
                  title: "Sound-Ready",
                  copy: "We align the motion beats with your chosen music.",
                },
                {
                  title: "Share-Optimized",
                  copy: "Perfect playback on WhatsApp, Insta, and SMS.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-white p-6 shadow-[0_22px_60px_-48px_rgba(0,0,0,0.4)]"
                >
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-2">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                How It Works
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Simple steps to a 3D invite
              </h2>
              <p className="font-body text-muted-foreground mt-3">
                We craft everything — you just share the details.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Share the vibe",
                  copy: "Tell us the theme, colors, and mood you want.",
                },
                {
                  step: "02",
                  title: "Send details",
                  copy: "Name, age, date, venue, and photos (if any).",
                },
                {
                  step: "03",
                  title: "Get the final video",
                  copy: "We deliver a share-ready 3D invite in 24–48 hours.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-border/70 bg-secondary p-6 shadow-[0_22px_60px_-48px_rgba(0,0,0,0.4)]"
                >
                  <p className="font-display text-2xl font-bold text-primary">{item.step}</p>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-2">{item.copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Start on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                FAQ
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Quick Answers
              </h2>
              <p className="font-body text-muted-foreground mt-3">
                Everything you need before ordering.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "Is this different from normal video invites?",
                  a: "Yes, 3D AI invites use layered depth, motion, and AI-enhanced visuals for a premium look.",
                },
                {
                  q: "How fast can I get it?",
                  a: "Most 3D invites are delivered within 24–48 hours.",
                },
                {
                  q: "Can I choose the theme?",
                  a: "Absolutely — tell us your theme, colors, and vibe.",
                },
                {
                  q: "Where can I share it?",
                  a: "WhatsApp, Instagram, SMS — it is optimized for all.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-border/70 bg-white px-6 py-4 shadow-[0_22px_60px_-48px_rgba(0,0,0,0.4)]"
                >
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.q}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-2">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16 bg-white border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Make your birthday invite feel cinematic
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Custom-designed 3D AI video invites tailored to your celebration.
            </p>
            <Button variant="whatsapp" size="lg" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Request 3D AI Invite
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThreeDAIBirthday;
