"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@prisma/client";

interface Props {
  post: BlogPost;
}

export default function BlogCard({ post }: Props) {
  return (
    <div className="bg-[#f3ede5] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <Image
        src={post.coverImage || "/placeholder.jpg"}
        alt={post.title}
        width={500}
        height={300}
        className="w-full h-56 object-cover"
        priority={false}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#be965b] mb-2 hover:text-gray-800">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{post.subHeading || post.caption || ""}</p>
        <Link href={`/blog/${post.slug}`} className="text-[#be965b] font-medium hover:underline">
          Read More →
        </Link>
      </div>
    </div>
  );
}




// // app/blog/sections/BlogCard.tsx
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// type BlogCardProps = {
//   title: string;
//   excerpt: string;
//   image: string;
//   slug: string;
// };

// export default function BlogCard({ title, excerpt, image, slug }: BlogCardProps) {
//   return (
//     <div className="bg-[#f3ede5] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//       <Image
//         src={image}
//         alt={title}
//         width={500}
//         height={300}
//         className="w-full h-56 object-cover"
//         priority={false}
//       />
//       <div className="p-6">
//         <h3 className="text-xl font-semibold text-[#be965b] mb-2 hover:text-gray-800">{title}</h3>
//         <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
//         <Link
//           href={`/blog/${slug}`}
//           className="text-[#be965b] font-medium hover:underline"
//         >
//           Read More →
//         </Link>
//       </div>
//     </div>
//   );
// }

