import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogPage from "../pages/BlogPage";
import HomePage from "../pages/Home";
import SingleBlogPage from "../pages/SingleBlogPage";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<SingleBlogPage />} />
      <Route path="/about" element={<About />} />


      
    </Routes>
  );
}


