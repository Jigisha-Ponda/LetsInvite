// import { useState } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import WhatsAppFloat from "../components/WhatsAppFloat";
// import { Button } from "../components/ui/button";
// import { MessageCircle, Sparkles, Film, Wand2, HeartHandshake, Zap, CheckCircle2 } from "lucide-react";
// import heroImage from "../assets/hero-wedding-bg.jpg";

// const journey = [
//   {
//     id: "concept",
//     year: "2023",
//     label: "Idea was born",
//     detail:
//       "We started with one goal: make invitation videos feel premium but easy to order for every family.",
//   },
//   {
//     id: "studio",
//     year: "2024",
//     label: "Creative studio setup",
//     detail:
//       "We built a designer-first workflow with reusable templates and motion systems for faster delivery.",
//   },
//   {
//     id: "scale",
//     year: "2025",
//     label: "AI + human pipeline",
//     detail:
//       "AI handles speed and variations, while our team controls storytelling, polish, and cultural details.",
//   },
//   {
//     id: "today",
//     year: "Today",
//     label: "Serving celebrations daily",
//     detail:
//       "From weddings to birthdays, we ship personalized invites that are designed to be shared instantly.",
//   },
// ];

// const promises = [
//   "Fully personalized with your names, details, and style",
//   "Fast turnaround with clear communication",
//   "Revisions before final delivery",
//   "Share-ready format for WhatsApp and social",
// ];

// const faqs = [
//   {
//     q: "How fast can we get our invite?",
//     a: "Most invites are delivered in 24-72 hours depending on complexity and revisions.",
//   },
//   {
//     q: "Can you design in regional languages?",
//     a: "Yes. We support multiple Indian languages and bilingual invite formats.",
//   },
//   {
//     q: "Do you make custom themes?",
//     a: "Yes. You can choose from existing styles or request a fully custom concept.",
//   },
// ];

