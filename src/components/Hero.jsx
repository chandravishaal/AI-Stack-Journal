import { motion } from "framer-motion";
import CustomButton from "./CustomButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 text-center py-28">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 via-yellow-200/5 to-amber-300/10 dark:from-yellow-400/5 dark:via-yellow-500/5 dark:to-amber-600/5" />

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight"
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200">AI Stack</span>
          <span className="block text-amber-500 dark:text-yellow-400">
            Journal
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Discover cutting-edge stories and expert insights about
          <span className="text-amber-500 dark:text-yellow-400"> Artificial Intelligence</span>,
          web development, and the future of technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <CustomButton 
            to="/blog"
            variant="primary"
            className="w-full sm:w-auto  "
          >
            Explore Articles
          </CustomButton>
          
          <CustomButton 
            to="/about"
            variant="secondary"
            className="w-full sm:w-auto      "
          >
            Learn More
          </CustomButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { number: "50+", label: "AI Tutorials" },
            { number: "1000+", label: "Code Examples" },
            { number: "24/7", label: "Support" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-4 rounded-lg border border-amber-200/30 dark:border-yellow-400/20 bg-amber-50/50 dark:bg-yellow-400/5 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-amber-500 dark:text-yellow-400 mb-1">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}