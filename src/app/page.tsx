import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import Pricing from "@/components/sections/Pricing";
import Instructors from "@/components/sections/Instructors";
import Registration from "@/components/sections/Registration";
import Faq, { faqItems } from "@/components/sections/Faq";
import Locations from "@/components/sections/Locations";

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Hero />
      <Categories />
      <Pricing />
      <Instructors />
      <Registration />
      <Faq />
      <Locations />
    </>
  );
}