// const AboutUs = () => {
//   const whatsappLink =
//     "https://wa.me/918141721001?text=Hi!%20I%27m%20interested%20in%20Invyta%20video%20invites.";
//   const [activeJourney, setActiveJourney] = useState(journey[0].id);
//   const currentJourney = journey.find((item) => item.id === activeJourney) ?? journey[0];

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="pt-16 lg:pt-20">
//         {/* Hero */}
//         <section className="relative overflow-hidden bg-cream py-16 lg:py-24">
//           <div className="absolute inset-0 opacity-15">
//             <img src={heroImage} alt="" className="h-full w-full object-cover" />
//           </div>
//           <div className="absolute inset-0 bg-gradient-luxury opacity-80" />
//           <div className="container mx-auto px-4 relative z-10">
//             <div className="mx-auto max-w-3xl text-center">
//               <div className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-4 py-2 text-sm font-body text-foreground shadow-soft">
//                 <Sparkles className="h-4 w-4 text-primary" />
//                 Invyta • AI Video Invitation Studio
//               </div>
//               <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
//                 About <span className="text-gold">Invyta</span>
//               </h1>
//               <p className="mt-6 font-body text-lg md:text-xl text-muted-foreground">
//                 We craft cinematic, personalized video invitations for life’s biggest celebrations.
//                 At Invyta, AI precision meets human creativity to deliver invites that feel warm,
//                 premium, and unforgettable.
//               </p>
//               <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
//                 <Button variant="hero" size="xl" asChild>
//                   <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
//                     <MessageCircle className="h-5 w-5" />
//                     Talk to Invyta
//                   </a>
//                 </Button>
//                 <Button variant="hero-outline" size="xl" asChild>
//                   <a href="/wedding">Explore Designs</a>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Story + Mission */}
//         <section className="bg-ivory py-14 lg:py-20">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
//               <div>
//                 <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
//                   Our Story
//                 </h2>
//                 <p className="mt-4 font-body text-muted-foreground">
//                   Invyta began with a simple belief: invitations should feel as special as the
//                   celebration itself. We blend design, storytelling, and motion to turn ordinary
//                   invites into beautiful keepsakes you’ll want to share.
//                 </p>
//                 <p className="mt-4 font-body text-muted-foreground">
//                   From weddings to birthdays and beyond, we help families express their joy with
//                   style and ease — delivered fast, tailored perfectly.
//                 </p>
//                 <div className="mt-6 rounded-2xl border border-border bg-card p-4">
//                   <p className="text-sm font-body text-muted-foreground mb-3">Journey timeline</p>
//                   <div className="flex flex-wrap gap-2">
//                     {journey.map((item) => (
//                       <button
//                         key={item.id}
//                         type="button"
//                         onClick={() => setActiveJourney(item.id)}
//                         className={`rounded-full px-3 py-1.5 text-xs font-body transition ${
//                           activeJourney === item.id
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
//                         }`}
//                       >
//                         {item.year}
//                       </button>
//                     ))}
//                   </div>
//                   <p className="mt-4 font-display text-lg text-foreground">{currentJourney.label}</p>
//                   <p className="mt-1 font-body text-sm text-muted-foreground">{currentJourney.detail}</p>
//                 </div>
//               </div>
//               <div className="rounded-3xl bg-card p-8 shadow-card">
//                 <h3 className="font-display text-2xl font-semibold text-foreground">Our Mission</h3>
//                 <p className="mt-3 font-body text-muted-foreground">
//                   Make premium, cinematic invites accessible to everyone — with smart automation,
//                   human creativity, and unmatched attention to detail.
//                 </p>
//                 <div className="mt-6 grid grid-cols-2 gap-4">
//                   <div className="rounded-2xl bg-cream p-4 text-center">
//                     <p className="font-display text-2xl font-bold text-primary">500+</p>
//                     <p className="text-xs font-body text-muted-foreground">Families served</p>
//                   </div>
//                   <div className="rounded-2xl bg-cream p-4 text-center">
//                     <p className="font-display text-2xl font-bold text-primary">24 hrs</p>
//                     <p className="text-xs font-body text-muted-foreground">Avg. delivery</p>
//                   </div>
//                   <div className="rounded-2xl bg-cream p-4 text-center">
//                     <p className="font-display text-2xl font-bold text-primary">4.9★</p>
//                     <p className="text-xs font-body text-muted-foreground">Client rating</p>
//                   </div>
//                   <div className="rounded-2xl bg-cream p-4 text-center">
//                     <p className="font-display text-2xl font-bold text-primary">100%</p>
//                     <p className="text-xs font-body text-muted-foreground">Customizable</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Values */}
//         <section className="bg-cream py-14 lg:py-20">
//           <div className="container mx-auto px-4">
//             <div className="text-center">
//               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
//                 What We Stand For
//               </h2>
//               <p className="mt-3 font-body text-muted-foreground">
//                 A premium experience built around creativity, care, and speed.
//               </p>
//             </div>
//             <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//               {[
//                 {
//                   title: "Cinematic Quality",
//                   icon: Film,
//                   desc: "Rich visuals, elegant motion, and sound design that feels like a movie.",
//                 },
//                 {
//                   title: "AI + Human Craft",
//                   icon: Wand2,
//                   desc: "AI for speed, designers for taste. The best of both worlds.",
//                 },
//                 {
//                   title: "Made With Care",
//                   icon: HeartHandshake,
//                   desc: "Every invite is treated like a memory, not just a file.",
//                 },
//                 {
//                   title: "Fast Delivery",
//                   icon: Zap,
//                   desc: "Quick turnarounds without compromising elegance.",
//                 },
//               ].map((item) => (
//                 <div key={item.title} className="luxury-card p-6">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
//                     <item.icon className="h-6 w-6" />
//                   </div>
//                   <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
//                     {item.title}
//                   </h3>
//                   <p className="mt-2 font-body text-sm text-muted-foreground">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Process */}
//         <section className="bg-ivory py-14 lg:py-20">
//           <div className="container mx-auto px-4">
//             <div className="text-center">
//               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
//                 How Invyta Works
//               </h2>
//               <p className="mt-3 font-body text-muted-foreground">
//                 Simple, guided, and fast — from idea to beautiful invite.
//               </p>
//             </div>
//             <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
//               {[
//                 {
//                   step: "01",
//                   title: "Share Your Details",
//                   text: "Event info, names, photos, and any preferences — we collect it all.",
//                 },
//                 {
//                   step: "02",
//                   title: "We Design & Animate",
//                   text: "Our team crafts a cinematic invite with music, motion, and polish.",
//                 },
//                 {
//                   step: "03",
//                   title: "Review & Celebrate",
//                   text: "You approve and share instantly on WhatsApp, Instagram, or email.",
//                 },
//               ].map((item) => (
//                 <div key={item.step} className="rounded-3xl border border-border bg-card p-6 shadow-card">
//                   <p className="font-display text-2xl font-bold text-gold">{item.step}</p>
//                   <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
//                     {item.title}
//                   </h3>
//                   <p className="mt-2 font-body text-sm text-muted-foreground">{item.text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Promise + FAQ */}
//         <section className="bg-cream py-14 lg:py-20">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
//                 <h3 className="font-display text-2xl font-semibold text-foreground">Our Promise</h3>
//                 <p className="mt-2 font-body text-sm text-muted-foreground">
//                   Everything you should expect when you work with Invyta.
//                 </p>
//                 <div className="mt-5 space-y-3">
//                   {promises.map((point) => (
//                     <div key={point} className="flex items-start gap-3 rounded-xl bg-cream p-3">
//                       <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
//                       <p className="font-body text-sm text-foreground">{point}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
//                 <h3 className="font-display text-2xl font-semibold text-foreground">FAQs</h3>
//                 <div className="mt-5 space-y-3">
//                   {faqs.map((item) => (
//                     <details key={item.q} className="group rounded-xl border border-border bg-cream p-4">
//                       <summary className="cursor-pointer list-none font-body text-sm font-semibold text-foreground">
//                         {item.q}
//                       </summary>
//                       <p className="mt-2 font-body text-sm text-muted-foreground">{item.a}</p>
//                     </details>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="bg-card py-12 lg:py-16 border-y border-border">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
//               Ready to create your invitation?
//             </h2>
//             <p className="font-body text-muted-foreground mb-6">
//               Talk to us and get a premium invite crafted in days, not weeks.
//             </p>
//             <Button variant="whatsapp" size="lg" asChild>
//               <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
//                 <MessageCircle className="h-5 w-5" />
//                 Request Custom Design
//               </a>
//             </Button>
//           </div>
//         </section>
//       </main>
//       <Footer />
//       {/* <WhatsAppFloat /> */}
//     </div>
//   );
// };

