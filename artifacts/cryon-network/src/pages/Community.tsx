import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard, MotionGlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Globe, ExternalLink, MessageSquare, Trophy } from "lucide-react";
import { SiDiscord, SiX, SiGithub, SiTelegram } from "react-icons/si";

const socials = [
  {
    icon: SiDiscord,
    name: "Discord",
    handle: "cryon.network/discord",
    members: "24.8K members",
    desc: "Real-time support, dev chat, governance discussions, and protocol announcements.",
    color: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/30 hover:border-indigo-400/60",
    iconColor: "text-indigo-400",
    cta: "Join Discord",
  },
  {
    icon: SiX,
    name: "Twitter / X",
    handle: "@CryonNetwork",
    members: "51.3K followers",
    desc: "Protocol updates, ecosystem highlights, live AMA announcements, and Web3 commentary.",
    color: "from-slate-500/20 to-slate-600/5",
    border: "border-slate-500/30 hover:border-slate-400/60",
    iconColor: "text-slate-300",
    cta: "Follow on X",
  },
  {
    icon: SiGithub,
    name: "GitHub",
    handle: "github.com/cryon-network",
    members: "3.1K stars",
    desc: "Open-source SDKs, smart contracts, protocol specs, and contribution guides.",
    color: "from-gray-500/20 to-gray-600/5",
    border: "border-gray-500/30 hover:border-gray-400/60",
    iconColor: "text-gray-300",
    cta: "View on GitHub",
  },
  {
    icon: SiTelegram,
    name: "Telegram",
    handle: "t.me/CryonNetwork",
    members: "18.2K members",
    desc: "Community chat, price discussion, and region-specific groups in 8 languages.",
    color: "from-sky-500/20 to-sky-600/5",
    border: "border-sky-500/30 hover:border-sky-400/60",
    iconColor: "text-sky-400",
    cta: "Join Telegram",
  },
];

const partners = [
  { name: "Solana Foundation", type: "Infrastructure", logo: "SF" },
  { name: "Phantom Wallet", type: "Wallet", logo: "PH" },
  { name: "Jito Labs", type: "MEV / Staking", logo: "JT" },
  { name: "Helius", type: "RPC / Data", logo: "HL" },
  { name: "Pyth Network", type: "Oracle", logo: "PY" },
  { name: "Wormhole", type: "Bridging", logo: "WH" },
  { name: "Squads Protocol", type: "Multisig", logo: "SQ" },
  { name: "Dialect", type: "Messaging", logo: "DL" },
];

const events = [
  {
    title: "Cryon Developer AMA",
    type: "AMA",
    date: "June 12, 2026",
    time: "3:00 PM UTC",
    platform: "Discord",
    desc: "Core team Q&A covering the v1.4 roadmap, ZK integration timeline, and community questions.",
  },
  {
    title: "DID Hackathon — Summer 2026",
    type: "Hackathon",
    date: "July 1–14, 2026",
    time: "Online",
    platform: "Global",
    desc: "$200K in prizes for projects building on Cryon's identity infrastructure. Open to all developers.",
  },
  {
    title: "Governance Townhall — Q3",
    type: "Governance",
    date: "June 25, 2026",
    time: "5:00 PM UTC",
    platform: "Twitter Spaces",
    desc: "Community discussion of upcoming CIPs, treasury allocation vote, and delegate introductions.",
  },
];

const contributors = [
  { handle: "0xkira.did", role: "Core Dev", commits: 312, badge: "Top Contributor" },
  { handle: "solana_sage.did", role: "Protocol Research", commits: 198, badge: "Researcher" },
  { handle: "did_builder.did", role: "SDK Author", commits: 245, badge: "Builder" },
  { handle: "zkwizard.did", role: "ZK Engineer", commits: 181, badge: "ZK Expert" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Community() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6 tracking-widest uppercase">
              Community
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
              Built by Builders,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                For Everyone.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join 94,000+ developers, researchers, and Web3 pioneers building the decentralized identity layer for the next internet.
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { value: "94K+", label: "Community Members" },
              { value: "42", label: "Countries" },
              { value: "320+", label: "Contributors" },
              { value: "8", label: "Language Channels" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Channels */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Join the Conversation
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {socials.map((s, i) => (
              <MotionGlassCard
                key={s.name}
                className={`p-6 group cursor-pointer border ${s.border} transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                data-testid={`card-social-${s.name}`}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-background/60 border border-border flex items-center justify-center flex-shrink-0`}>
                    <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-foreground">{s.name}</h3>
                      <span className="text-xs text-muted-foreground">{s.members}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{s.handle}</p>
                    <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                    <button
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                      data-testid={`button-social-${s.name}`}
                    >
                      {s.cta} <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </MotionGlassCard>
            ))}
          </div>
        </motion.div>

        {/* Events */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {events.map((event, i) => (
              <MotionGlassCard
                key={event.title}
                glowColor="primary"
                className="p-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-testid={`card-event-${i}`}
              >
                <div>
                  <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 text-xs">{event.type}</Badge>
                  <h3 className="font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{event.desc}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                  <span>{event.date}</span>
                  <span>{event.time}</span>
                  <span className="text-primary">{event.platform}</span>
                </div>
              </MotionGlassCard>
            ))}
          </div>
        </motion.div>

        {/* Ecosystem Partners */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Ecosystem Partners
          </h2>
          <GlassCard className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/30 border border-border hover:border-primary/40 transition-colors cursor-pointer"
                  data-testid={`card-partner-${p.name}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{p.logo}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground text-center">{p.name}</span>
                  <span className="text-xs text-muted-foreground">{p.type}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Top Contributors */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Top Contributors
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {contributors.map((c, i) => (
              <GlassCard key={c.handle} className="p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/30 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{c.handle[0].toUpperCase()}</span>
                </div>
                <div className="text-sm font-bold text-foreground mb-1">{c.handle}</div>
                <div className="text-xs text-muted-foreground mb-2">{c.role}</div>
                <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">{c.badge}</Badge>
                <div className="text-xs text-muted-foreground mt-2">{c.commits} commits</div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard className="p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-3">Stay in the Loop</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Weekly protocol digest — updates, research, events, and governance highlights. No spam.
              </p>
              {subscribed ? (
                <div className="text-primary font-semibold text-lg">You are subscribed. Welcome to the network.</div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-border flex-1"
                    data-testid="input-community-newsletter"
                  />
                  <Button
                    onClick={handleSubscribe}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                    data-testid="button-community-subscribe"
                  >
                    Subscribe
                  </Button>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
