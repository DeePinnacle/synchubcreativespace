"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

interface Tier {
  name: string;
  amount: string;
  color: string;
  benefits: string[];
}

export function SponsorshipForm({ tiers }: { tiers: Tier[] }) {
  const [selectedTier, setSelectedTier] = useState<string>("Headline");
  const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "INVOICE">("ONLINE");

  const currentTierDetails = tiers.find((t) => t.name === selectedTier);

  return (
    <div className="space-y-8">
      {/* Interactive Selection Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tiers.map((tier) => (
          <button
            key={tier.name}
            type="button"
            onClick={() => setSelectedTier(tier.name)}
            className={`relative p-4 rounded-xl border text-left transition-all duration-300 group ${
              selectedTier === tier.name
                ? "bg-[#1a1a1a] border-[#1e88e5] shadow-[0_0_15px_rgba(30,136,229,0.15)]"
                : "bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#4caf50]/40"
            }`}
          >
            <div className="text-xs text-[#9e9e9e] font-medium tracking-wider mb-1">Tier</div>
            <div className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4caf50] group-hover:to-[#1e88e5] group-hover:bg-clip-text transition-all">
              {tier.name}
            </div>
            <div className="text-sm font-semibold text-[#e0e0e0] mt-2">{tier.amount}</div>
          </button>
        ))}
      </div>

      {/* Dynamic Benefits Reveal */}
      {currentTierDetails && (
        <motion.div
          key={selectedTier}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#161616] rounded-xl p-6 border border-[#212121]"
        >
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            Included {selectedTier} Deliverables
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentTierDetails.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start text-sm text-[#e0e0e0]">
                <Check className="w-4 h-4 text-[#4caf50] mr-2 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Processing Interface Options */}
      <form className="space-y-6 pt-4 border-t border-[#1a1a1a]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#9e9e9e] mb-2">Company Name</label>
            <input type="text" required className="w-full bg-[#0d0d0d] border border-[#212121] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1e88e5] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#9e9e9e] mb-2">Contact Corporate Email</label>
            <input type="email" required className="w-full bg-[#0d0d0d] border border-[#212121] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1e88e5] transition-colors" />
          </div>
        </div>

        {/* Action Strategy Decision Core */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#9e9e9e] mb-2">Fulfilment Route</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("ONLINE")}
              className={`p-3 rounded-lg border text-sm font-semibold transition-all ${
                paymentMethod === "ONLINE" ? "bg-[#1e88e5]/10 border-[#1e88e5] text-white" : "bg-[#0d0d0d] border-[#212121] text-[#9e9e9e]"
              }`}
            >
              Pay Securely Online
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("INVOICE")}
              className={`p-3 rounded-lg border text-sm font-semibold transition-all ${
                paymentMethod === "INVOICE" ? "bg-[#4caf50]/10 border-[#4caf50] text-white" : "bg-[#0d0d0d] border-[#212121] text-[#9e9e9e]"
              }`}
            >
              Request Corporate Invoice
            </button>
          </div>
        </div>

        {/* Complete Transaction Activation Vector */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#4caf50] to-[#1e88e5] hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(76,175,80,0.25)] text-center block"
        >
          {paymentMethod === "ONLINE" ? `Initialize Secure Gateway (${currentTierDetails?.amount})` : "Generate and Email Corporate Invoice"}
        </motion.button>
      </form>
    </div>
  );
}