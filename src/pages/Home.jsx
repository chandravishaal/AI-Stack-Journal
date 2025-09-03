// src/pages/HomePage.jsx
import Hero from "../components/Hero";
import FeatureStrip from "../components/FeatureStrip";
import MosaicGrid from "../components/MosaicGrid";
import PremiumCTA from "../components/PremiumCTA";
// import LatestPostsStrip from "../components/LatestPostsStrip";
import blogPosts from "../data/blogPosts";

export default function HomePage() {


  const tiles = blogPosts.slice(0, 2).map((p) => ({
    image: p.image,
    title: p.title,
    excerpt: p.excerpt,
  }));

  return (
    <div className="transition-colors duration-500">
      <Hero />

      {/* Feature strips (alternating) */}
      <FeatureStrip   />

      {/* Mosaic grid */}
      <MosaicGrid tiles={tiles} />

      {/* Premium CTA */}
      <PremiumCTA
        headline="Build smarter with AI Stack Journal"
        subtext="Subscribe for curated guides, tools, and deep technical articles — designed for developers and data scientists."
        ctaText="Subscribe"
        ctaTo="/subscribe"
      />

      {/* Latest posts */}
      {/* <LatestPostsStrip count={4} /> */}
    </div>
  );
}
