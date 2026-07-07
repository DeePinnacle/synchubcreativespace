import { AboutSection } from "@/components/sections/About-section";
import { EventHighlightsSection } from "@/components/sections/Event-Highlight";
import { HeroSection } from "@/features/home/components/hero-section";
import { SponsorshipSection } from "@/components/sections/SponsorshipSection";
import { CTASection } from "@/components/sections/cta-section";
import { PartnersStrip } from "@/features/home/components/partners-strip";
export default function Home() {
  return (
      <main>
        <HeroSection />
        {/* <PartnersStrip /> */}
        <AboutSection />
        <EventHighlightsSection />
        <SponsorshipSection />
        <CTASection />
      </main>
  );
}
