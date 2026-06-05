import { useState } from "react";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Hardcoded demo credentials
      if (email === "admin@kamakshi.in" && password === "admin123") {
        toast.success("Successfully authenticated as Admin.");
        onLoginSuccess();
      } else {
        toast.error("Invalid credentials. Try: admin@kamakshi.in / admin123");
      }
    }, 800);
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-[75vh] flex items-center justify-center text-foreground">
      <div className="w-full max-w-md bg-card border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 gradient-fire" />

        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-navy/5 text-navy grid place-items-center mx-auto mb-3">
            <Lock className="h-6 w-6 text-brand-orange" />
          </div>
          <h3 className="text-2xl font-bold text-navy">Admin Portal Sign In</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Access protected order tracking databases and inventory catalogs.
          </p>
        </div>

        {/* Demo Credentials Alert Box */}
        <div className="bg-muted/60 border rounded-lg p-3 text-xs mb-6 text-muted-foreground flex gap-2.5 items-start">
          <ShieldAlert className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-navy">Demo Environment Credentials</p>
            <p className="mt-0.5">Email: <span className="font-mono text-foreground font-medium">admin@kamakshi.in</span></p>
            <p>Password: <span className="font-mono text-foreground font-medium">admin123</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Authorized Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="admin@kamakshi.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full gradient-fire border-0 text-white font-bold h-11 rounded-md"
          >
            {loading ? "Authenticating..." : "Sign In to Workspace"}
          </Button>
        </form>
      </div>
    </div>
  );
}
