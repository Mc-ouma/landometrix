import Image from "next/image";
import HeroSection from "@/components/ui/HeroSection";
import ServicesSection from "@/components/ui/ServicesSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import BlogSection from "@/components/ui/BlogSection";
import CTASection from "@/components/ui/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      {/* Spacer element to ensure footer visibility */}
      <div className="h-24"></div>
    </div>
  );
}
