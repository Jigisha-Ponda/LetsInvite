import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const whatsappLink = "https://wa.me/919999999999?text=Hi!%20I%27m%20interested%20in%20your%20AI%20video%20invites.";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float animate-pulse-glow"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-body font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
};

export default WhatsAppFloat;
