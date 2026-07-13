import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/About-section";
import { AboutSections } from "@/components/sections/About-Sections";

export const metadata: Metadata = {
  title: "About Synchub Creative Centre | Empowering 1 Million Creatives",
  description:
    "Synchub Creative Centre is a creative hub in Abuja, Nigeria, on a mission to empower 1,000,000 creatives in five years. Read our story, our progress, and how to get involved.",
};

// Server Component: no interactivity of its own, just composes the
// homepage teaser with the client-rendered, animated About sections.
export default function AboutPage() {
  return (
    <main className="bg-background">
      {/* Reuses the homepage teaser as the page's opening beat — same
          story, now with room to go deeper below. */}
      <AboutSection />

      <AboutSections />
    </main>
  );
}