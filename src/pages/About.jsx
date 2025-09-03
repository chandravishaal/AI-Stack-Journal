import React, { useEffect, useState } from "react";
import {
  Brain,
  Code,
  Sparkles,
  Zap,
  Globe,
  User,
  Target,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Globe className="w-5 h-5" />,
      text: "Clean blog interface with posts management",
    },
    {
      icon: <Code className="w-5 h-5" />,
      text: "Admin dashboard for creating and editing posts",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Full-stack CRUD operations (working end-to-end)",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Minimal design for rapid iteration",
    },
  ];

  const futureFeatures = [
    {
      icon: <User className="w-5 h-5" />,
      text: "Authentication & role-based access control",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      text: "AI-assisted writing: auto-drafts, summaries, tone adjustments",
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Smart hybrid search: keyword + semantic search",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Source-aware answers with inline citations",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Production metrics & observability dashboards",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "CI/CD pipeline & production-grade reliability",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-600/10 dark:from-yellow-400/20 dark:to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-blue-700/10 dark:from-blue-500/20 dark:to-purple-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-400/5 to-blue-500/5 dark:from-yellow-400/10 dark:to-purple-500/10 rounded-full blur-2xl animate-bounce delay-2000"></div>
      </div>

      {/* Subtle grid background with fade effect */}
      <div
        className="absolute inset-0 z-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "86px 86px",
          maskImage: `linear-gradient(to bottom left, white, transparent 99%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gray-100/80 dark:bg-gradient-to-r dark:from-yellow-400/20 dark:to-purple-600/20 backdrop-blur-sm border border-gray-300 dark:border-yellow-400/30 px-4 py-2 rounded-full mb-6">
            <Brain className="w-4 h-4 dark:text-blue-600 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700  ">
              AI-Powered Publishing Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-yellow-400 dark:via-yellow-300 dark:to-purple-400 bg-clip-text text-transparent mb-6 leading-tight">
            AI Stack Journal
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            An experimental blog platform that blends traditional publishing
            with the power of artificial intelligence
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Why it exists */}
          <div
            className={`bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm border-2 border-transparent hover:border-blue-300 dark:hover:border-yellow-400/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-100 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-gradient-to-r dark:from-yellow-400/20 dark:to-purple-600/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Why It Exists
              </h2>
            </div>
            <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
              I started this project to sharpen my full-stack engineering skills
              and explore how AI can be integrated into everyday tools. Instead
              of just making another CRUD blog, the vision is to build an{" "}
              <span className="text-blue-600 dark:text-yellow-400 font-semibold">
                AI-native publishing system
              </span>{" "}
              that helps writers draft, summarize, fact-check, and optimize
              content in real time.
            </p>
          </div>

          {/* What it does now */}
          <div
            className={`bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm border-2 border-transparent hover:border-green-300 dark:hover:border-green-400/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-100 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 dark:bg-gradient-to-r dark:from-green-400/20 dark:to-blue-600/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Current Features
              </h2>
            </div>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  <div className="text-green-600 dark:text-green-400">
                    {feature.icon}
                  </div>
                  <span className="text-gray-600 dark:text-slate-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future Features */}
        <div
          className={`bg-blue-50/80 dark:bg-gradient-to-r dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-sm 
              border-2 border-transparent hover:border-blue-300 dark:hover:border-purple-800/50 
              rounded-2xl p-8 mb-16 shadow-md hover:shadow-xl 
              transition-all duration-300 delay-100 
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
        >
          <div className="flex  items-center gap-3 mb-8 justify-center">
            <div className="p-2 bg-purple-100 dark:bg-gradient-to-r dark:from-purple-400/20 dark:to-blue-600/20 rounded-lg">
              <ArrowRight className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900  ">
              What's Coming Next
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {futureFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/80 dark:bg-white/5 p-4 rounded-lg border border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-400/30 transition-colors cursor-pointer"
              >
                <div className="text-purple-600 dark:text-purple-400 mt-1">
                  {feature.icon}
                </div>
                <span className="text-gray-600 dark:text-slate-800 text-sm">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Section */}
        <div
          className={`bg-gradient-to-r from-yellow-400/10 to-purple-500/10 
              dark:bg-gradient-to-r dark:from-yellow-700/10 dark:to-purple-900/10 
              backdrop-blur-sm 
              border-2 border-transparent hover:border-yellow-400 dark:hover:border-purple-400/50 
              rounded-2xl p-8 text-center 
              shadow-md hover:shadow-xl 
              transition-all duration-300 delay-100 
              ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 dark:bg-gradient-to-r dark:from-yellow-400/20 dark:to-orange-600/20 rounded-full">
              <User className="w-8 h-8 text-orange-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Who Built It
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-slate-300 mb-4">
              <span className="text-blue-600 dark:text-yellow-400 font-bold">
                AI Stack Journal
              </span>{" "}
              is built and maintained by{" "}
              <span className="text-orange-600 dark:text-yellow-400 font-semibold">
                Chandra Vishal
              </span>
              , a 2024 engineering graduate and full-stack developer with
              experience as an Trainee SDE.
            </p>
            <p className="text-gray-500 dark:text-slate-400">
              This project is part of my journey to showcase real-world
              development skills while pushing myself deeper into applied AI.
            </p>

            <div className="flex justify-center mt-6">
              <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gradient-to-r dark:from-yellow-400/10 dark:to-purple-600/10 border border-gray-300 dark:border-yellow-400/30 px-6 py-3 rounded-full">
                <Code className="w-4 h-4 text-blue-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-700">
                  Full-Stack • AI Integration • Modern Development
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating CTA */}
        <div className="fixed bottom-6 right-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-yellow-400 dark:to-purple-600 p-1 rounded-full shadow-2xl hover:shadow-blue-400/25 dark:hover:shadow-yellow-400/25 transition-shadow">
            <div className="bg-white dark:bg-slate-900 rounded-full p-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <Brain className="w-6 h-6 text-gray-900 dark:text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
