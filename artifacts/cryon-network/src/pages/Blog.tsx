import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard, MotionGlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = ["All", "Protocol Updates", "DID Research", "Ecosystem", "AI & Identity", "Governance"];

const posts = [
  {
    id: 1,
    title: "Cryon v1.3: Introducing ZK-Proof Identity Verification",
    excerpt: "Our latest protocol upgrade brings zero-knowledge proofs natively into the DID resolution layer, enabling fully private identity assertions without revealing sensitive credential data on-chain.",
    category: "Protocol Updates",
    author: "Kai Nakamura",
    date: "June 3, 2026",
    readTime: "8 min read",
    featured: true,
    tags: ["ZK Proofs", "Privacy", "Protocol"],
  },
  {
    id: 2,
    title: "AI Agents and Self-Sovereign Identity: The Missing Layer",
    excerpt: "As AI agents proliferate across the web, they need verifiable, sovereign identities to act autonomously. Cryon provides the infrastructure for agents to own their credentials.",
    category: "AI & Identity",
    author: "Lena Volkova",
    date: "May 28, 2026",
    readTime: "6 min read",
    featured: false,
    tags: ["AI Agents", "Autonomy", "DID"],
  },
  {
    id: 3,
    title: "Micro-payment Channels via DID-Linked Solana Accounts",
    excerpt: "A deep dive into how Cryon's payment channel architecture enables sub-second, feeless micro-payments tied to sovereign identity accounts on Solana.",
    category: "Protocol Updates",
    author: "Marcus Webb",
    date: "May 21, 2026",
    readTime: "11 min read",
    featured: false,
    tags: ["Payments", "Solana", "Architecture"],
  },
  {
    id: 4,
    title: "The W3C DID Spec and How Cryon Extends It for Web3",
    excerpt: "A technical analysis of the W3C DID Core specification and the extensions Cryon introduces to support decentralized governance, on-chain credential anchoring, and agent delegation.",
    category: "DID Research",
    author: "Aria Patel",
    date: "May 14, 2026",
    readTime: "14 min read",
    featured: false,
    tags: ["W3C", "Standards", "Research"],
  },
  {
    id: 5,
    title: "Ecosystem Spotlight: 12 Projects Building on Cryon",
    excerpt: "From DeFi protocols to decentralized social networks and DAO tooling, a growing ecosystem is integrating Cryon for trustless identity. Here are 12 teams leading the charge.",
    category: "Ecosystem",
    author: "Soren Andersen",
    date: "May 7, 2026",
    readTime: "5 min read",
    featured: false,
    tags: ["Ecosystem", "Integrations", "Community"],
  },
  {
    id: 6,
    title: "DAO Governance Framework: CIP-07 Voting Results",
    excerpt: "The community has spoken. CIP-07 introduces quadratic voting for protocol parameter changes. Here is a full breakdown of the vote, participation rates, and next steps.",
    category: "Governance",
    author: "Cryon DAO",
    date: "April 30, 2026",
    readTime: "4 min read",
    featured: false,
    tags: ["DAO", "Voting", "CIP-07"],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const rest = filteredPosts.filter((p) => p.id !== featured?.id);

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6 tracking-widest uppercase">
              Blog & News
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
              Protocol Insights &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Ecosystem Updates
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technical deep-dives, governance updates, and ecosystem analysis from the Cryon core team and community.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search + Filter Bar */}
        <motion.div {...fadeInUp} className="flex flex-col md:flex-row gap-4 mb-12 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
              data-testid="input-blog-search"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`button-category-${cat}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">No articles found matching your criteria.</div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <motion.div {...fadeInUp} className="mb-12">
                <MotionGlassCard
                  glowColor="primary"
                  className="group cursor-pointer p-0 overflow-hidden"
                  whileHover={{ scale: 1.005 }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent p-8 md:p-12 flex flex-col justify-center min-h-[300px]">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="relative w-40 h-40">
                          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                          <div className="absolute inset-4 rounded-full border border-primary/40 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
                              <span className="text-primary text-3xl font-bold">C</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Featured</Badge>
                          <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                            {featured.category}
                          </Badge>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                          {featured.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featured.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground border border-border"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {featured.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {featured.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {featured.readTime}
                          </span>
                        </div>
                        <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </MotionGlassCard>
              </motion.div>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <MotionGlassCard
                  key={post.id}
                  glowColor="primary"
                  className="group cursor-pointer p-6 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  data-testid={`card-post-${post.id}`}
                >
                  <div>
                    <Badge variant="outline" className="mb-4 text-xs border-primary/30 text-primary">
                      {post.category}
                    </Badge>
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all font-medium">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </MotionGlassCard>
              ))}
            </div>
          </>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <GlassCard className="p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-primary/10 blur-3xl rounded-full" />
            <h3 className="text-2xl font-bold text-foreground mb-3 relative z-10">Stay Ahead of the Protocol</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto relative z-10">
              Get protocol updates, research papers, and ecosystem highlights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
              <Input
                placeholder="your@email.com"
                className="bg-background border-border flex-1"
                data-testid="input-newsletter"
              />
              <button
                className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
