import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl gradient-fire p-10 md:p-16 text-white shadow-elegant">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-navy/30 blur-2xl" />
          <div className="relative grid md:grid-cols-[1.5fr_auto] items-center gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-balance">Need a bulk quote for your site?</h2>
              <p className="mt-3 text-white/90 text-lg max-w-2xl">Share your requirement — our sales team responds within 4 working hours with a custom quote, samples, and a compliance checklist.</p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold h-12 px-6">
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white hover:text-primary h-12 px-6">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
