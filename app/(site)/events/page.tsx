import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Target, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
//   Instagram 
} from "lucide-react";

// Import your existing pre-built interactive components explicitly requested
import { EventHighlightsSection } from "@/components/sections/Event-Highlight";
import { SponsorshipSection } from "@/components/sections/SponsorshipSection";

// Client-interactive wrapper component for adding smooth Framer Motion elements 
// keeping within the Next.js Server Component boundaries by default.
import { ClientMotionWrapper } from "@/components/shared/Client-Motion-Wrapper";

export const metadata = {
  title: "Synchub Creative Week 2026 | Future Forward",
  description: "Official event platform for a six-day creative industries collective running 23–28 November 2026 at Synchub Creative Centre, Abuja.",
};

export default function SynchubCreativeWeekPage() {
  return (
    <div className="min-h-screen bg-off-white text-muted-gray selection:bg-[#4caf50]/30 selection:text-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-24 pb-16 md:px-12 border-b border-[#1a1a1a]">
        {/* Animated Radial Ambient Glows matching the Synchub palette */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#4caf50]/10 to-[#1e88e5]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <ClientMotionWrapper transitionType="fadeUp" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121212] border border-[#262626] text-xs font-semibold uppercase tracking-widest text-[#4caf50]">
                <Sparkles className="w-3.5 h-3.5 text-[#1e88e5] animate-pulse" />
                Theme: Future Forward
              </div>
            </ClientMotionWrapper>

            <ClientMotionWrapper transitionType="fadeUp" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Reimagining Africa&apos;s <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4caf50] to-[#1e88e5]">
                  Creative Power.
                </span>
              </h1>
            </ClientMotionWrapper>

            <ClientMotionWrapper transitionType="fadeUp" delay={0.3}>
              <p className="text-muted-gray text-base sm:text-lg max-w-xl text-[#b3b3b3] font-medium leading-relaxed">
                An exhilarating six-day event highlighting the convergence of art, technology, 
                entrepreneurship, and youth culture in Nigeria. Running 
                <span className="text-muted-gray font-semibold"> 23–28 November 2026</span> at the 
                Synchub Creative Centre, Abuja.
              </p>
            </ClientMotionWrapper>

            <ClientMotionWrapper transitionType="fadeUp" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link 
                  href="/tickets" 
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4caf50] to-[#1e88e5] text-xs font-extrabold tracking-wider text-[#0a0a0a] uppercase transition-all duration-300 hover:opacity-90 active:scale-[0.98] shadow-lg flex items-center gap-2"
                >
                  Get Your Tickets
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
                <a 
                  href="#sponsorship" 
                  className="px-6 py-3.5 rounded-xl bg-[#121212] border border-[#262626] text-xs font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-[#1a1a1a] hover:border-[#4caf50]/50"
                >
                  Become A Partner
                </a>
              </div>
            </ClientMotionWrapper>
          </div>

          {/* Interactive Visual Mosaic with Real-World Project Assets */}
          <div className="lg:col-span-5 relative w-full h-[450px] sm:h-[500px]">
            <ClientMotionWrapper transitionType="scaleUp" delay={0.3} className="w-full h-full relative">
              {/* Outer soft shadow background layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4caf50]/5 to-[#1e88e5]/5 rounded-3xl blur-xl" />
              
              {/* Primary Visual Showcase Card */}
              <div className="absolute top-4 left-4 w-[85%] h-[75%] rounded-2xl overflow-hidden border border-[#262626] shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#121212] group transition-all duration-500 hover:border-[#4caf50]/40">
                <Image
                  src="/images/creative-community.jpeg" 
                  alt="Synchub Creative Collective Community"
                  fill
                  priority
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] uppercase tracking-widest text-[#4caf50] font-bold">Live Collective</p>
                  <p className="text-xs font-bold text-white">Join 2,000+ In-Person Visionaries</p>
                </div>
              </div>

              {/* Offset Overlapping Creative Workshop Card */}
              <div className="absolute bottom-4 right-4 w-[65%] h-[55%] rounded-2xl overflow-hidden border border-[#262626] shadow-[0_12px_40px_rgba(0,0,0,0.7)] bg-[#121212] group transition-all duration-500 hover:border-[#1e88e5]/40">
                <Image
                  src="/images/art-therapy.jpeg" 
                  alt="Creative Design & Art Studio Session"
                  fill
                  className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] uppercase tracking-widest text-[#1e88e5] font-bold">Masterclasses</p>
                  <p className="text-xs font-bold text-white">Studio Art & Tech Workshops</p>
                </div>
              </div>
            </ClientMotionWrapper>
          </div>
        </div>
      </section>

      {/* 2. CORE METRICS / SUMMARY SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-b border-[#1a1a1a]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1e88e5]">Ecosystem Matrix</span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Why Engage With Synchub Creative Week?
            </h2>
            <p className="text-[#a3a3a3] text-sm leading-relaxed">
              As Nigeria cements its status as Africa&apos;s creative hub, Synchub Creative Week offers an elite 
              conduit for brands to directly engage with the fastest-growing demographic: the new generation of 
              digitally-native creative specialists, creative technology developers, and cultural innovators.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Users, label: "Massive Reach", text: "Over 2,000+ in-person summit attendees expected across the 6 days." },
              { icon: TrendingUp, label: "Digital Footprint", text: "Targeting 15,000+ digital media impressions traversing modern platforms." },
              { icon: Target, label: "Targeted Influence", text: "Immersive direct channels to cross-functional Gen Z and Millennial audiences." },
              { icon: Award, label: "Brand Equity", text: "Deep Corporate Social Responsibility configuration with absolute youth empowerment." }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-5 rounded-2xl bg-[#121212] border border-[#1f1f1f] transition-all duration-300 hover:border-[#262626] hover:translate-y-[-2px] group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center border border-[#262626] group-hover:border-[#4caf50]/40 transition-colors">
                  <stat.icon className="w-5 h-5 text-[#4caf50]" />
                </div>
                <h3 className="text-sm font-bold text-white mt-4 mb-1">{stat.label}</h3>
                <p className="text-xs text-[#a3a3a3] leading-relaxed">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EVENT SCHEDULE SECTION (Utilizing existing component module) */}
      <div id="schedule" className="bg-[#0f0f0f] border-b border-[#1a1a1a]">
        <EventHighlightsSection />
      </div>

      {/* 4. MISSION & MEDIA BRAND IMPACT STRIP */}
      <section className="py-24 px-6 relative overflow-hidden border-b border-[#1a1a1a]">
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-[#1e88e5]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative h-[380px] rounded-3xl overflow-hidden border border-[#262626] group order-last lg:order-first">
            <Image 
              src="/images/runway-glam.jpeg" 
              alt="Synchub Runway Fashion and Performance Showcase"
              fill
              className="object-cover brightness-[0.85] group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>

          <div className="space-y-6">
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50]">
              The 1 Million Creatives Catalyst
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              A Permanent Foundation Beyond The Event
            </h2>
            <p className="text-sm text-[#b3b3b3] leading-relaxed">
              Synchub Creative Week isn&apos;t just an annual milestone—it functions as the primary operational showcase 
              for the stable development framework of the Synchub Creative Centre brand ecosystem. 
            </p>
            <p className="text-sm text-[#b3b3b3] leading-relaxed">
              Our ongoing organizational focus supports the acceleration of micro-studios, technological literacy 
              across visual fields, global market distribution networks, and actionable mentorship frameworks for local builders.
            </p>
            <div className="pt-2">
              <Link 
                href="/support-us" 
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1e88e5] hover:text-[#4caf50] transition-colors uppercase tracking-wider"
              >
                Learn About Our Long-Term Ecosystem Mission
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
        </div>
      </section>

      {/* 5. SPONSORSHIP SEGMENT (Utilizing existing components module) */}
      <div id="sponsorship" className="border-b border-[#1a1a1a]">
        <SponsorshipSection />
      </div>

      {/* 6. IMMERSIVE COMPACT CALL TO ACTION & CONTACT MAP FOOTER */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#121212] via-[#0f0f0f] to-[#121212] border border-[#262626] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#4caf50]/10 to-[#1e88e5]/10 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Ready to Shape Africa&apos;s Creative Economy?
              </h3>
              <p className="text-xs text-[#a3a3a3] max-w-xl leading-relaxed">
                Connect directly with execution leadership to arrange bespoke physical footprints, programmatic activations, 
                key executive speaking tracks, or customized cross-channel brand alignments.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs text-[#d4d4d4]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#4caf50] shrink-0 mt-0.5" />
                  <span>
                    1st Floor, Kojo Motors Building,<br />
                    Mabushi, Abuja, Nigeria.
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#1e88e5]" />
                    <a href="mailto:thesynchub@gmail.com" className="hover:underline">thesynchub@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#4caf50]" />
                    <span>+234 817 238 8080</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 w-full flex flex-col sm:flex-row lg:flex-col gap-3 lg:pt-4">
              <Link 
                href="/sponsorship" 
                className="flex-1 text-center py-3.5 px-6 rounded-xl bg-[#f5f5f5] text-[#0a0a0a] text-xs font-extrabold uppercase tracking-wider hover:bg-white transition-all duration-300"
              >
                Submit Partnership Intent
              </Link>
              <a 
                href="https://instagram.com/thesynchub" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1a1a1a] border border-[#262626] text-xs font-bold text-white uppercase tracking-wider hover:bg-[#222] transition-all duration-300"
              >
                {/* <Instagram className="w-4 h-4 text-[#e1306c]" /> */}
                Follow @thesynchub
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-[#1f1f1f] text-center text-[10px] text-[#737373] tracking-wider uppercase">
            &copy; 2026 Synchub Creative Centre. All Rights Reserved. Hub Platform Environment V1.0.0
          </div>
        </div>
      </section>

    </div>
  );
}