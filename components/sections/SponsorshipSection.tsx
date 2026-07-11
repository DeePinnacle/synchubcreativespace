"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, ArrowRight, X, Building2, ShieldCheck, Award, Users, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { WaveBg } from '../shared/Wave-Bg';

// Define the Sponsorship Tier interface
interface SponsorshipTier {
  id: string;
  name: string;
  priceNGN: string;
  priceUSD: string;
  tagline: string;
  icon: LucideIcon;
  color: string;
  benefits: string[];
  detailedDescription: string;
}

const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  {
    id: 'headline',
    name: 'Headline Partner',
    priceNGN: '₦10,000,000',
    priceUSD: '$7,320',
    tagline: "Ultimate brand ownership and top-tier ecosystem influence.",
    icon: ShieldCheck,
    color: '#4caf50',
    benefits: [
      'Category exclusivity and top-tier visibility',
      'Headline logo placement across all media platforms',
      'Full activation booth for all 6 days of the event',
      'Keynote speaking slot during the Grand Showcase & Awards',
      '10 VIP access passes with full executive benefits',
      'Custom targeted influencer campaign and PR distribution'
    ],
    detailedDescription: "As the Headline Partner, your brand becomes synonymous with Synchub Creative Week 2026. This tier offers unprecedented brand alignment, category exclusivity, and massive media real estate across all pre-event, live, and post-event touchpoints. Work directly with our production team to craft a custom influencer and media strategy that maximizes your organization's ROI."
  },
  {
    id: 'gold',
    name: 'Gold Partner',
    priceNGN: '₦5,000,000',
    priceUSD: '$3,660',
    tagline: "High-impact industry positioning and session integration.",
    icon: Award,
    color: '#1e88e5',
    benefits: [
      'Co-branded sessions, panels, or workshop tracks',
      'Premium booth access for 4 high-traffic days',
      'Dedicated press mentions and media highlights',
      '6 VIP access passes with networking lounge access',
      'Strategic social media campaign integration'
    ],
    detailedDescription: "The Gold Partnership is built for organizations looking to position themselves as key thought leaders. You will have the unique opportunity to co-curate specific panel tracks or workshops matching your industry focus, establishing direct engagement with Abuja's top creative tech talent and decision makers."
  },
  {
    id: 'silver',
    name: 'Silver Partner',
    priceNGN: '₦3,000,000',
    priceUSD: '$1,869',
    tagline: "Excellent brand presence and physical footprint.",
    icon: Building2,
    color: '#a855f7',
    benefits: [
      'Shared brand visibility across physical & digital collateral',
      'Dedicated exhibition booth for 2 key event days',
      '3 VIP event passes for your core executive team',
      'Official acknowledgment in event communications'
    ],
    detailedDescription: "Silver Partners gain a solid, tangible presence throughout the 6-day summit. With an exhibition booth on high-traffic days, your team can interact directly with hundreds of prospective clients, hires, and creative collaborators."
  },
  {
    id: 'community',
    name: 'Community Supporter',
    priceNGN: '₦1,000,000',
    priceUSD: '$732',
    tagline: "Grassroots support for Africa's emerging creative powerhouse.",
    icon: Users,
    color: '#06b6d4',
    benefits: [
      'Logo placement on digital flyers and marketing assets',
      'Official brand mention in post-event video website ecosystem',
      'Exclusive invitation to the private Sponsor Mixer event'
    ],
    detailedDescription: "Perfect for fast-growing startups, creative agencies, and regional brands looking to support the '1 Million Creatives' mission. This tier gives you clean digital visibility and vital networking access during our high-level closed-door networking sessions."
  }
];

