import { Hero } from "@/components/hero";
import { Countdown } from "@/components/countdown";
import { WhyBuy } from "@/components/why-buy";
import { Testimonials } from "@/components/testimonials";
import { PricingSection } from "@/components/pricing-section";
import { FAQ } from "@/components/faq-section";
import { FooterSection } from "@/components/footer";
import { StickyCTA } from "@/components/sticky-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown />
      <WhyBuy />
      <Testimonials />
      <PricingSection />
      <FAQ />
      <FooterSection />
      <StickyCTA />
      <div className="h-20 md:h-0" />
    </>
  );
}
