import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/-dvyu3n_1780696529835.jpg";

const navLinks = [
  { name: "Whitepaper", path: "/whitepaper" },
  { name: "Docs", path: "/docs" },
  { name: "Token", path: "/token" },
  { name: "Metrics", path: "/metrics" },
  { name: "Governance", path: "/governance" },
  { name: "Community", path: "/community" },
  { name: "Support", path: "/support" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Cryon Network" className="w-9 h-9 rounded-lg object-cover" />
            <span className="font-bold text-xl tracking-wider text-foreground">CRYON</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all">
                Launch App
              </Button>
            </div>
            <button
              className="md:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium p-2 rounded-md ${
                    location === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full mt-2 bg-primary text-primary-foreground">
                Launch App
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
