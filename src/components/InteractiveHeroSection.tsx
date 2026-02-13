import { useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import weddingImage from "../assets/wedding-invite-1.jpg";
import birthdayImage from "../assets/birthda-1.jpg";
import engagementImage from "../assets/engagement-1.jpg";
import saveTheDateImage from "../assets/save-the-date-1.jpg";
import welcomePartyImage from "../assets/welcome-party.jpg";
import genderRevealImage from "../assets/gender_reveal.png";
import babyShower from "../assets/baby_shower.jpg";

const occasionOptions = [
  {
  key: "birthday",
  label: "Birthday",
  title: "Vibrant Birthday Invites That Spark Joy",
  subtitle:
    "Colorful, energetic, and fully personalized digital invites for kids, teens, and milestone birthdays.",
  image: birthdayImage,
  metric: "Most loved",
},
{
  key: "baby-shower",
  label: "Baby Shower",
  title: "Adorable Baby Shower Invites Full of Warmth",
  subtitle:
    "Sweet, elegant, and heart-melting designs to celebrate your little bundle of joy.",
  image: babyShower,
  metric: "Top picks",
},
{
  key: "gender-reveal",
  label: "Gender Reveal",
  title: "Exciting Gender Reveal Invites with a Twist",
  subtitle:
    "Fun, suspense-filled digital invites that build excitement before the big reveal moment.",
  image: genderRevealImage,
  metric: "Trending",
},
{
  key: "welcome-party",
  label: "Welcome Party",
  title: "Charming Welcome Party Invitations in Style",
  subtitle:
    "Fresh, modern, and share-ready invites to warmly welcome your loved ones or little star.",
  image: welcomePartyImage,
  metric: "Fast delivery",
},
];

const InteractiveHeroSection = () => {
  const [activeKey, setActiveKey] = useState(occasionOptions[0].key);
  const activeOccasion = useMemo(
    () => occasionOptions.find((item) => item.key === activeKey) ?? occasionOptions[0],
    [activeKey],
  );

  return (
    <section className="relative overflow-hidden pt-20 min-h-screen flex items-center">
      <img
        key={activeOccasion.key}
        src={activeOccasion.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover animate-fade-in"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/70" />
      <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-body text-white shadow-soft backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-gold" />
              Built for modern celebrations
            </div>

            <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white animate-fade-in">
              {activeOccasion.title}
            </h1>
            <p className="mt-4 font-body text-lg text-white/85 max-w-2xl mx-auto lg:mx-0">
              {activeOccasion.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3">
              {occasionOptions.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveKey(item.key)}
                  className={`rounded-full px-4 py-2 text-sm font-body transition-all ${
                    activeKey === item.key
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-white/15 text-white border border-white/25 hover:bg-white/25"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" asChild>
                <a href="#tabs-carousel">
                  Explore Designs
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <a href="#featured">View Featured</a>
              </Button>
            </div>
          </div>

          {/* <div className="relative animate-scale-in">
            <div className="rounded-3xl border border-white/25 bg-white/10 backdrop-blur-md p-3 shadow-elevated">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={activeOccasion.image}
                  alt={`${activeOccasion.label} invitation preview`}
                  className="w-full aspect-[4/5] object-cover transition-all duration-500"
                />
                <div className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-body text-white border border-white/20">
                  {activeOccasion.metric}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/90 p-3 text-center">
                  <p className="font-display text-lg font-bold text-primary">500+</p>
                  <p className="font-body text-[11px] text-muted-foreground">Orders</p>
                </div>
                <div className="rounded-xl bg-white/90 p-3 text-center">
                  <p className="font-display text-lg font-bold text-primary">4.9★</p>
                  <p className="font-body text-[11px] text-muted-foreground">Rating</p>
                </div>
                <div className="rounded-xl bg-white/90 p-3 text-center">
                  <p className="font-display text-lg font-bold text-primary">24h</p>
                  <p className="font-body text-[11px] text-muted-foreground">Avg delivery</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default InteractiveHeroSection;
