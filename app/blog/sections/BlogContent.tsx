"use client";

import { useState, useMemo } from "react";
import PageHero from "@/app/common/PageHero";
import BlogList from "./BlogList";
import { BlogSidebarClient } from "./BlogSidebarClient"; // pure client
import BlogLayout from "./BlogLayout";
import type { BlogPost } from "@prisma/client";

const POSTS_PER_PAGE = 6;

interface Props {
  initialPosts: BlogPost[];
  recent: { id: string; title: string; slug: string }[];
  counts: { category: string; count: number }[];
  activeCategory?: string;
}

export default function BlogContent({ initialPosts, recent, counts, activeCategory }: Props) {
  const [posts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ----  identical filter / pagination  ---- */
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.subHeading && p.subHeading.toLowerCase().includes(q)) ||
        (p.caption && p.caption.toLowerCase().includes(q))
    );
  }, [searchQuery, posts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [currentPage, filteredPosts]);

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
          <BlogList posts={currentPosts} total={filteredPosts.length} currentPage={currentPage} onPageChange={goToPage} />
          <BlogSidebarClient recent={recent} counts={counts} activeCategory={activeCategory} />
        </BlogLayout>
      </section>
    </>
  );
}



// "use client";

// import { useState, useMemo } from "react";
// import PageHero from "@/app/common/PageHero";
// import BlogList from "./BlogList";
// import { BlogSidebarServer } from "./BlogSidebarServer"; // ← NEW (server wrapper)
// import BlogLayout from "./BlogLayout";
// import type { BlogPost } from "@prisma/client";

// const POSTS_PER_PAGE = 6;

// interface Props {
//   initialPosts: BlogPost[];
// }

// export default function BlogContent({ initialPosts }: Props) {
//   const [posts] = useState(initialPosts); // client copy
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   /* ----  identical filter / pagination  ---- */
//   const filteredPosts = useMemo(() => {
//     if (!searchQuery.trim()) return posts;
//     const q = searchQuery.toLowerCase();
//     return posts.filter(
//       (p) =>
//         p.title.toLowerCase().includes(q) ||
//         (p.subHeading && p.subHeading.toLowerCase().includes(q)) ||
//         (p.caption && p.caption.toLowerCase().includes(q))
//     );
//   }, [searchQuery, posts]);

//   const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
//   const currentPosts = useMemo(() => {
//     const start = (currentPage - 1) * POSTS_PER_PAGE;
//     return filteredPosts.slice(start, start + POSTS_PER_PAGE);
//   }, [currentPage, filteredPosts]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <PageHero
//         title="Blog"
//         description="News, updates and stories from Ricky Boakye Yiadom Ltd."
//         backgroundImage="/images/banners/cm_za_captain_cola_float.png"
//       />

//       <section className="w-full bg-[#fcfbf8] mx-auto px-4 md:px-8 py-12">
//         <BlogLayout>
//           <BlogList posts={currentPosts} total={filteredPosts.length} currentPage={currentPage} onPageChange={goToPage} />
//           <BlogSidebarServer /> {/* ← server component (no async client) */}
//         </BlogLayout>
//       </section>
//     </>
//   );
// }




// "use client";

// import { useState, useMemo } from "react";
// import PageHero from "@/app/common/PageHero";
// import BlogList from "./BlogList";
// import BlogSidebar from "./BlogSidebar";
// import BlogLayout from "./BlogLayout";
// import type { BlogPost } from "@prisma/client";

// const POSTS_PER_PAGE = 6;

// interface Props {
//   initialPosts: BlogPost[];
// }

// export default function BlogContent({ initialPosts }: Props) {
//   const [posts] = useState(initialPosts); // client copy
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   /* ----  identical filter / pagination  ---- */
//   const filteredPosts = useMemo(() => {
//     if (!searchQuery.trim()) return posts;
//     const q = searchQuery.toLowerCase();
//     return posts.filter(
//       (p) =>
//         p.title.toLowerCase().includes(q) ||
//         (p.subHeading && p.subHeading.toLowerCase().includes(q)) ||
//         (p.caption && p.caption.toLowerCase().includes(q))
//     );
//   }, [searchQuery, posts]);

//   const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
//   const currentPosts = useMemo(() => {
//     const start = (currentPage - 1) * POSTS_PER_PAGE;
//     return filteredPosts.slice(start, start + POSTS_PER_PAGE);
//   }, [currentPage, filteredPosts]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <PageHero
//         title="Blog"
//         description="News, updates and stories from Ricky Boakye Yiadom Ltd."
//         backgroundImage="/images/banners/cm_za_captain_cola_float.png"
//       />

//       <section className="w-full bg-[#fcfbf8] mx-auto px-4 md:px-8 py-12">
//         <BlogLayout>
//           <BlogList posts={currentPosts} total={filteredPosts.length} currentPage={currentPage} onPageChange={goToPage} />
//           <BlogSidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//         </BlogLayout>
//       </section>
//     </>
//   );
// }