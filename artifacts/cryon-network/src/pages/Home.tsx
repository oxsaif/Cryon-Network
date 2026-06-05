import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard, MotionGlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Shield, Zap, BrainCircuit, Activity, Network, ArrowRight } from "lucide-react";

export default function Home() {
  const [tps, setTps] = useState(65234);
  const [activeDids, setActiveDids] = useState(12845032);

  useEffect(() => {
    const tpsInterval = setInterval(() => {
      setTps((prev) => prev + Math.floor(Math.random() * 100) - 50);
    }, 2000);

    const didInterval = setInterval(() => {
      setActiveDids((prev) => prev + Math.floor(Math.random() * 10) + 1);
    }, 3500);

    return () => {
      clearInterval(tpsInterval);
      clearInterval(didInterval);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] -z-10 animate-pulse" style={{ animationDelay: "2s" }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400">
                Sovereign Identity for the Trustless Web
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              Cryon Network provides the foundational DID layer on Solana for users, DAOs, and AI agents.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,255,0.4)] w-full sm:w-auto h-14 px-8 text-lg font-semibold">
                Launch App
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-border hover:bg-muted group">
                Read Whitepaper <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 max-w-5xl mx-auto"
          >
            <GlassCard className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Network TPS</span>
                <span className="text-3xl font-bold text-primary font-mono">
                  <AnimatedCounter value={tps} format={(v) => v.toLocaleString()} />
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-8 md:pt-0">
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Active DIDs</span>
                <span className="text-3xl font-bold text-foreground font-mono">
                  <AnimatedCounter value={activeDids} format={(v) => v.toLocaleString()} />
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-8 md:pt-0">
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Avg Finality</span>
                <span className="text-3xl font-bold text-secondary font-mono">400ms</span>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card/50 border-y border-border relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Protocol Architecture</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Engineered for maximum scale and absolute security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionGlassCard
              glowColor="primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8"
            >
              <Shield className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-3">Sovereign Identity</h3>
              <p className="text-muted-foreground">
                Zero-knowledge proofs secure your identity. You own your data, verifiable on-chain without exposing private keys.
              </p>
            </MotionGlassCard>

            <MotionGlassCard
              glowColor="secondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8"
            >
              <Zap className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-semibold mb-3">Autonomous Payments</h3>
              <p className="text-muted-foreground">
                DIDs can hold and stream tokens instantly with sub-second finality using Solana's parallel execution engine.
              </p>
            </MotionGlassCard>

            <MotionGlassCard
              glowColor="primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8"
            >
              <BrainCircuit className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-3">AI Agent Compatibility</h3>
              <p className="text-muted-foreground">
                Native support for AI agents to possess DIDs, enabling trustless autonomous transactions and verifiable outputs.
              </p>
            </MotionGlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Build the Trustless Future</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of developers building next-generation applications on Cryon Network.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,255,0.4)] h-14 px-10 text-lg font-semibold">
            Start Building
          </Button>
        </div>
      </section>
    </div>
  );
}