export function SponsorshipSection() {
  const [selectedTier, setSelectedTier] = useState<SponsorshipTier | null>(null);

  return (
    <section className="relative w-full text-muted-gray bg-off-white py-20 px-4 md:px-8 overflow-hidden select-none">
      <WaveBg className="pointer-events-none absolute -top-10 left-0 z-0 h-[640px] w-full">
        
      </WaveBg>
      {/* Background Ambience / Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      {/* Decorative Motif */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#1e88e5_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Partner With Us
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-muted-gray mb-6">
            Future Forward: Reimagining Africa&apos;s <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Creative Power</span>
          </h2>
          <p className="text-muted-gray text-base md:text-lg leading-relaxed">
            Align your brand with the permanent home of African creativity. Drive premium corporate positioning, build direct visibility with market-shaping minds, and advance the 1 Million Creatives mission.
          </p>
        </motion.div>

        {/* Pricing/Sponsorship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SPONSORSHIP_TIERS.map((tier, index) => {
            const TierIcon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between bg-muted-gray border border-[#212121] hover:border-secondary/40 rounded-2xl p-6 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_40px_rgba(30,136,229,0.1)] overflow-hidden"
              >
                {/* Decorative border gradient glow top accent */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div>
                  {/* Header Title & Icons */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-xl bg-[#1a1a1a] border border-[#212121] group-hover:border-secondary/20 group-hover:bg-secondary/5 transition-colors">
                      <TierIcon className="w-6 h-6 text-[#f5f5f5] group-hover:text-primary transition-colors" style={{ color: tier.color }} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#f5f5f5] tracking-tight">{tier.priceNGN}</div>
                      <div className="text-xs font-semibold text-[#9e9e9e]">{tier.priceUSD}</div>
                    </div>
                  </div>

                  {/* Tier Title */}
                  <h3 className="text-xl font-bold text-[#f5f5f5] mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text transition-all duration-300">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#9e9e9e] line-clamp-2 mb-6 min-h-[32px]">
                    {tier.tagline}
                  </p>

                  <hr className="border-[#212121] mb-6" />

                  {/* Benefit Checklist */}
                  <ul className="space-y-3 mb-8">
                    {tier.benefits.slice(0, 4).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#e0e0e0]">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 border border-primary/30">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </span>
                        <span className="line-clamp-2">{benefit}</span>
                      </li>
                    ))}
                    {tier.benefits.length > 4 && (
                      <li className="text-xs text-[#9e9e9e] font-medium italic pl-7">
                        + {tier.benefits.length - 4} more premium perks
                      </li>
                    )}
                  </ul>
                </div>

                {/* Actions Section */}
                <div className="space-y-3 mt-auto pt-4 border-t border-[#212121]/50">
                  <Button
                    onClick={() => setSelectedTier(tier)}
                    className="w-full h-14 py-2.5 px-4 rounded-xl bg-[#1a1a1a] hover:bg-[#212121] text-xs font-bold text-[#e0e0e0] flex items-center justify-center gap-2 border border-[#212121] hover:border-[#9e9e9e]/30 transition-all duration-200"
                  >
                    <Info className="w-3.5 h-3.5" />
                    View Package Details
                  </Button>
                  
                  <Button className="w-full h-14 py-3 px-4 rounded-xl bg-linear-to-r from-primary to-secondary hover:opacity-90 text-xs font-extrabold text-[#0a0a0a] tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-md">
                    Select This Tier
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Custom / Invoice CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-16 bg-muted-gray border border-[#212121] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-secondary/5 to-transparent blur-3xl rounded-full pointer-events-none" />
          <div>
            <h4 className="text-lg font-bold text-[#f5f5f5] mb-2">Looking for a Bespoke Package or Invoice Payment?</h4>
            <p className="text-sm text-[#9e9e9e] max-w-2xl leading-relaxed">
              We provide customizable corporate sponsorships aligned directly with your strategic engagement goals, along with instant offline automated invoice rendering.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Button className="w-full h-14 sm:w-auto whitespace-nowrap py-3 px-6 rounded-xl bg-transparent hover:bg-[#1a1a1a] text-xs font-bold text-[#f5f5f5] border border-[#212121] hover:border-[#9e9e9e]/30 transition-all">
              Request Offline Invoice
            </Button>
            <Button className="w-full h-14 sm:w-auto whitespace-nowrap py-3 px-6 rounded-xl bg-linear-to-r from-primary to-secondary text-xs font-bold text-[#0a0a0a] hover:opacity-95 transition-all shadow-lg">
              Contact Partnership Team
            </Button>
          </div>
        </motion.div>

      </div>

      {/* Detail Overlay Modal / Drawer */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-[#121212] border border-[#212121] rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
            >
              {/* Header Visual Stripe */}
              <div className="h-2 w-full" style={{ backgroundColor: selectedTier.color }} />
              
              <Button
                onClick={() => setSelectedTier(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#212121] text-[#9e9e9e] hover:text-[#f5f5f5] border border-[#212121] transition-colors"
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="p-6 md:p-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between gap-4 border-b border-[#212121] pb-6 mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-[#f5f5f5] mb-1">{selectedTier.name}</h3>
                    <p className="text-sm text-[#9e9e9e] font-medium">{selectedTier.tagline}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-black text-[#f5f5f5] tracking-tight">{selectedTier.priceNGN}</div>
                    <div className="text-xs font-semibold text-[#9e9e9e]">{selectedTier.priceUSD}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase text-[#9e9e9e] tracking-wider mb-2">Program Overview</h4>
                  <p className="text-sm text-[#e0e0e0] leading-relaxed">
                    {selectedTier.detailedDescription}
                  </p>
                </div>

                {/* Complete Benefits List */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#9e9e9e] tracking-wider mb-3">All Deliverables & Perks</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedTier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#e0e0e0]">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 border border-primary/30">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action */}
                <div className="flex gap-4 items-center justify-end mt-8 pt-6 border-t border-[#212121]">
                  <Button
                    onClick={() => setSelectedTier(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#9e9e9e] hover:text-[#f5f5f5] transition-colors"
                  >
                    Close Window
                  </Button>
                  <Button className="py-3 px-6 rounded-xl bg-linear-to-r from-primary to-secondary text-xs font-extrabold text-[#0a0a0a] uppercase tracking-wider flex items-center gap-2 transition-all shadow-md">
                    Secure This Tier
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}