import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent successfully! Our customer support will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const offices = [
    {
      city: "New Delhi (HQ)",
      address: "Plot 14, Industrial Area Phase II, Okhla, New Delhi 110020",
      phone: "+91 11 4050 6070",
      email: "delhi@kamakshi.in",
    },
    {
      city: "Mumbai Warehouse",
      address: "Gala 5, Sector 2, Kopar Khairane Industrial Area, Navi Mumbai 400709",
      phone: "+91 22 2840 9010",
      email: "mumbai@kamakshi.in",
    },
    {
      city: "Bengaluru Depot",
      address: "No. 42, 3rd Main Road, Peenya Industrial Area 2nd Stage, Bengaluru 560058",
      phone: "+91 80 4120 3040",
      email: "south@kamakshi.in",
    },
  ];

  return (
    <div className="text-foreground animate-fade-in">
      {/* Header Banner */}
      <section className="relative py-16 bg-navy text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-brand-orange">Get In Touch</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">We Are Ready to Help You Secure Your Home and Workplace</h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base">
            Reach out to our safety consultants for volume sales, custom home installations, sample requests and safety audit appointments.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[1.2fr_1.8fr] gap-10 md:gap-16">
            {/* Left Column: Direct Contacts & Locations */}
            <div className="space-y-8">
              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-navy">Corporate Office</h3>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-navy/5 grid place-items-center text-brand-orange shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm sm:text-base">Headquarters Address</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Plot 14, Industrial Area Phase II, New Delhi 110020
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-navy/5 grid place-items-center text-brand-orange shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm sm:text-base">Procurement Helpline</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      +91 99999 99999 (Domestic and Bulk Inquiries)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-navy/5 grid place-items-center text-brand-orange shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm sm:text-base">Corporate Email</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      sales@kamakshi.in (Response within 4 hours)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-navy/5 grid place-items-center text-brand-orange shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm sm:text-base">Operational Hours</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Monday to Saturday: 9:00 AM - 6:30 PM (Closed on Sunday)
                    </p>
                  </div>
                </div>
              </div>

              {/* Regional Offices */}
              <div className="border-t pt-8">
                <h3 className="text-xl font-bold text-navy mb-4">Regional Distribution Hubs</h3>
                <div className="space-y-4">
                  {offices.map((o) => (
                    <div key={o.city} className="p-4 rounded-xl border bg-muted/20 text-xs space-y-1">
                      <p className="font-bold text-navy text-sm">{o.city}</p>
                      <p className="text-muted-foreground">{o.address}</p>
                      <p className="text-muted-foreground font-medium">Tel: {o.phone} | {o.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-elegant self-start">
              <h3 className="text-2xl font-bold text-navy mb-2">Send B2B Message</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fill out the form below to initiate catalog custom quotes, test samples requests or site audit appointments.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kamakshi Steel Works"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Requirement Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your home or site details, specific safety gear numbers, required sizes or safety audit dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition resize-none font-sans"
                  />
                </div>

                <Button type="submit" className="w-full gradient-fire border-0 text-white font-bold h-11">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
