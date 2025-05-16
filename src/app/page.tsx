import Image from "next/image";
import HeroSection from "@/components/ui/HeroSection";
import ServicesSection from "@/components/ui/ServicesSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import BlogSection from "@/components/ui/BlogSection";
import CTASection from "@/components/ui/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </div>
  );
}
