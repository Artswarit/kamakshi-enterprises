import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowRight } from "lucide-react";
import storyImg from "@/assets/story-incident.jpg";

interface StorySectionProps {
  onProductClick: () => void;
}

export function StorySection({ onProductClick }: StorySectionProps) {
  return (
    <section className="py-20 md:py-28 bg-background border-t">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column: Real photo of safety operations */}
          <div className="relative rounded-2xl overflow-hidden shadow-elegant bg-muted">
            <img
              src={storyImg}
              alt="Real fire rescue incident response operations"
              className="w-full h-full object-cover aspect-[4/3] lg:aspect-square hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Safety Awareness Campaign</p>
              <p className="text-sm font-medium mt-1 text-white/90 font-sans">A real-world emergency response drill and rescue operation.</p>
            </div>
          </div>

          {/* Right Column: Story & Emotional awareness */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/15 text-primary text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="h-4 w-4" /> Real Life Story
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-navy leading-tight">
              A Flame in the Kitchen. A Family Saved.
            </h2>

            <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p>
                It was 11:30 PM in New Delhi when a gas leakage in the kitchen ignited a sudden fire. Within minutes, thick toxic smoke filled the corridor, blocking the main exit door. Sunil and his family were trapped on the second floor with no way out.
              </p>
              <p>
                Fortunately Sunil had purchased a Kamakshi Emergency Fire Escape Ladder just weeks prior. While his wife kept their child safe from the smoke, Sunil unfurled the tangle-free ladder and hooked it to the balcony railing.
              </p>
              <blockquote className="border-l-4 border-brand-orange pl-4 italic text-navy font-medium py-1">
                "Within thirty seconds, the ladder was secured and my family climbed down safely. It was not just a purchase: it bought us our lives."
                <span className="block text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1.5">- Sunil Sharma, Delhi</span>
              </blockquote>
              <p>
                In home fire emergencies, exit blockages are the leading cause of casualties. Preparation changes the outcome. Keep an emergency roll-out escape ladder near every upper floor window of your household.
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={onProductClick}
                className="gradient-fire border-0 text-white font-bold h-11 px-6 rounded-md hover:opacity-95"
              >
                View Emergency Escape Ladder <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
