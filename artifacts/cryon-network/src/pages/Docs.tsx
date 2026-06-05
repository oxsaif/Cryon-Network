import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

export default function Docs() {
  const codeSnippet = `import { Connection, PublicKey } from "@solana/web3.js";
import { CryonDID } from "@cryon-network/sdk";

// Initialize connection to Solana cluster
const connection = new Connection("https://api.mainnet-beta.solana.com");

// Initialize Cryon SDK
const cryon = new CryonDID(connection);

// Resolve a DID document
const did = "did:cryon:sol:3N8...7K";
const doc = await cryon.resolve(did);

console.log("Resolved DID Document:", doc);`;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-24 border border-border bg-card rounded-lg p-4">
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">Getting Started</h3>
            <ul className="space-y-2 mb-8">
              <li><a href="#" className="text-primary text-sm font-medium">Installation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Quick Start</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Architecture</a></li>
            </ul>

            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">Core Concepts</h3>
            <ul className="space-y-2 mb-8">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">DID Resolution</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Verifiable Credentials</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">AI Agent Auth</a></li>
            </ul>

            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">API Reference</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">SDK Methods</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Smart Contracts</a></li>
            </ul>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl font-bold mb-4">Installation</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get started with the Cryon Network SDK for Solana in your Node.js or browser environment.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-foreground">Prerequisites</h2>
            <ul className="list-disc list-inside text-muted-foreground mb-8 space-y-2 pl-4">
              <li>Node.js v16+ or modern browser</li>
              <li>Basic understanding of Solana web3.js</li>
              <li>A Solana wallet or keypair</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-foreground">Install via NPM</h2>
            <GlassCard className="p-4 mb-8 bg-[#0d1117] border-border font-mono text-sm overflow-x-auto">
              <span className="text-primary mr-2">$</span>
              <span className="text-foreground">npm install @cryon-network/sdk @solana/web3.js</span>
            </GlassCard>

            <h2 className="text-2xl font-semibold mb-4 text-foreground">Basic Usage</h2>
            <p className="text-muted-foreground mb-4">
              Import the SDK and initialize it with a Solana connection to resolve your first DID.
            </p>
            
            <GlassCard className="mb-8 border-border bg-[#0d1117] overflow-hidden">
              <div className="flex items-center px-4 py-2 bg-black/40 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="ml-4 text-xs text-muted-foreground font-mono">example.ts</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                <code className="text-gray-300">
                  <span className="text-purple-400">import</span> {"{ Connection, PublicKey }"} <span className="text-purple-400">from</span> <span className="text-green-400">"@solana/web3.js"</span>;<br/>
                  <span className="text-purple-400">import</span> {"{ CryonDID }"} <span className="text-purple-400">from</span> <span className="text-green-400">"@cryon-network/sdk"</span>;<br/>
                  <br/>
                  <span className="text-gray-500">// Initialize connection to Solana cluster</span><br/>
                  <span className="text-purple-400">const</span> connection = <span className="text-purple-400">new</span> <span className="text-yellow-200">Connection</span>(<span className="text-green-400">"https://api.mainnet-beta.solana.com"</span>);<br/>
                  <br/>
                  <span className="text-gray-500">// Initialize Cryon SDK</span><br/>
                  <span className="text-purple-400">const</span> cryon = <span className="text-purple-400">new</span> <span className="text-yellow-200">CryonDID</span>(connection);<br/>
                  <br/>
                  <span className="text-gray-500">// Resolve a DID document</span><br/>
                  <span className="text-purple-400">const</span> did = <span className="text-green-400">"did:cryon:sol:3N8...7K"</span>;<br/>
                  <span className="text-purple-400">const</span> doc = <span className="text-purple-400">await</span> cryon.<span className="text-blue-300">resolve</span>(did);<br/>
                  <br/>
                  <span className="text-blue-300">console</span>.<span className="text-blue-300">log</span>(<span className="text-green-400">"Resolved DID Document:"</span>, doc);
                </code>
              </pre>
            </GlassCard>
            
          </motion.div>
        </main>
      </div>
    </div>
  );
}
