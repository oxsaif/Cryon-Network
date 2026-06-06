import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Coins, ExternalLink, Lock, TrendingUp, Zap, ShieldCheck } from "lucide-react";

const TOTAL_SUPPLY = 1_000_000_000;

const distribution = [
  { name: "Community & Ecosystem", value: 35, color: "#00ffff" },
  { name: "Protocol Treasury", value: 20, color: "#7c3aed" },
  { name: "Team & Advisors", value: 15, color: "#06b6d4" },
  { name: "Private Sale", value: 12, color: "#8b5cf6" },
  { name: "Public Sale", value: 8, color: "#22d3ee" },
  { name: "Liquidity & Market Making", value: 10, color: "#4ade80" },
];

const vestingSchedule = [
  { month: "TGE", community: 10, treasury: 0, team: 0, private: 5, public: 100 },
  { month: "M3",  community: 15, treasury: 5, team: 0,  private: 10, public: 100 },
  { month: "M6",  community: 25, treasury: 10, team: 0, private: 20, public: 100 },
  { month: "M12", community: 45, treasury: 25, team: 25, private: 50, public: 100 },
  { month: "M18", community: 65, treasury: 50, team: 50, private: 75, public: 100 },
  { month: "M24", community: 80, treasury: 75, team: 75, private: 100, public: 100 },
  { month: "M36", community: 100, treasury: 100, team: 100, private: 100, public: 100 },
];

const exchanges = [
  {
    name: "Jupiter",
    url: "https://jup.ag/",
    description: "The best DEX aggregator on Solana. Best rates guaranteed.",
    tag: "Recommended",
    tagColor: "text-green-400 bg-green-400/10 border-green-400/20",
  },
  {
    name: "Raydium",
    url: "https://raydium.io/",
    description: "Leading AMM & liquidity protocol on Solana.",
    tag: "High Liquidity",
    tagColor: "text-primary bg-primary/10 border-primary/20",
  },
  {
    name: "Orca",
    url: "https://www.orca.so/",
    description: "User-friendly Solana DEX with concentrated liquidity.",
    tag: "Low Slippage",
    tagColor: "text-secondary bg-secondary/10 border-secondary/20",
  },
];

const steps = [
  {
    num: "01",
    title: "Get a Solana Wallet",
    desc: "Download Phantom or Backpack wallet. Create a new wallet and securely save your seed phrase.",
  },
  {
    num: "02",
    title: "Buy SOL",
    desc: "Purchase SOL on any centralized exchange (Coinbase, Binance) then transfer to your wallet.",
  },
  {
    num: "03",
    title: "Connect to Jupiter",
    desc: "Visit jup.ag and connect your wallet. No account required.",
  },
  {
    num: "04",
    title: "Swap SOL → CRY",
    desc: "Search for $CRY, enter the amount, review slippage, and confirm the swap.",
  },
];

const tokenStats = [
  { label: "Total Supply", value: "1,000,000,000", sub: "CRY tokens" },
  { label: "Initial Circ. Supply", value: "130,000,000", sub: "13% at TGE" },
  { label: "Network", value: "Solana", sub: "SPL Token Standard" },
  { label: "Utility", value: "3 Functions", sub: "Stake · Vote · Pay" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 text-sm">
        <p className="font-semibold" style={{ color: d.color }}>{d.name}</p>
        <p className="text-muted-foreground">{d.value}% — {((d.value / 100) * TOTAL_SUPPLY / 1_000_000).toFixed(0)}M CRY</p>
      </div>
    );
  }
  return null;
};

export default function Token() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Coins className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">CRY Token</h1>
          <span className="ml-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium uppercase tracking-wider">
            SPL · Solana
          </span>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl -mt-6">
          The native utility token powering Cryon Network — used for staking, governance voting, and protocol fee payments.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tokenStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <GlassCard className="p-5" glowColor={i === 0 ? "primary" : undefined}>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-xl font-mono font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Distribution + Utility */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie chart */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Token Distribution
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {distribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} opacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {distribution.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-xs text-muted-foreground">{d.name}</span>
                  <span className="text-xs font-semibold ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Token Utility */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Token Utility
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: <ShieldCheck className="w-5 h-5 text-primary" />,
                  title: "Staking & Security",
                  desc: "Stake CRY to secure the DID registry and earn protocol rewards. Minimum 1,000 CRY to run a validator node.",
                },
                {
                  icon: <Coins className="w-5 h-5 text-secondary" />,
                  title: "Governance Voting",
                  desc: "1 CRY = 1 vote. Propose and vote on protocol upgrades, fee structures, and treasury allocations.",
                },
                {
                  icon: <Zap className="w-5 h-5 text-green-400" />,
                  title: "Fee Payments",
                  desc: "Pay DID registration, verification, and attestation fees in CRY. Token holders receive a fee discount of up to 50%.",
                },
                {
                  icon: <Lock className="w-5 h-5 text-yellow-400" />,
                  title: "Identity Collateral",
                  desc: "Lock CRY as collateral to issue verifiable credentials and attestations with higher trust scores.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Vesting Schedule */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Vesting Schedule
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Percentage unlocked over time by allocation group</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vestingSchedule} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                  formatter={(value: any, name: string) => [`${value}%`, name]}
                />
                <Bar dataKey="community" name="Community" fill="#00ffff" opacity={0.8} radius={[2, 2, 0, 0]} />
                <Bar dataKey="treasury" name="Treasury" fill="#7c3aed" opacity={0.8} radius={[2, 2, 0, 0]} />
                <Bar dataKey="team" name="Team" fill="#06b6d4" opacity={0.8} radius={[2, 2, 0, 0]} />
                <Bar dataKey="private" name="Private Sale" fill="#8b5cf6" opacity={0.8} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {[
              { label: "Community", color: "#00ffff" },
              { label: "Treasury", color: "#7c3aed" },
              { label: "Team", color: "#06b6d4" },
              { label: "Private Sale", color: "#8b5cf6" },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-muted-foreground">{d.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* How to Buy */}
        <div>
          <h2 className="text-2xl font-bold mb-2">How to Buy CRY</h2>
          <p className="text-muted-foreground mb-8">CRY is available on Solana DEXs. No CEX listing required — swap directly from your wallet.</p>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <GlassCard className="p-5 h-full" glowColor={i === 0 ? "primary" : undefined}>
                  <div className="text-3xl font-mono font-bold text-primary/40 mb-3">{step.num}</div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* DEX Listings */}
          <h3 className="text-lg font-semibold mb-4">Available On</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exchanges.map((ex, i) => (
              <motion.a
                key={ex.name}
                href={ex.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="group block"
              >
                <GlassCard className="p-5 h-full transition-all group-hover:border-primary/40">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-lg font-bold group-hover:text-primary transition-colors">{ex.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${ex.tagColor}`}>{ex.tag}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{ex.description}</p>
                </GlassCard>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground">
          <span className="font-semibold text-yellow-400">Disclaimer: </span>
          This page is for informational purposes only. CRY token details are subject to change before mainnet launch. This is not financial advice. Always do your own research before investing.
        </div>
      </motion.div>
    </div>
  );
}
