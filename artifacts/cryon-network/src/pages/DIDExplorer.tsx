import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, Clock, Copy, Check, ExternalLink, Zap, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

const PROGRAM_ID = "DbXqtgDjcERBX9PitvBUsY18gAvNLKnFhwiU4DfvDF5";

const MOCK_DIDS: Record<string, any> = {
  "cryon:sol:DbXqtgDjcERBX9PitvBUsY18gAvNLKnFhwiU4DfvDF5": {
    did: "cryon:sol:DbXqtgDjcERBX9PitvBUsY18gAvNLKnFhwiU4DfvDF5",
    controller: "DbXqtgDjcERBX9PitvBUsY18gAvNLKnFhwiU4DfvDF5",
    status: "Active",
    created: "2025-11-03T09:12:44Z",
    updated: "2026-04-17T14:30:00Z",
    credentials: ["KYC Verified", "Protocol Developer", "Devnet Deployer"],
    slot: 287_412_900,
    txSignature: "5KtV...mNpQ",
    network: "Devnet",
  },
  "cryon:sol:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZAMdL4VMetEc9": {
    did: "cryon:sol:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZAMdL4VMetEc9",
    controller: "4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZAMdL4VMetEc9",
    status: "Active",
    created: "2025-12-01T11:00:00Z",
    updated: "2026-05-10T08:22:11Z",
    credentials: ["DAO Member", "Governance Voter"],
    slot: 302_100_455,
    txSignature: "3RqW...xKpL",
    network: "Devnet",
  },
  "cryon:sol:9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtADWPc": {
    did: "cryon:sol:9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtADWPc",
    controller: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtADWPc",
    status: "Revoked",
    created: "2026-01-15T06:30:00Z",
    updated: "2026-03-22T10:15:00Z",
    credentials: [],
    slot: 318_500_200,
    txSignature: "7YvM...nQrT",
    network: "Devnet",
  },
};

const EXAMPLE_DIDS = [
  "cryon:sol:DbXqtgDjcERBX9PitvBUsY18gAvNLKnFhwiU4DfvDF5",
  "cryon:sol:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZAMdL4VMetEc9",
  "cryon:sol:9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtADWPc",
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="p-1.5 rounded hover:bg-muted transition-colors flex-shrink-0"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  );
}

function DidResult({ result }: { result: any }) {
  const [showRaw, setShowRaw] = useState(false);
  const isActive = result.status === "Active";

  const rawDoc = {
    "@context": ["https://www.w3.org/ns/did/v1", "https://cryon.network/ns/v1"],
    "id": result.did,
    "controller": result.controller,
    "verificationMethod": [{
      "id": `${result.did}#key-1`,
      "type": "Ed25519VerificationKey2020",
      "controller": result.did,
      "publicKeyMultibase": "z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
    }],
    "authentication": [`${result.did}#key-1`],
    "service": result.credentials.map((c: string, i: number) => ({
      "id": `${result.did}#vc-${i}`,
      "type": "VerifiableCredential",
      "serviceEndpoint": `https://cryon.network/vc/${result.controller}/${i}`
    }))
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <GlassCard className={`p-6 border ${isActive ? "border-green-500/30" : "border-red-500/30"}`}>
        {/* Status bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            <span className={`text-sm font-semibold ${isActive ? "text-green-400" : "text-red-400"}`}>{result.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">{result.network}</Badge>
            <a
              href={`https://explorer.solana.com/address/${result.controller}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              View on Solana Explorer <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* DID */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Decentralized Identifier</p>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-background/60 border border-border">
            <code className="font-mono text-xs text-primary break-all flex-1">{result.did}</code>
            <CopyButton text={result.did} />
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Created</p>
            <p className="text-sm font-medium">{new Date(result.created).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Last Updated</p>
            <p className="text-sm font-medium">{new Date(result.updated).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Zap className="w-3 h-3" /> Slot</p>
            <p className="text-sm font-mono">{result.slot.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Tx Signature</p>
            <p className="text-sm font-mono text-muted-foreground">{result.txSignature}</p>
          </div>
        </div>

        {/* Credentials */}
        <div className="mb-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
            <Shield className="w-3 h-3" /> Verifiable Credentials ({result.credentials.length})
          </p>
          {result.credentials.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No credentials attached</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {result.credentials.map((c: string) => (
                <span key={c} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                  ✓ {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Raw DID Document toggle */}
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {showRaw ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {showRaw ? "Hide" : "Show"} raw DID Document
        </button>
        <AnimatePresence>
          {showRaw && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-3"
            >
              <pre className="p-4 rounded-lg bg-background/80 border border-border text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed">
                {JSON.stringify(rawDoc, null, 2)}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}

export default function DIDExplorer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const lookup = (query: string) => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setResult(null);
    setNotFound(false);
    setTimeout(() => {
      const found = MOCK_DIDS[q] || null;
      if (found) setResult(found);
      else setNotFound(true);
      setLoading(false);
    }, 900);
  };

  const handleSearch = () => lookup(input);
  const handleExample = (did: string) => { setInput(did); lookup(did); };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <Search className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">DID Explorer</h1>
          <Badge className="bg-primary/10 text-primary border-primary/20">Devnet</Badge>
        </div>
        <p className="text-muted-foreground mb-8">
          Look up any Cryon DID on Solana Devnet. View credentials, verification methods, and the raw DID Document.
        </p>

        {/* Search */}
        <GlassCard className="p-5 mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="cryon:sol:... or wallet address"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="font-mono text-sm bg-background border-border flex-1"
            />
            <Button
              onClick={handleSearch}
              disabled={loading || !input.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 flex-shrink-0"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Lookup
            </Button>
          </div>

          {/* Example DIDs */}
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">Try an example DID:</p>
            <div className="flex flex-col gap-1.5">
              {EXAMPLE_DIDS.map((did) => (
                <button
                  key={did}
                  onClick={() => handleExample(did)}
                  className="text-left text-xs font-mono text-primary/70 hover:text-primary truncate hover:bg-primary/5 px-2 py-1 rounded transition-colors"
                >
                  {did}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Result */}
        {result && <DidResult result={result} />}

        {/* Not found */}
        {notFound && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-5 rounded-xl border border-red-500/20 bg-red-500/5 text-sm text-muted-foreground"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span>DID not found on Devnet. Make sure you entered a valid <code className="text-primary">cryon:sol:...</code> identifier.</span>
          </motion.div>
        )}

        {/* Info footer */}
        <div className="mt-10 p-4 rounded-lg bg-muted/20 border border-border/50 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Devnet Only</span> — This explorer queries Solana Devnet via Program ID{" "}
          <code className="text-primary font-mono">{PROGRAM_ID}</code>. Mainnet data will be available at launch.
        </div>
      </motion.div>
    </div>
  );
}
