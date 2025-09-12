'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import BlogCard from './BlogCard';
import { blogPosts } from '@/data/blogPosts';

const POSTS_PER_PAGE = 6;

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const blogListRef = useRef<HTMLElement>(null);
  const pathname = usePathname(); // ✅ Detect route changes
  const isFirstLoad = useRef(true); // ✅ Track very first load

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    const q = searchQuery.toLowerCase();
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [currentPage, filteredPosts]);

  // ✅ Scroll to blog list only if it's NOT first load from navigation
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return; // Skip initial load from another page
    }

    if (blogListRef.current) {
      const elementTop = blogListRef.current.getBoundingClientRect().top;
      const scrollY = window.pageYOffset;
      const headerOffset = 80;
      const scrollToPosition = elementTop + scrollY - headerOffset;

      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
  }, [currentPage, searchQuery, pathname]); // 👈 Added pathname but guarded by isFirstLoad

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <section className="px-4 md:px-8" ref={blogListRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Articles</h2>
        <h3 className="text-gray-600 text-xl font-semibold mb-10">
          Stay updated with the latest news and insights from Ricky Boakye Yiadom Ltd.
        </h3>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => <BlogCard key={post.slug} {...post} />)
          ) : (
            <p className="text-center text-gray-600 col-span-full">No posts found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#be965b] text-white hover:bg-[#a37f4d]'
              } transition`}
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#be965b] text-white hover:bg-[#a37f4d]'
              } transition`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}




// 'use client';

// import { useState, useMemo, useRef, useEffect } from 'react';
// import BlogCard from './BlogCard';
// import { blogPosts } from '@/data/blogPosts';

// const POSTS_PER_PAGE = 6;

// export default function BlogList() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   const blogListRef = useRef<HTMLElement>(null);
//   const isFirstRender = useRef(true); // ✅ Track first render

//   const filteredPosts = useMemo(() => {
//     if (!searchQuery.trim()) return blogPosts;
//     const q = searchQuery.toLowerCase();
//     return blogPosts.filter(
//       (post) =>
//         post.title.toLowerCase().includes(q) ||
//         post.excerpt.toLowerCase().includes(q)
//     );
//   }, [searchQuery]);

//   const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

//   const currentPosts = useMemo(() => {
//     const start = (currentPage - 1) * POSTS_PER_PAGE;
//     return filteredPosts.slice(start, start + POSTS_PER_PAGE);
//   }, [currentPage, filteredPosts]);

//   // Scroll to top AFTER pagination changes — but skip first render
//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return; // ✅ Skip scrolling on initial page load
//     }

//     if (blogListRef.current) {
//       const elementTop = blogListRef.current.getBoundingClientRect().top;
//       const scrollY = window.pageYOffset;
//       const headerOffset = 80;
//       const scrollToPosition = elementTop + scrollY - headerOffset;

//       window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
//     }
//   }, [currentPage]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <section className="px-4 md:px-8" ref={blogListRef}>
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Articles</h2>
//         <h3 className="text-gray-600 text-xl font-semibold mb-10">
//           Stay updated with the latest news and insights from Ricky Boakye Yiadom Ltd.
//         </h3>

//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
//           {currentPosts.length > 0 ? (
//             currentPosts.map((post) => <BlogCard key={post.slug} {...post} />)
//           ) : (
//             <p className="text-center text-gray-600 col-span-full">No posts found.</p>
//           )}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center items-center space-x-4 mt-10">
//             <button
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded ${
//                 currentPage === 1
//                   ? 'bg-gray-300 cursor-not-allowed'
//                   : 'bg-[#be965b] text-white hover:bg-[#a37f4d]'
//               } transition`}
//             >
//               Previous
//             </button>

//             <span className="font-semibold">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded ${
//                 currentPage === totalPages
//                   ? 'bg-gray-300 cursor-not-allowed'
//                   : 'bg-[#be965b] text-white hover:bg-[#a37f4d]'
//               } transition`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }





// 'use client';

// import { useState, useMemo, useRef, useEffect } from 'react';
// import BlogCard from './BlogCard';
// import { blogPosts } from '@/data/blogPosts';

// const POSTS_PER_PAGE = 6;

// export default function BlogList() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   const blogListRef = useRef<HTMLElement>(null);

//   const filteredPosts = useMemo(() => {
//     if (!searchQuery.trim()) return blogPosts;
//     const q = searchQuery.toLowerCase();
//     return blogPosts.filter(
//       (post) =>
//         post.title.toLowerCase().includes(q) ||
//         post.excerpt.toLowerCase().includes(q)
//     );
//   }, [searchQuery]);

//   const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

//   const currentPosts = useMemo(() => {
//     const start = (currentPage - 1) * POSTS_PER_PAGE;
//     return filteredPosts.slice(start, start + POSTS_PER_PAGE);
//   }, [currentPage, filteredPosts]);

//   // Scroll to top after page changes
//   useEffect(() => {
//     if (blogListRef.current) {
//       const elementTop = blogListRef.current.getBoundingClientRect().top;
//       const scrollY = window.pageYOffset;
//       const headerOffset = 80; // Adjust if header is taller/shorter
//       const scrollToPosition = elementTop + scrollY - headerOffset;

//       window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
//     }
//   }, [currentPage]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <section className="px-4 md:px-8" ref={blogListRef}>
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Articles</h2>
//         <h3 className="text-gray-600 text-xl font-semibold mb-10">
//           Stay updated with the latest news and insights from Ricky Boakye Yiadom Ltd.
//         </h3>

//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
//           {currentPosts.length > 0 ? (
//             currentPosts.map((post) => <BlogCard key={post.slug} {...post} />)
//           ) : (
//             <p className="text-center text-gray-600 col-span-full">No posts found.</p>
//           )}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center items-center space-x-4 mt-10">
//             <button
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded ${
//                 currentPage === 1
//                   ? 'bg-gray-300 cursor-not-allowed'
//                   : 'bg-[#be965b] text-white hover:bg-[#a37f4d]'
//               } transition`}
//             >
//               Previous
//             </button>

//             <span className="font-semibold">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded ${
//                 currentPage === totalPages
//                   ? 'bg-gray-300 cursor-not-allowed'
//                   : 'bg-[#be965b] text-white hover:bg-[#a37f4d]'
//               } transition`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
