import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard, MotionGlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, AlertCircle, Vote, TrendingUp, Users, Wallet, ChevronDown, ChevronUp } from "lucide-react";

const proposals = [
  {
    id: "CIP-09",
    title: "Reduce DID Registration Fee to 0.001 SOL",
    description:
      "Proposal to lower the base DID registration cost from 0.005 SOL to 0.001 SOL to increase onboarding adoption, particularly for developing-market users and AI agent deployments.",
    status: "active",
    forVotes: 4820000,
    againstVotes: 1230000,
    abstainVotes: 210000,
    quorum: 70,
    currentQuorum: 58,
    author: "cryon.did:0xA3F2",
    endsIn: "2 days, 14 hours",
    category: "Protocol Economics",
  },
  {
    id: "CIP-08",
    title: "Enable Cross-Chain DID Resolution via Wormhole Bridge",
    description:
      "Integrate Wormhole's messaging protocol to allow Cryon DIDs to be resolved from Ethereum, Polygon, and Arbitrum without bridging assets.",
    status: "active",
    forVotes: 6100000,
    againstVotes: 890000,
    abstainVotes: 140000,
    quorum: 70,
    currentQuorum: 73,
    author: "cryon.did:0xB9C1",
    endsIn: "5 days, 2 hours",
    category: "Interoperability",
  },
  {
    id: "CIP-07",
    title: "Quadratic Voting for Protocol Parameter Changes",
    description:
      "Replace token-weight voting with quadratic voting for changes to core protocol parameters to better represent community preferences.",
    status: "passed",
    forVotes: 8900000,
    againstVotes: 720000,
    abstainVotes: 330000,
    quorum: 70,
    currentQuorum: 92,
    author: "Cryon DAO",
    endsIn: "Ended May 2, 2026",
    category: "Governance",
  },
  {
    id: "CIP-06",
    title: "Treasury Allocation: $2M for Developer Grants Q3 2026",
    description:
      "Allocate $2,000,000 USDC from the Cryon treasury to fund developer grants targeting DID tooling, SDK development, and integration bounties.",
    status: "passed",
    forVotes: 7400000,
    againstVotes: 2100000,
    abstainVotes: 500000,
    quorum: 70,
    currentQuorum: 88,
    author: "Treasury Committee",
    endsIn: "Ended April 15, 2026",
    category: "Treasury",
  },
  {
    id: "CIP-05",
    title: "Deprecate Legacy v1 DID Document Format",
    description:
      "Sunset support for the v1 DID document schema by Q4 2026 to reduce protocol complexity and security surface area.",
    status: "defeated",
    forVotes: 1200000,
    againstVotes: 9800000,
    abstainVotes: 400000,
    quorum: 70,
    currentQuorum: 85,
    author: "cryon.did:0xF44A",
    endsIn: "Ended March 28, 2026",
    category: "Protocol",
  },
];

const treasuryStats = [
  { label: "Total Treasury", value: "$18.4M", sub: "USDC + SOL" },
  { label: "Allocated Q2", value: "$3.2M", sub: "Grants & Ops" },
  { label: "Circulating CRY", value: "412M", sub: "of 1B supply" },
  { label: "Delegated Votes", value: "284M", sub: "CRY tokens" },
];

