import { Link } from "wouter";
import { SiDiscord, SiGithub, SiX, SiTelegram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImg from "@assets/-dvyu3n_1780696529835.jpg";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img src={logoImg} alt="Cryon Network" className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-bold text-lg tracking-wider">CRYON NETWORK</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              The sovereign identity protocol for the next generation of trustless applications, DAOs, and AI agents.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://x.com/CRYONNETWORK" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-twitter">
                <SiX size={20} />
              </a>
              <a href="https://discord.gg/aETwKpNSE" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-discord">
                <SiDiscord size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-github">
                <SiGithub size={20} />
              </a>
              <a href="https://t.me/cryonnetwork1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-telegram">
                <SiTelegram size={20} />
              </a>
            </div>
          </div>

          {/* Protocol Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground mb-1">Protocol</h3>
            <Link href="/whitepaper" className="text-muted-foreground hover:text-primary text-sm transition-colors">Whitepaper</Link>
            <Link href="/docs" className="text-muted-foreground hover:text-primary text-sm transition-colors">Documentation</Link>
            <Link href="/metrics" className="text-muted-foreground hover:text-primary text-sm transition-colors">Network Metrics</Link>
            <Link href="/governance" className="text-muted-foreground hover:text-primary text-sm transition-colors">Governance</Link>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground mb-1">Resources</h3>
            <Link href="/blog" className="text-muted-foreground hover:text-primary text-sm transition-colors">Blog & News</Link>
            <Link href="/community" className="text-muted-foreground hover:text-primary text-sm transition-colors">Community</Link>
            <Link href="/support" className="text-muted-foreground hover:text-primary text-sm transition-colors">Support Center</Link>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Brand Assets</a>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground mb-1">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to the Cryon Network newsletter for protocol updates.
            </p>
            <div className="flex gap-2 mt-1">
              <Input 
                type="email" 
                placeholder="Email address" 
                className="bg-background border-border"
              />
              <Button variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Cryon Network. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
