// src/components/PremiumCTA.jsx
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";
import blogPosts from "../data/blogPosts";

export default function PremiumCTA({
  headline = "Level Up with Our Content",
  subtext = "Unlock exclusive articles, detailed guides, and advanced insights delivered directly to your inbox.",
  ctaText = "Get Started",
  ctaTo = "/subscribe",
}) {
  const totalPosts = blogPosts.length;

  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl mx-auto max-w-6xl p-8 md:p-12 my-12 bg-gray-950 dark:bg-gray-800 text-white shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 blur-3xl opacity-30 animate-pulse" />

      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          {headline}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-400">
          {subtext}
        </p>

        <div className="mt-8 flex justify-center items-center flex-col sm:flex-row gap-4">
          <CustomButton
            to={ctaTo}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {ctaText}
          </CustomButton>

          {totalPosts > 0 && (
            <p className="text-gray-500 text-sm font-medium mt-2 sm:mt-0">
              Trusted by {totalPosts} readers and counting.
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}