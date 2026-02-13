import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import logoIcon from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M20.52 3.48A11.8 11.8 0 0 0 12.07 0C5.58 0 .3 5.28.3 11.77c0 2.07.54 4.1 1.57 5.89L0 24l6.51-1.82a11.72 11.72 0 0 0 5.56 1.42h.01c6.49 0 11.77-5.28 11.77-11.77 0-3.14-1.22-6.09-3.33-8.35Zm-8.45 18.1h-.01a9.76 9.76 0 0 1-4.97-1.35l-.36-.21-3.86 1.08 1.03-3.77-.24-.39a9.77 9.77 0 0 1-1.5-5.17C2.16 6.36 6.64 1.88 12.07 1.88c2.61 0 5.06 1.02 6.9 2.88a9.7 9.7 0 0 1 2.84 6.9c0 5.42-4.41 9.92-9.74 9.92Zm5.35-7.39c-.29-.14-1.73-.85-2-.95-.27-.1-.46-.14-.65.14-.19.29-.75.95-.92 1.14-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.31-1.42-.86-.77-1.44-1.72-1.6-2.01-.17-.29-.02-.44.13-.58.13-.13.29-.33.44-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.57-.89-2.14-.24-.58-.48-.5-.65-.51-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.77.36-.26.29-1 1-1 2.44s1.03 2.84 1.17 3.03c.14.19 2.01 3.07 4.87 4.3.68.29 1.22.47 1.63.6.69.22 1.32.19 1.82.11.56-.08 1.73-.7 1.98-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33Z" />
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Birthday", href: "/birthday" },
    { name: "Baby Shower", href: "/save-the-date" },
    { name: "Gender Reveal", href: "/engagement" },
    { name: "Welcome Party", href: "/birthday" },
  ];

  const whatsappLink = "https://wa.me/918141721001?text=Hi!%20I%27m%20interested%20in%20your%20AI%20video%20invites.";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoIcon}
              alt="Invyta Logo"
              className="h-10 lg:h-16 w-auto img-fluid"
            />
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <>
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `font-body text-sm transition-colors py-2 ${isActive
                      ? "text-blue-600 font-semibold"
                      : "text-foreground hover:text-primary"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
                {/* <Link
                key={link.name}
                to={link.href}
                className="font-body text-sm text-muted-foreground hover:text-primary transition-colors gold-underline"
              >
                {link.name}
              </Link> */}
              </>

            ))}
          </nav>


          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="whatsapp" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="w-5 h-5" />
                Chat With Us
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `font-body transition-colors py-2 ${isActive
                      ? "text-blue-600 font-semibold"
                      : "text-foreground hover:text-primary"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
                // <Link
                //   key={link.name}
                //   to={link.href}
                //   // className="font-body text-foreground hover:text-primary transition-colors py-2"
                //   className={({ isActive }) =>
                //     `font-body transition-colors py-2 ${isActive
                //       ? "text-blue-600 font-semibold"
                //       : "text-foreground hover:text-primary"
                //     }`
                //   }
                //   onClick={() => setIsMenuOpen(false)}
                // >
                //   {link.name}
                // </Link>
              ))}
              <Button variant="whatsapp" className="mt-2" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Order on WhatsApp
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
