import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Activity, Users, Zap, ShieldCheck } from "lucide-react";

// Generate mock time-series data
const generateData = () => {
  const data = [];
  let tpsBase = 65000;
  let didBase = 12000000;
  
  for (let i = 24; i >= 0; i--) {
    data.push({
      time: `${i}h ago`,
      tps: tpsBase + Math.floor(Math.random() * 5000) - 2500,
      dids: didBase - (i * 15000) + Math.floor(Math.random() * 2000),
    });
  }
  return data;
};

export default function Metrics() {
  const [data, setData] = useState(generateData());
  const [currentTps, setCurrentTps] = useState(65234);
  const [currentDids, setCurrentDids] = useState(12845032);
  const [activeSessions, setActiveSessions] = useState(48291);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTps((prev) => prev + Math.floor(Math.random() * 200) - 100);
      setCurrentDids((prev) => prev + Math.floor(Math.random() * 5) + 1);
      setActiveSessions((prev) => prev + Math.floor(Math.random() * 100) - 50);
      
      // Occasionally update chart data
      if (Math.random() > 0.8) {
        setData(prev => {
          const newData = [...prev.slice(1)];
          newData.push({
            time: 'Now',
            tps: currentTps,
            dids: currentDids,
          });
          return newData;
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentTps, currentDids]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <Activity className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Network Metrics</h1>
          <div className="ml-4 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-500 font-medium uppercase tracking-wider">Mainnet Beta Active</span>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-6" glowColor="primary">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Current TPS</p>
                <h3 className="text-3xl font-mono font-bold text-foreground">
                  <AnimatedCounter value={currentTps} format={(v) => v.toLocaleString()} />
                </h3>
              </div>
              <Zap className="w-5 h-5 text-primary opacity-50" />
            </div>
            <div className="mt-4 flex items-center text-xs text-green-400">
              <span>+12.5% 24h</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6" glowColor="secondary">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Total DIDs</p>
                <h3 className="text-3xl font-mono font-bold text-foreground">
                  <AnimatedCounter value={currentDids} format={(v) => v.toLocaleString()} />
                </h3>
              </div>
              <Users className="w-5 h-5 text-secondary opacity-50" />
            </div>
            <div className="mt-4 flex items-center text-xs text-green-400">
              <span>+1,432 24h</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Active Sessions</p>
                <h3 className="text-3xl font-mono font-bold text-foreground">
                  <AnimatedCounter value={activeSessions} format={(v) => v.toLocaleString()} />
                </h3>
              </div>
              <Activity className="w-5 h-5 text-muted-foreground opacity-50" />
            </div>
            <div className="mt-4 flex items-center text-xs text-green-400">
              <span>+5.2% 24h</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Network Health</p>
                <h3 className="text-3xl font-mono font-bold text-green-500">
                  99.99%
                </h3>
              </div>
              <ShieldCheck className="w-5 h-5 text-green-500 opacity-50" />
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <span>Last 30 days</span>
            </div>
          </GlassCard>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-6">Transactions Per Second (24h)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--primary))' }}
                  />
                  <Area type="monotone" dataKey="tps" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-6">DID Growth (24h)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDids" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--secondary))' }}
                  />
                  <Area type="monotone" dataKey="dids" stroke="hsl(var(--secondary))" strokeWidth={2} fillOpacity={1} fill="url(#colorDids)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
}
