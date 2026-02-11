import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "./ui/carousel";
import { Button } from "./ui/button";

import weddingImage from "../assets/wedding-invite-1.jpg";
import saveTheDateImage from "../assets/save-the-date-1.jpg";
import engagementImage from "../assets/engagement-1.jpg";
import birthdayImage from "../assets/birthda-1.jpg";
import heroWeddingImage from "../assets/hero-wedding-bg.jpg";

import ringCeremony from "../assets/ring_ceremony.png";
import anniversaryInvitation from "../assets/anniversary_party_invitation.png";
import babyShowerInvitation from "../assets/baby_shower_invitation.png";
import birthdayInvitation from "../assets/birthday_party_invitation.png";
import digitalWeddingInvitation from "../assets/digital_wedding_invitation.png";
import poojaInvitation from "../assets/pooja_invitation.png";

import party from "../assets/party.jpeg";
import birthday1 from "../assets/birthday1.png";
import birthday2 from "../assets/birthday2.png";
import birthday3 from "../assets/birthday3.png";
import birthday4 from "../assets/birthday4.png";
import birthday5 from "../assets/birthday5.png";

const baseSlides = [
  weddingImage,
  engagementImage,
  birthdayImage,
  saveTheDateImage,
  heroWeddingImage,
];

const tabs = [
  {
    key: "engagement",
    label: "Engagement & Ring Ceremony",
    icon: ringCeremony,
    title: "Engagement & Ring Ceremony",
    highlight: "Invitation",
    href: "/engagement",
    slides: [engagementImage, weddingImage, heroWeddingImage, saveTheDateImage, birthdayImage],
  },
  {
    key: "birthday",
    label: "Birthday Party Invitation",
    icon: birthdayInvitation,
    title: "Birthday Party",
    highlight: "Invitation",
    href: "/birthday",
    slides: [birthday1, birthday2, birthday3, birthday4, birthday5],
  },
  {
    key: "anniversary",
    label: "Anniversary Party Invitation",
    icon: anniversaryInvitation,
    title: "Anniversary Party",
    highlight: "Invitation",
    href: "/wedding",
    slides: [party, heroWeddingImage, saveTheDateImage, weddingImage, engagementImage],
  },
  {
    key: "digital-wedding",
    label: "Digital Wedding Invitation",
    icon: digitalWeddingInvitation,
    title: "Digital Wedding",
    highlight: "Invitation",
    href: "/wedding",
    slides: [weddingImage, saveTheDateImage, engagementImage, heroWeddingImage, weddingImage],
  },
  {
    key: "pooja",
    label: "Pooja/Path Invitation",
    icon: poojaInvitation,
    title: "Pooja/Path",
    highlight: "Invitation",
    href: "/wedding",
    slides: baseSlides,
  },
  {
    key: "baby-shower",
    label: "Baby Shower Invitation",
    icon: babyShowerInvitation,
    title: "Baby Shower",
    highlight: "Invitation",
    href: "/birthday",
    slides: baseSlides,
  },
];

const TabsCarouselSection = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [activeTab, setActiveTab] = useState(tabs[1].key);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const current = useMemo(() => tabs.find((tab) => tab.key === activeTab) ?? tabs[0], [activeTab]);
  const currentTabIndex = useMemo(
    () => tabs.findIndex((tab) => tab.key === activeTab),
    [activeTab],
  );

  const goPrevTab = () => {
    const nextIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[nextIndex].key);
    setSelectedIndex(0);
  };

  const goNextTab = () => {
    const nextIndex = (currentTabIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex].key);
    setSelectedIndex(0);
  };

  const getOffsetPercent = (index: number, length: number, active: number) => {
    if (length === 0) return 0;
    const raw = (index - active + length) % length;
    const pos = raw > length / 2 ? raw - length : raw; // center around active
    const distance = Math.abs(pos);
    if (distance === 0) return 0;
    if (distance === 1) return 0;
    return 0;
  };

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, current.key]);

  return (
    <section id="tabs-carousel" className="relative py-16 lg:py-24 bg-ivory overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-40 opacity-10"
        // style={{
        //   backgroundImage:
        //     "radial-gradient(circle at 20% 30%, hsl(38 72% 50% / 0.5) 0, transparent 60%), radial-gradient(circle at 40% 70%, hsl(350 60% 75% / 0.4) 0, transparent 55%)",
        // }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap items-start justify-center gap-6 md:gap-8">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`group flex flex-col items-center gap-2 text-sm font-body transition-all ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition-all ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary shadow-soft"
                      : "border-border bg-card text-foreground group-hover:border-primary/40"
                  }`}
                >
                  <img
                    src={tab.icon}
                    alt=""
                    className="h-9 w-9 object-contain"
                    loading="lazy"
                  />
                </span>
                <span className="max-w-[130px] text-center text-xs font-medium leading-snug">
                  {tab.label}
                </span>
                <span
                  className={`h-0.5 w-10 rounded-full transition-opacity ${
                    isActive ? "bg-primary opacity-100" : "bg-primary/50 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrevTab}
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition hover:bg-primary/10"
              aria-label="Previous"
            >
              <span className="text-lg">‹</span>
            </button>
            <div className="flex items-center gap-3">
              {/* <span className="h-px w-14 bg-primary/30" /> */}
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {current.title} <span className="text-gold">{current.highlight}</span>
              </h3>
              {/* <span className="h-px w-14 bg-primary/30" /> */}
            </div>
            <button
              type="button"
              onClick={goNextTab}
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition hover:bg-primary/10"
              aria-label="Next"
            >
              <span className="text-lg">›</span>
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-primary">
            <span className="h-px w-20 bg-primary/30" />
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
            </svg>
            <span className="h-px w-20 bg-primary/30" />
          </div>
          {/* <p className="mt-3 font-body text-sm text-muted-foreground">
            Curated picks from our most-loved designs
          </p> */}
        </div>

        <div className="mt-10">
          <Carousel
            setApi={setApi}
            opts={{ align: "center", containScroll: "trimSnaps", loop: true }}
            className="relative"
          >
          <CarouselContent className="py-6 md:py-8">
            {current.slides.map((image, index) => (
              <CarouselItem
                key={`${current.key}-${index}`}
                className="basis-1/2 sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
              >
                  <div
                    className={`group rounded-2xl overflow-hidden bg-card transition-all duration-500 ${
                      index === selectedIndex
                        ? "shadow-elevated scale-105"
                        : "shadow-card opacity-80 hover:opacity-100"
                    }`}
                    style={{
                      position: "relative",
                      top: `${getOffsetPercent(index, current.slides.length, selectedIndex)}%`,
                      transform: "scale(1)",
                    }}
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={image}
                        alt={`${current.title} design ${index + 1}`}
                        className="h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="gold" size="lg" asChild>
            <Link to={current.href}>View All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TabsCarouselSection;
