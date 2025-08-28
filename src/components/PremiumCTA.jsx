// src/components/PremiumCTA.jsx
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";
import blogPosts from "../data/blogPosts";

/**
 * PremiumCTA - CTA going to the blog listing (or you can set to a featured post)
 * Props: headline, subtext, ctaText, ctaTo
 */
export default function PremiumCTA({
  headline = "Join AI Stack Journal",
  subtext = "Subscribe for curated guides and deep technical articles.",
  ctaText = "Subscribe",
  ctaTo = "/blog",
}) {
  const totalPosts = blogPosts.length;
  const featured = blogPosts[0];

  return (
    <motion.section
      className="relative rounded-3xl mx-auto max-w-6xl px-6 py-12 my-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">{headline}</h2>
        <p className="text-white/90 mt-3 max-w-2xl mx-auto">{subtext}</p>
        <div className="mt-6 text-white flex justify-center gap-4">
          <CustomButton to={ctaTo}>{ctaText}</CustomButton>
          {featured && (
            <CustomButton to={`/blog/${featured.id}`} className="bg-transparent">
              Featured
            </CustomButton>
          )}
          <div className="flex items-center text-white/90 text-sm font-medium">
            <span className="text-yellow-400 font-bold mr-2">{totalPosts}</span>
            <span>articles published</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />
    </motion.section>
  );
}
