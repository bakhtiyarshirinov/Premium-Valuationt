import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { WhyUs } from "@/components/sections/why-us";
import { Team } from "@/components/sections/team";
import { AboutSnippet } from "@/components/sections/about-snippet";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Services />
        <Process />
        <WhyUs />
        <Team />
        <AboutSnippet />
        <CtaBanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
