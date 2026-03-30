import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, Phone } from "lucide-react";
import logoIcon from "../assets/logofinal.png";

const Footer = () => {
  const whatsappLink = "https://wa.me/918487908430?text=Hi!%20I%27m%20interested%20in%20your%20AI%20video%20invites.";

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              {/* <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-display text-xl font-bold text-foreground">
                Inv<span className="text-gold">yta</span>
              </span> */}
              <img
                src={logoIcon}
                alt="Invyta Logo"
                className="h-10 lg:h-16 w-auto img-fluid"
              />
            </Link>
            <p className="font-body text-sm md:text-[15px] leading-6 text-foreground/80 mb-4">
              India's #1 AI Video Invite Studio. Creating cinematic, custom video invitations for your special moments.
            </p>
            <p className="font-body text-sm md:text-base font-semibold text-primary tracking-wide">
              "A smarter way to invite."
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-body text-base md:text-lg font-semibold text-foreground mb-4 tracking-wide">Categories</h4>
            <ul className="space-y-2">
              {[
                { name: "Birthday", href: "/birthday" },
                { name: "Baby Shower", href: "/baby-shower" },
                // { name: "Gender Reveal", href: "/save-the-date" },
                // { name: "Welcome Party", href: "/engagement" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-sm md:text-[15px] text-foreground/80 hover:text-primary transition-colors duration-200 hover:translate-x-0.5 inline-flex"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-base md:text-lg font-semibold text-foreground mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "How It Works", href: "/#how-it-works" },
                { name: "Featured Designs", href: "/#featured" },
                // { name: "AI Smart Invites", href: "/#ai-section" },
                { name: "Testimonials", href: "/#testimonials" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm md:text-[15px] text-foreground/80 hover:text-primary transition-colors duration-200 hover:translate-x-0.5 inline-flex"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-base md:text-lg font-semibold text-foreground mb-4 tracking-wide">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-body text-sm md:text-[15px] text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                  +91 84879 08430
                </a>
              </li>
              <li>
                <a
                  href="mailto:invyta10@gmail.com"
                  className="group flex items-center gap-2 font-body text-sm md:text-[15px] text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                  invyta10@gmail.com
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com/invytai?igsh=Y2YyaHUxaDNsc2Z4"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/80 border border-border flex items-center justify-center text-foreground/80 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@invytaaivideoinvites?si=r6sH6USfctz-hulu" target="_blank"
                className="w-10 h-10 rounded-full bg-white/80 border border-border flex items-center justify-center text-foreground/80 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs md:text-sm tracking-wide text-foreground/70">
            © 2026 Invyta. All rights reserved.
          </p>
          <p className="font-body text-xs md:text-sm tracking-wide text-foreground/70">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