// export default AboutUs;


"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { Button } from "../components/ui/button";
import {
  MessageCircle,
  Sparkles,
  Film,
  Wand2,
  HeartHandshake,
  Zap,
  CheckCircle2,
} from "lucide-react";
import heroImage from "../assets/hero-wedding-bg.jpg";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

const journey = [
  {
    id: "concept",
    year: "2023",
    label: "Idea was born",
    detail:
      "We started with one goal: make invitation videos feel premium but easy to order for every family.",
  },
  {
    id: "studio",
    year: "2024",
    label: "Creative studio setup",
    detail:
      "We built a designer-first workflow with reusable templates and motion systems for faster delivery.",
  },
  {
    id: "scale",
    year: "2025",
    label: "AI + human pipeline",
    detail:
      "AI handles speed and variations, while our team controls storytelling, polish, and cultural details.",
  },
  {
    id: "today",
    year: "Today",
    label: "Serving celebrations daily",
    detail:
      "From weddings to birthdays, we ship personalized invites that are designed to be shared instantly.",
  },
];

const promises = [
  "Fully personalized with your names, details, and style",
  "Fast turnaround with clear communication",
  "Revisions before final delivery",
  "Share-ready format for WhatsApp and social",
];

const faqs = [
  {
    q: "How fast can we get our invite?",
    a: "Most invites are delivered in 24-72 hours depending on complexity and revisions.",
  },
  {
    q: "Can you design in regional languages?",
    a: "Yes. We support multiple Indian languages and bilingual invite formats.",
  },
  {
    q: "Do you make custom themes?",
    a: "Yes. You can choose from existing styles or request a fully custom concept.",
  },
];

