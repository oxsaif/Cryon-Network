import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard, MotionGlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  MessageSquare,
  Bug,
  Code2,
  HelpCircle,
  FileText,
  CheckCircle2,
  Clock,
  Zap,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const categories = [
  { icon: Bug, label: "Bug Report", value: "bug", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { icon: Code2, label: "Integration Help", value: "integration", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  { icon: HelpCircle, label: "General Question", value: "general", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { icon: FileText, label: "Documentation", value: "docs", color: "text-secondary", bg: "bg-secondary/10 border-secondary/20" },
];

const faqs = [
  {
    q: "How do I register a DID on Cryon Network?",
    a: "You can register a DID using our JavaScript SDK (npm install @cryon/did-sdk) or directly via the Cryon web app. Registration requires a Solana wallet and a small fee (~0.005 SOL). Your DID is anchored on-chain within 1-2 seconds.",
  },
  {
    q: "Is Cryon compatible with the W3C DID specification?",
    a: "Yes. Cryon implements the W3C DID Core 1.0 specification and publishes a conformance report. Our DID method (did:cryon:...) supports all standard DID document properties plus Cryon-specific extensions for on-chain credential anchoring and agent delegation.",
  },
  {
    q: "What wallets are supported for DID creation?",
    a: "Any Solana wallet is supported: Phantom, Solflare, Backpack, Ledger hardware wallets, and any wallet implementing the Solana Wallet Adapter standard. For programmatic use, you can also use a keypair directly via the SDK.",
  },
  {
    q: "How do micro-payment channels work with my DID?",
    a: "Cryon's payment channels are linked to your DID, meaning any party who resolves your DID can discover your payment endpoints automatically. Channels are opened with a small on-chain deposit and allow gasless, instant off-chain payments settled on Solana in batches.",
  },
  {
    q: "Can AI agents have their own Cryon DID?",
    a: "Yes, this is one of Cryon's core use cases. An AI agent can hold its own DID, publish verifiable credentials, sign attestations, and receive micro-payments autonomously — all without a human in the loop. See our AI Agent Integration Guide in the Docs.",
  },
  {
    q: "What is the CRY token and do I need it?",
    a: "CRY is Cryon's governance token, used for on-chain voting and protocol fee discounts. You do NOT need CRY to create a DID or use the protocol — SOL covers network fees. CRY is only needed if you want to participate in governance or unlock premium fee tiers.",
  },
  {
    q: "How do I revoke or update my DID document?",
    a: "DID documents can be updated or revoked at any time through the SDK (did.update({...}), did.deactivate()) or the web app. Updates require a wallet signature from the DID controller. Revocation is permanent and anchored on-chain.",
  },
  {
    q: "Are there rate limits on the DID resolution API?",
    a: "The public resolver has a default rate limit of 1,000 requests/minute per IP. For higher throughput, register an API key in the developer dashboard for up to 100,000 req/min, or run your own resolver node using our open-source implementation.",
  },
];

const resources = [
  { icon: BookOpen, label: "Documentation", desc: "Full technical docs, API reference, and SDK guides.", href: "/docs" },
  { icon: Code2, label: "GitHub", desc: "Open-source SDKs, smart contracts, and issue tracker.", href: "#" },
  { icon: MessageSquare, label: "Discord", desc: "Real-time developer support from the community.", href: "#" },
  { icon: FileText, label: "Status Page", desc: "Live network and API uptime status.", href: "#" },
];

const supportSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
});

type SupportForm = z.infer<typeof supportSchema>;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Support() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SupportForm>({
    resolver: zodResolver(supportSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", category: "" },
  });

  const onSubmit = (_data: SupportForm) => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-primary/15 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6 tracking-widest uppercase">
              Support
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
              We Are Here to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Help You Build.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Submit a ticket, browse the FAQ, or reach us directly. Our developer support team responds within 24 hours.
            </p>
          </motion.div>

          {/* Response SLA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            {[
              { icon: Zap, label: "Critical Bugs", value: "2h response" },
              { icon: Clock, label: "Integration Help", value: "24h response" },
              { icon: CheckCircle2, label: "General Questions", value: "48h response" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" />
                <span>{label}:</span>
                <span className="text-primary font-semibold">{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Contact Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category picker */}
            <motion.div {...fadeInUp}>
              <h2 className="text-xl font-bold text-foreground mb-4">Select a Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map(({ icon: Icon, label, value, color, bg }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setSelectedCategory(value);
                      form.setValue("category", value);
                    }}
                    data-testid={`button-category-${value}`}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${bg} ${
                      selectedCategory === value ? "ring-2 ring-primary/50 scale-105" : "hover:scale-102"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${color}`} />
                    <span className="text-xs font-semibold text-foreground">{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Ticket Submitted</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Your support request has been received. You will receive a confirmation at your email. Our team will respond within the SLA window.
                    </p>
                    <Button
                      className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => { setSubmitted(false); form.reset(); setSelectedCategory(""); }}
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Satoshi Nakamoto" className="bg-background border-border" data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Email Address</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="you@example.com" type="email" className="bg-background border-border" data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Subject</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Brief description of your issue" className="bg-background border-border" data-testid="input-subject" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Describe your issue in detail. Include SDK version, error messages, and steps to reproduce."
                                className="bg-background border-border min-h-[140px] resize-none"
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {form.formState.errors.category && (
                        <p className="text-sm text-destructive">Please select a support category above.</p>
                      )}
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,255,255,0.3)] h-12 text-base font-semibold"
                        data-testid="button-submit-ticket"
                      >
                        Submit Ticket
                      </Button>
                    </form>
                  </Form>
                )}
              </GlassCard>
            </motion.div>
          </div>

          {/* Right: Resources + status */}
          <div className="space-y-6">
            <motion.div {...fadeInUp}>
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Resources</h2>
              <div className="space-y-3">
                {resources.map(({ icon: Icon, label, desc, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all group cursor-pointer"
                    data-testid={`link-resource-${label}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {label} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* System status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <GlassCard className="p-5">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  System Status
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "DID Resolution API", status: "operational" },
                    { name: "Solana Mainnet RPC", status: "operational" },
                    { name: "Developer Dashboard", status: "operational" },
                    { name: "Payment Channels", status: "degraded" },
                    { name: "Smart Contracts", status: "operational" },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{s.name}</span>
                      <Badge
                        className={`text-xs border ${
                          s.status === "operational"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        }`}
                      >
                        {s.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Frequently Asked Questions
          </h2>
          <GlassCard className="p-6 md:p-8">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-lg px-5 bg-background/30"
                  data-testid={`accordion-faq-${i}`}
                >
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
