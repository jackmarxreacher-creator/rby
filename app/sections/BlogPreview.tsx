"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  excerpt: string;
  coverImage?: string | null;
  slug: string;
}

interface Props {
  posts: BlogPost[];
  showCta?: boolean;
  isLoading?: boolean;
}

export default function BlogPreview({
  posts,
  showCta = true,
  isLoading = false,
}: Props) {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 bg-[#fcfbf8]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
          Latest News & Insights
        </h2>

        <div className="max-w-7xl mx-auto grid px-4 sm:px-6 md:px-8 lg:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white rounded-xl shadow-md p-6"
              >
                <div className="h-40 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
            ))
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative w-full h-48">
                    <Image
                      src={post.coverImage || "/default-image.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* button only when requested */}
        {!isLoading && showCta && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-[#be965b] text-white font-medium rounded-lg shadow hover:bg-[#a37f4d] transition"
            >
              View All Blog Posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}




// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";

// interface BlogPost {
//   title: string;
//   excerpt: string;
//   coverImage?: string | null;
//   slug: string;
// }

// export default function BlogPreview({
//   posts = [],
//   isLoading = false,
// }: {
//   posts: BlogPost[];
//   isLoading?: boolean;
// }) {
//   return (
//     <section className="py-16 px-4 sm:px-6 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
//           Latest News & Insights
//         </h2>

//         <div className="max-w-7xl mx-auto grid px-4 sm:px-6 md:px-8 lg:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center">
//           {isLoading ? (
//             Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="animate-pulse bg-white rounded-xl shadow-md p-6"
//               >
//                 <div className="h-40 bg-gray-300 rounded mb-4"></div>
//                 <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full"></div>
//               </div>
//             ))
//           ) : (
//             posts.map((post, index) => (
//               <motion.div
//                 key={post.slug}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <Link href={`/blog/${post.slug}`}>
//                   <div className="relative w-full h-48">
//                     <Image
//                       src={post.coverImage || "/default-image.jpg"}
//                       alt={post.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                       {post.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm line-clamp-3">
//                       {post.excerpt}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))
//           )}
//         </div>

//         {!isLoading && (
//           <div className="mt-12 text-center">
//             <Link
//               href="/blog"
//               className="inline-block px-6 py-3 bg-[#be965b] text-white font-medium rounded-lg shadow hover:bg-[#a37f4d] transition"
//             >
//               View All Blog Posts
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }




// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface BlogPost {
//   title: string;
//   excerpt: string;
//   coverImage?: string | null;
//   slug: string;
// }

// function generateExcerpt(text: string, length = 150): string {
//   if (!text) return '';
//   return text.length > length ? text.slice(0, length) + '...' : text;
// }

// export default function BlogPreview({
//   posts = [],
//   isLoading = false,
// }: {
//   posts: BlogPost[];
//   isLoading?: boolean;
// }) {
//   return (
//     <section className="py-16 px-4 sm:px-6 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
//           Latest News & Insights
//         </h2>

//         <div className="max-w-7xl mx-auto grid px-4 sm:px-6 md:px-8 lg:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center">
//           {isLoading ? (
//             Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="animate-pulse bg-white rounded-xl shadow-md p-6"
//               >
//                 <div className="h-40 bg-gray-300 rounded mb-4"></div>
//                 <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full"></div>
//               </div>
//             ))
//           ) : (
//             posts.map((post, index) => (
//               <motion.div
//                 key={post.slug}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <Link href={`/blog/${post.slug}`}>
//                   <div className="relative w-full h-48">
//                     <Image
//                       src={post.coverImage || '/default-image.jpg'}
//                       alt={post.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                       {post.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm line-clamp-3">
//                       {generateExcerpt(post.excerpt)}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))
//           )}
//         </div>

//         {!isLoading && (
//           <div className="mt-12 text-center">
//             <Link
//               href="/blog"
//               className="inline-block px-6 py-3 bg-[#be965b] text-white font-medium rounded-lg shadow hover:bg-[#a37f4d] transition"
//             >
//               View All Blog Posts
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }





// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface BlogPost {
//   title: string;
//   excerpt: string;
//   image: string;
//   slug: string;
// }

// export default function BlogPreview({
//   posts = [],
//   isLoading = false,
// }: {
//   posts: BlogPost[];
//   isLoading?: boolean;
// }) {
//   return (
//     <section className="py-16 px-4 sm:px-6 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
//           Latest News & Insights
//         </h2>

//         <div className="max-w-7xl mx-auto grid px-4 sm:px-6 md:px-8 lg:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center">
//           {isLoading ? (
//             Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="animate-pulse bg-white rounded-xl shadow-md p-6"
//               >
//                 <div className="h-40 bg-gray-300 rounded mb-4"></div>
//                 <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full"></div>
//               </div>
//             ))
//           ) : (
//             posts.map((post, index) => (
//               <motion.div
//                 key={post.slug}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <Link href={`/blog/${post.slug}`}>
//                   <div className="relative w-full h-48">
//                     <Image
//                       src={post.image}
//                       alt={post.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                       {post.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm line-clamp-3">
//                       {post.excerpt}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))
//           )}
//         </div>

//         {!isLoading && (
//           <div className="mt-12 text-center">
//             <Link
//               href="/blog"
//               className="inline-block px-6 py-3 bg-[#be965b] text-white font-medium rounded-lg shadow hover:bg-[#a37f4d] transition"
//             >
//               View All Blog Posts
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }




// 'use client';

// import { blogPosts } from '@/data/blogPosts';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface BlogPost {
//   title: string;
//   excerpt: string;
//   image: string;
//   slug: string;
// }

// export default function BlogPreview({
//   posts = [],
//   isLoading = false,
// }: {
//   posts: BlogPost[];
//   isLoading?: boolean;
// }) {
//   return (
//     <section className="py-16 px-4 sm:px-6 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
//           Latest News & Insights
//         </h2>

//         <div className="max-w-7xl mx-auto grid px-4 sm:px-6 md:px-8 lg:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center">
//           {isLoading ? (
//             Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="animate-pulse bg-white rounded-xl shadow-md p-6"
//               >
//                 <div className="h-40 bg-gray-300 rounded mb-4"></div>
//                 <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full"></div>
//               </div>
//             ))
//           ) : (
//             posts.map((post, index) => (
//               <motion.div
//                 key={post.slug}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <Link href={`/blog/${post.slug}`}>
//                   <div className="relative w-full h-48">
//                     <Image
//                       src={post.image}
//                       alt={post.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                       {post.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm line-clamp-3">
//                       {post.excerpt}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))
//           )}
//         </div>

//         {/* View All Button */}
//         {!isLoading && (
//           <div className="mt-12 text-center">
//             <Link
//               href="/blog"
//               className="inline-block px-6 py-3 bg-[#be965b] text-white font-medium rounded-lg shadow hover:bg-[#a37f4d] transition"
//             >
//               View All Blog Posts
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