const AboutUs = () => {
  const whatsappLink =
    "https://wa.me/918141721001?text=Hi!%20I%27m%20interested%20in%20Invyta%20video%20invites.";

  const [activeJourney, setActiveJourney] = useState(journey[0].id);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const currentJourney =
    journey.find((item) => item.id === activeJourney) ?? journey[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 lg:pt-20">
        {/* HERO */}
        <section className="relative overflow-hidden bg-secondary py-16 lg:py-24">
          <div className="absolute inset-0 opacity-15">
            <img
              src={heroImage}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-cream opacity-80" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-4 py-2 text-sm font-body text-foreground shadow-soft">
                <Sparkles className="h-4 w-4 text-primary" />
                Invyta • AI Video Invitation Studio
              </div>

              <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                About <span className="text-gold">Invyta</span>
              </h1>

              <p className="mt-6 font-body text-lg md:text-xl text-muted-foreground">
                We craft cinematic, personalized video invitations for life’s
                biggest celebrations. AI precision meets human creativity.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Talk to Invyta
                  </a>
                </Button>

                {/* <Button variant="hero-outline" size="xl" asChild>
                  <a href="/#featured">Explore Designs</a>
                </Button> */}
              </div>
            </motion.div>
          </div>
        </section>

        {/* STORY + MISSION */}
        <section className="bg-ivory py-14 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Our Story
                </h2>

                <p className="mt-4 font-body text-muted-foreground">
                  Invitations should feel as special as the celebration itself.
                  We blend storytelling, motion, and elegance.
                </p>

                <div className="mt-6 rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm font-body text-muted-foreground mb-3">
                    Journey timeline
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {journey.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveJourney(item.id)}
                        className={`rounded-full px-3 py-1.5 text-xs transition ${activeJourney === item.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {item.year}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentJourney.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mt-4 font-display text-lg text-foreground">
                        {currentJourney.label}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {currentJourney.detail}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* STATS */}
              <div className="rounded-3xl bg-card p-8 shadow-card">
                <h3 className="font-display text-2xl font-semibold">
                  Our Impact
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Stat end={500} label="Families served" suffix="+" />
                  <Stat end={24} label="Avg. delivery" suffix=" hrs" />
                  <Stat end={4.9} label="Client rating" suffix="★" />
                  <Stat end={100} label="Customizable" suffix="%" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-cream py-14 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Cinematic Quality",
                  icon: Film,
                  desc: "Rich visuals & elegant motion.",
                },
                {
                  title: "AI + Human Craft",
                  icon: Wand2,
                  desc: "Speed meets creative control.",
                },
                {
                  title: "Made With Care",
                  icon: HeartHandshake,
                  desc: "We treat every invite like memory.",
                },
                {
                  title: "Fast Delivery",
                  icon: Zap,
                  desc: "Quick turnarounds, premium feel.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -8 }}
                  className="luxury-card p-6 transition"
                >
                  <item.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ivory py-14 lg:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="mb-4 rounded-xl border p-4 cursor-pointer"
                onClick={() =>
                  setOpenFAQ(openFAQ === item.q ? null : item.q)
                }
              >
                <h4 className="flex justify-between font-semibold">
                  {item.q}
                  <span>{openFAQ === item.q ? "-" : "+"}</span>
                </h4>

                <AnimatePresence>
                  {openFAQ === item.q && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 text-sm text-muted-foreground"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      {/* <WhatsAppFloat /> */}
    </div>
  );
};

const Stat = ({ end, label, suffix = "" }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="rounded-2xl bg-secondary p-4 text-center">
      <p className="text-2xl font-bold text-primary">
        {isInView ? <CountUp end={end} duration={2} /> : 0}
        {suffix}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};


export default AboutUs;
