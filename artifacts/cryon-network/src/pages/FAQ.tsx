import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const faqs = [
  {
    category: "Protocol Basics",
    items: [
      {
        q: "What is Cryon Network?",
        a: "Cryon Network is a decentralized identity (DID) protocol built on Solana. It enables users, DAOs, and AI agents to create sovereign, verifiable identities on-chain — without relying on any central authority.",
      },
      {
        q: "What is a DID (Decentralized Identifier)?",
        a: "A DID is a globally unique identifier that you control entirely. Unlike email or usernames, no company owns or controls it. Cryon DIDs are stored on the Solana blockchain and follow the W3C DID standard.",
      },
      {
        q: "Why build on Solana?",
        a: "Solana offers 65,000+ TPS, sub-second finality, and transaction fees under $0.001. This makes identity operations (registration, verification, attestation) fast and economically viable at scale.",
      },
      {
        q: "Is Cryon Network open source?",
        a: "Yes. The entire protocol — Solana program (Anchor framework), frontend, and deployment scripts — is open source under the MIT License. You can inspect, fork, and contribute at github.com/oxsaif/cryon-network.",
      },
    ],
  },
  {
    category: "Identity & DIDs",
    items: [
      {
        q: "How do I create a Cryon DID?",
        a: "Connect your Solana wallet to the Cryon app, choose a DID name, and submit the registration transaction. Your DID is minted on-chain in under a second and permanently associated with your wallet.",
      },
      {
        q: "Can I transfer or sell my DID?",
        a: "Yes. Cryon DIDs are on-chain assets (SPL-compatible) and can be transferred to any Solana wallet. However, once transferred, the DID's associated verifiable credentials remain tied to the original holder.",
      },
      {
        q: "What are Verifiable Credentials (VCs)?",
        a: "VCs are cryptographically signed attestations attached to your DID — for example, KYC verification, professional credentials, or DAO membership. Third parties can verify these without contacting the issuer.",
      },
      {
        q: "What happens if I lose access to my wallet?",
        a: "Your DID is tied to your wallet's private key. Cryon supports social recovery through a guardian system where trusted wallets can help restore access. We recommend setting up guardians at registration.",
      },
    ],
  },
  {
    category: "Governance & Token",
    items: [
      {
        q: "How does Cryon governance work?",
        a: "CRY token holders can submit and vote on Cryon Improvement Proposals (CIPs). 1 CRY = 1 vote. Proposals require a minimum quorum and are executed on-chain automatically if passed.",
      },
      {
        q: "What is the CRY token used for?",
        a: "CRY has three primary uses: (1) Staking to secure the DID registry and earn rewards, (2) Governance voting on protocol upgrades, (3) Paying DID registration and attestation fees at a discount.",
      },
      {
        q: "When is the token launching?",
        a: "The CRY token launch date will be announced via our official Twitter (@CRYONNETWORK) and Discord. Join the community to be first to know.",
      },
      {
        q: "Is there an airdrop?",
        a: "Details about any airdrop program will be announced through official channels only. Be cautious of scams — we will never DM you first or ask for your seed phrase.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What is the Devnet Program ID?",
        a: "The Cryon Network Solana program on Devnet is deployed at: DbXqtgDjcERBX9PitvBUsY18gAvNLKnFhwiU4DfvDF5. You can inspect it on Solana Explorer by selecting the Devnet network.",
      },
      {
        q: "Which wallets are supported?",
        a: "Cryon supports all major Solana wallets including Phantom, Backpack, Solflare, and Glow. Any wallet adapter-compatible wallet will work.",
      },
      {
        q: "How do I integrate Cryon DIDs into my dApp?",
        a: "Install the Cryon SDK via npm: `npm install @cryon/did-sdk`. Full integration docs are available at the Docs page. The SDK supports TypeScript, Rust (Anchor), and Python.",
      },
      {
        q: "What network is Cryon currently on?",
        a: "Cryon Network is currently on Solana Devnet (Mainnet Beta launch coming soon). All transactions on Devnet use test SOL and have no real monetary value.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground leading-relaxed pb-4 pr-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [query, setQuery] = useState("");

  const filtered = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        !query ||
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        item.a.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <HelpCircle className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">FAQ</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Frequently asked questions about Cryon Network, DIDs, governance, and the protocol.
        </p>

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>

        {/* Categories */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No questions found for "<span className="text-foreground">{query}</span>"
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((cat) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 ml-1">
                  {cat.category}
                </h2>
                <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm px-5 divide-y divide-border">
                  {cat.items.map((item) => (
                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-6 rounded-xl border border-border bg-card/40 text-center">
          <p className="text-muted-foreground text-sm mb-3">
            Can't find your answer? Ask the community directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://discord.gg/aETwKpNSE" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
              Join Discord
            </a>
            <a href="https://github.com/oxsaif/cryon-network/issues" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-muted border border-border text-muted-foreground text-sm font-medium hover:text-foreground transition-colors">
              Open a GitHub Issue
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