const statusConfig = {
  active: { label: "Active", color: "bg-primary/20 text-primary border-primary/30", icon: Clock },
  passed: { label: "Passed", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
  defeated: { label: "Defeated", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertCircle },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function ProposalCard({ proposal, index }: { proposal: (typeof proposals)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [voted, setVoted] = useState<"for" | "against" | "abstain" | null>(null);

  const total = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes;
  const forPct = Math.round((proposal.forVotes / total) * 100);
  const againstPct = Math.round((proposal.againstVotes / total) * 100);

  const cfg = statusConfig[proposal.status as keyof typeof statusConfig];
  const StatusIcon = cfg.icon;

  const fmt = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${(n / 1_000).toFixed(0)}K`);

  return (
    <MotionGlassCard
      glowColor="primary"
      className="p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-testid={`card-proposal-${proposal.id}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
              {proposal.id}
            </span>
            <Badge className={`text-xs border ${cfg.color} flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" />
              {cfg.label}
            </Badge>
            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
              {proposal.category}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">{proposal.title}</h3>
          <p className="text-xs text-muted-foreground">
            by {proposal.author} &bull; {proposal.endsIn}
          </p>
        </div>
      </div>

      {/* Vote Bars */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-green-400 w-12">For</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
              style={{ width: `${forPct}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-20 text-right">
            {forPct}% ({fmt(proposal.forVotes)})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-red-400 w-12">Against</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-1000"
              style={{ width: `${againstPct}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-20 text-right">
            {againstPct}% ({fmt(proposal.againstVotes)})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-12">Quorum</span>
          <div className="flex-1">
            <Progress value={proposal.currentQuorum} className="h-2" />
          </div>
          <span
            className={`text-xs w-20 text-right ${
              proposal.currentQuorum >= proposal.quorum ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {proposal.currentQuorum}% / {proposal.quorum}%
          </span>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
        data-testid={`button-expand-${proposal.id}`}
      >
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        {expanded ? "Hide details" : "Show details"}
      </button>

      {expanded && (
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed border-l-2 border-primary/30 pl-4">
          {proposal.description}
        </p>
      )}

      {/* Vote buttons — only for active */}
      {proposal.status === "active" && (
        <div className="flex gap-2 flex-wrap">
          {(["for", "against", "abstain"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVoted(v)}
              data-testid={`button-vote-${v}-${proposal.id}`}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all border ${
                voted === v
                  ? v === "for"
                    ? "bg-green-500/20 text-green-400 border-green-500/40"
                    : v === "against"
                      ? "bg-red-500/20 text-red-400 border-red-500/40"
                      : "bg-muted text-foreground border-border"
                  : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-primary/50"
              }`}
            >
              {voted === v ? "Voted" : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      )}
    </MotionGlassCard>
  );
}

export default function Governance() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Active", "Passed", "Defeated"];

  const filtered = proposals.filter(
    (p) => filter === "All" || p.status === filter.toLowerCase()
  );

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-64 bg-secondary/15 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-80 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-medium mb-6 tracking-widest uppercase">
              DAO Governance
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                Community Governed.
              </span>{" "}
              Collectively Owned.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every protocol parameter, treasury allocation, and upgrade is decided by CRY token holders through on-chain proposals.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Treasury Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {treasuryStats.map((stat, i) => (
            <GlassCard key={stat.label} className="p-5 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </GlassCard>
          ))}
        </motion.div>

        {/* How to Participate */}
        <motion.div {...fadeInUp} className="mb-14">
          <GlassCard className="p-8">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Vote className="w-5 h-5 text-primary" />
              How to Participate
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Wallet, title: "1. Hold CRY Tokens", desc: "Acquire CRY tokens on Jupiter, Orca, or other Solana DEXs. 1 CRY = 1 base vote." },
                { icon: Users, title: "2. Delegate or Vote", desc: "Self-delegate your voting power or assign it to a trusted community delegate." },
                { icon: TrendingUp, title: "3. Shape the Protocol", desc: "Vote on active proposals and create new ones with 100,000 CRY in your wallet." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Filter + Proposals */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-foreground">Proposals</h2>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-testid={`button-filter-${f}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((proposal, i) => (
            <ProposalCard key={proposal.id} proposal={proposal} index={i} />
          ))}
        </div>

        {/* Submit Proposal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <GlassCard className="p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-secondary/10 blur-3xl rounded-full" />
            <h3 className="text-2xl font-bold text-foreground mb-3 relative z-10">Have an Idea for the Protocol?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto relative z-10">
              Discuss your proposal in the governance forum first, gather community support, then submit on-chain with 100,000 CRY.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,255,255,0.3)]" data-testid="button-forum">
                Visit Forum
              </Button>
              <Button variant="outline" className="border-border hover:bg-muted" data-testid="button-submit-proposal">
                Submit Proposal
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
