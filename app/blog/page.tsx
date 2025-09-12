"use client";

import { useState, useMemo } from "react";
import PageHero from "@/app/common/PageHero";
import BlogList from "./sections/BlogList";
import { blogPosts } from "@/data/blogPosts";
import BlogSidebar from "./sections/BlogSidebar";
import BlogLayout from "./sections/BlogLayout";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering posts by search query (title or excerpt)
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    const q = searchQuery.toLowerCase();
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [currentPage, filteredPosts]);

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageHero
        title="Blog"
        description="News, updates and stories from Ricky Boakye Yiadom Ltd."
        backgroundImage="/images/banners/cm_za_captain_cola_float.png"
      />

      <section className="w-full bg-[#fcfbf8] mx-auto px-4 md:px-8 py-12">
        <BlogLayout>
          {/* Blog List (2 posts per row) */}
          <BlogList posts={currentPosts} />

          {/* Pass searchQuery and setSearchQuery to BlogSidebar */}
          <BlogSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </BlogLayout>
      </section>
    </>
  );
}