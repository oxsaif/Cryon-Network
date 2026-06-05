import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

export default function Whitepaper() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar TOC */}
        <aside className="lg:w-1/4 hidden lg:block">
          <div className="sticky top-24">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Contents</h3>
            <nav className="space-y-3 border-l-2 border-border pl-4">
              <a href="#abstract" className="block text-sm text-primary font-medium">Abstract</a>
              <a href="#problem" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">1. Problem Statement</a>
              <a href="#architecture" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">2. Architecture Overview</a>
              <a href="#protocol" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">3. Protocol Layers</a>
              <a href="#tokenomics" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">4. Tokenomics</a>
              <a href="#roadmap" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">5. Roadmap</a>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:w-3/4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Cryon Network Whitepaper</h1>
            <div className="flex gap-4 mb-12 border-b border-border pb-6">
              <span className="text-sm text-muted-foreground">Version 1.2.0</span>
              <span className="text-sm text-muted-foreground">Updated: October 2023</span>
            </div>

            <article className="prose prose-invert prose-blue max-w-none space-y-12">
              
              <section id="abstract">
                <h2 className="text-3xl font-semibold text-foreground mb-4">Abstract</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cryon Network introduces a decentralized, scalable identity (DID) layer built natively on Solana. 
                  By leveraging Solana's high-throughput architecture, Cryon enables sub-second identity verification 
                  and autonomous micropayments without the heavy overhead associated with traditional identity providers.
                </p>
              </section>

              <section id="problem">
                <h2 className="text-3xl font-semibold text-foreground mb-4 border-b border-border pb-2">1. Problem Statement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Current digital identity systems are fractured, centralized honeypots vulnerable to breaches. Web3 alternatives 
                  often suffer from high latency and prohibitive costs, making them unsuitable for real-time applications or AI agent integrations.
                </p>
              </section>

              <section id="architecture">
                <h2 className="text-3xl font-semibold text-foreground mb-4 border-b border-border pb-2">2. Architecture Overview</h2>
                <GlassCard className="p-6 mb-6">
                  <div className="flex items-center justify-center h-48 bg-muted/30 rounded-md border border-border/50">
                    <span className="text-muted-foreground font-mono text-sm">[Architecture Diagram Placeholder]</span>
                  </div>
                </GlassCard>
                <p className="text-muted-foreground leading-relaxed">
                  The Cryon architecture consists of three core components: the Identity Registry Program, the Verifiable Credential State Layer, and the Zero-Knowledge Verification Node Network.
                </p>
              </section>

              <section id="tokenomics">
                <h2 className="text-3xl font-semibold text-foreground mb-4 border-b border-border pb-2">4. Tokenomics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-2 text-primary">Ecosystem Treasury</h4>
                    <p className="text-3xl font-bold font-mono">40%</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-2 text-secondary">Core Contributors</h4>
                    <p className="text-3xl font-bold font-mono">20%</p>
                  </div>
                </div>
              </section>

            </article>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
