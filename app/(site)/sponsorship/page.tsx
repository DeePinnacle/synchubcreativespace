import { Metadata } from "next";
import Image from "next/image";
import { SponsorshipForm } from "@/features/sponsorship/components/Sponsorship-Form";
// Assuming your homepage sponsorship display element is exported from sections
import { SponsorshipSection as HomeSponsorshipSection } from "@/components/sections/SponsorshipSection";

export const metadata: Metadata = {
  title: "Sponsor Us | Synchub Creative Week 2026",
  description: "Future Forward: Reimagining Africa's Creative Power. Partner with us across 4 distinct tiers.",
};

const tiers = [
  {
    name: "Headline",
    amount: "₦10,000,000",
    color: "from-[#4caf50] to-[#1e88e5]",
    benefits: [
      "Keynote speaking slot & prime panel placement",
      "Premium tier logo positioning on all digital/physical media",
      "Dedicated 3x3m exhibition pavilion space",
      "20 Full-Week VIP passes with backstage access",
      "Full page feature in the official event catalogue",
    ],
  },
  {
    name: "Gold",
    amount: "₦5,000,000",
    color: "from-[#4caf50] via-[#1e88e5] to-[#1e88e5]",
    benefits: [
      "Panel session presentation opportunity",
      "Prominent logo placement on Partners Wall & banners",
      "Standard exhibition booth space",
      "10 Full-Week VIP passes",
      "Half page feature in the official event catalogue",
    ],
  },
  {
    name: "Silver",
    amount: "₦3,000,000",
    color: "from-[#1e88e5] to-[#1a1a1a]",
    benefits: [
      "Logo branding on core event digital screens",
      "Standard logo placement on Partners Wall",
      "Shared exhibition promotional space",
      "5 Full-Week regular access passes",
    ],
  },
  {
    name: "Community",
    amount: "₦1,000,000",
    color: "from-[#212121] to-[#121212]",
    benefits: [
      "Logo integration on the official Partners Wall web portal",
      "Ackowledgement during closing showcase remarks",
      "2 Full-Week regular access passes",
    ],
  },
];

export default function SponsorshipPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f5f5f5] overflow-x-hidden pt-24 pb-16">
      {/* Cinematic Ambient Glow Layout */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#4caf50]/10 to-[#1e88e5]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#1e88e5]/5 to-[#4caf50]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Narrative Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent font-bold">
          Partner With Us
        </span>
        <h1 className="mt-3 text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Empower Africa’s Next <br />
          <span className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent">
            Creative Frontier
          </span>
        </h1>
        <p className="mt-6 text-lg text-[#9e9e9e] max-w-2xl mx-auto">
          Align your corporate identity with the future of African design, film, tech, and cultural media at the Synchub Creative Centre, Abuja. 
        </p>
      </section>

      {/* Atmospheric Visual Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="relative h-[350px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl group">
          <Image
            src="/images/venue-showcase.jpg" // Sourced real photography setup placeholder
            alt="Synchub Creative Centre Hub"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-white mb-2">The Permanent Home of 1 Million Creatives</h3>
            <p className="text-[#e0e0e0] max-w-xl text-sm sm:text-base">
              Beyond the high-impact scope of Creative Week 2026, your partnership establishes a permanent legacy anchor across our digital frameworks and internal technical ecosystems.
            </p>
          </div>
        </div>
      </section>

      {/* Blended Home Component View Integration (Optional overview block if structured presentational) */}
      <section className="mb-24 opacity-90 border-y border-[#1a1a1a] bg-[#121212]/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-center uppercase tracking-widest text-[#9e9e9e] mb-6">Tier Architecture Overview</p>
          {/* Invoking your pre-existing home matrix framework gracefully */}
          <HomeSponsorshipSection />
        </div>
      </section>

      {/* Main Core Form Application Segment */}
      <section id="apply-sponsorship" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#121212] rounded-2xl p-6 sm:p-12 border border-[#1a1a1a] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white">Select a Package</h2>
            <p className="text-[#9e9e9e] mt-2 text-sm">
              Complete your corporate credentials below. Payments initialized through verified gateways instantly clear your feature space on our active Partners Wall.
            </p>
          </div>

          {/* Smart Leaf Interaction Engine Layer */}
          <SponsorshipForm tiers={tiers} />
        </div>
      </section>
    </div>
  );
}