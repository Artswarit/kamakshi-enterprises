import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-elegant hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
    </a>
  );
}
