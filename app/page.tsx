import Image from "next/image";
import styles from "./page.module.css";
import { blogPosts } from "@/data/blogPosts";
import Hero from "@/app/sections/Hero";
import Welcome from "./sections/Welcome";
import Intro from "./sections/Intro";
import Testimonials from "./sections/Testimonials";
import BlogPreview from "./sections/BlogPreview";
import Brands from "./sections/RbyBrands";

export default function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <Intro />
      <Testimonials />
      <BlogPreview posts={blogPosts.slice(0, 3)}/>
      <Brands />
    </main>
  );
}
