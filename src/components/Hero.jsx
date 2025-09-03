import { motion } from "framer-motion";
import CustomButton from "./CustomButton";
import { TypeAnimation } from 'react-type-animation';
import codeSnippets from "../data/codeSnippetsHero";


// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

const Hero = () => {




  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-sans transition-colors duration-500 dark:bg-gray-950 dark:text-gray-100">
      
      {/* Background Grid & Spotlight */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-0 transition-opacity duration-500">
        <div className="absolute inset-0 bg-grid-pattern-light" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/10 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow-1" />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow-2" />
      </div>

      {/* Main Content Area */}
      <motion.div
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Text and CTA */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight"
            >
              <span className="block text-gray-900 dark:text-white">Next-Level</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-500 transition-colors duration-500">
                AI Stack Journal
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Unleash the potential of cutting-edge technology with our professional solutions for AI, LLMs, and intelligent automation.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <CustomButton
                to="/blog"
                variant="primary"
                className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
              >
                What's New?
              </CustomButton>
              <CustomButton
                to="/about"
                variant="secondary"
                className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-full border border-gray-300 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Get in Touch
              </CustomButton>
            </motion.div>
          </div>
          
          {/* Faux AI Code Visualizer */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 flex items-center justify-center p-4 relative"
          >
            <div className="relative w-full max-w-lg h-96 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800/80 overflow-hidden">
              {/* Terminal Header */}
              <div className="w-full h-8 bg-gray-200 dark:bg-gray-800 flex items-center px-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-500">code-viz.ai</span>
              </div>
              
              {/* Code/Data Window with dynamic typing effect */}
              <div 
                className="p-6 h-full font-mono text-sm leading-6 overflow-y-auto"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                <TypeAnimation
                  sequence={codeSnippets}
                  wrapper="pre"
                  repeat={Infinity}
                  cursor={true}
                  preRenderFirstString={true}
                  speed={75}
                  className="text-black dark:text-white"
                  style={{ whiteSpace: 'pre-wrap', display: 'block' }}
                  omitDeletionAnimation={true}
                />
              </div>
              
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-blue-400/80 via-purple-400/80 to-pink-400/80 animate-border-pulse" />
            </div>
          </motion.div>
        </div>
        
        {/* Hardcoded Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center"
        >
          <motion.div variants={featureVariants} className="p-6 rounded-xl bg-gray-200/50 backdrop-blur-sm border border-gray-200 shadow-lg dark:bg-gray-800/50 dark:border-gray-800">
            <span className="text-3xl mb-3 block">🤖</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Advanced NLP</h3>
            <p className="text-gray-600 dark:text-gray-400">Process natural language with high accuracy.</p>
          </motion.div>
          
          <motion.div variants={featureVariants} className="p-6 rounded-xl bg-gray-200/50 backdrop-blur-sm border border-gray-200 shadow-lg dark:bg-gray-800/50 dark:border-gray-800">
            <span className="text-3xl mb-3 block">🚀</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hyper-Scalable</h3>
            <p className="text-gray-600 dark:text-gray-400">Deployable on any cloud infrastructure.</p>
          </motion.div>
          
          <motion.div variants={featureVariants} className="p-6 rounded-xl bg-gray-200/50 backdrop-blur-sm border border-gray-200 shadow-lg dark:bg-gray-800/50 dark:border-gray-800">
            <span className="text-3xl mb-3 block">🔐</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-400">End-to-end data encryption and privacy.</p>
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;