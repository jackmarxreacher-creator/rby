"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

interface Props {
  recent: { id: string; title: string; slug: string }[];
  counts: { category: string; count: number }[];
  activeCategory?: string;
}

export function BlogSidebarClient({ recent, counts, activeCategory }: Props) {
  const searchParams = useSearchParams();

  return (
    <aside>
      {/* Search */}
      <div className="bg-[#f3ede5] mb-10 p-6 rounded-xl shadow-md w-full max-w-sm">
        <h3 className="font-semibold text-gray-800 mb-2">Search Blog</h3>
        <input
          type="search"
          placeholder="Search articles..."
          className="w-full px-4 py-2 bg-[#fcfbf8] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
          aria-label="Search blog articles"
        />
      </div>

      {/* Categories with live counts + filter links */}
      <div className="bg-[#f3ede5] mb-10 p-6 rounded-xl shadow-md w-full max-w-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {counts.map(({ category, count }) => (
            <Link
              key={category}
              href={`/blog?category=${category}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-[#be965b] text-white"
                  : "bg-[#fcfbf8] text-gray-800 hover:text-white hover:bg-[#be965b]"
              }`}
            >
              {category} ({count})
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts – passed from server */}
      <div className="bg-[#f3ede5] p-6 rounded-xl shadow-md w-full max-w-sm mb-10">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Posts</h3>
        <ul className="space-y-2 text-gray-700">
          {recent.slice(0, 4).map((p) => (
            <li key={p.id}>
              <Link href={`/blog/${p.slug}`} className="hover:text-[#be965b]">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Social */}
      <div className="bg-[#f3ede5] text-gray-800 mb-10 p-6 rounded-xl shadow-md w-full max-w-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
        <div className="flex space-x-4 text-[#5c4b3f]">
          <Link href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
              <FaFacebookF size={18} />
            </div>
          </Link>
          <Link href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
              <FaInstagram size={18} />
            </div>
          </Link>
          <Link href="https://www.tiktok.com/@yourpage" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
              <FaTiktok size={18} />
            </div>
          </Link>
          <Link href="https://www.youtube.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
              <FaYoutube size={18} />
            </div>
          </Link>
          <Link href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
              <FaWhatsapp size={18} />
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}




// "use client";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTiktok,
//   FaYoutube,
//   FaWhatsapp,
// } from "react-icons/fa";

// interface Props {
//   recent: { id: string; title: string; slug: string }[];
//   counts: { category: string; count: number }[];
// }

// export function BlogSidebarClient({ recent, counts }: Props) {
//   const searchParams = useSearchParams();
//   const active = searchParams.get("category");

//   return (
//     <aside>
//       {/* Search */}
//       <div className="bg-[#f3ede5] mb-10 p-6 rounded-xl shadow-md w-full max-w-sm">
//         <h3 className="font-semibold text-gray-800 mb-2">Search Blog</h3>
//         <input
//           type="search"
//           placeholder="Search articles..."
//           className="w-full px-4 py-2 bg-[#fcfbf8] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           aria-label="Search blog articles"
//         />
//       </div>

//       {/* Categories with live counts + filter links */}
//       <div className="bg-[#f3ede5] mb-10 p-6 rounded-xl shadow-md w-full max-w-sm">
//         <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
//         <div className="flex flex-wrap gap-2">
//           {counts.map(({ category, count }) => (
//             <Link
//               key={category}
//               href={`/blog?category=${category}`}
//               className={`rounded-full px-3 py-1 text-sm font-medium transition ${
//                 active === category
//                   ? "bg-[#be965b] text-white"
//                   : "bg-[#fcfbf8] text-gray-800 hover:text-white hover:bg-[#be965b]"
//               }`}
//             >
//               {category} ({count})
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Recent Posts – passed from server */}
//       <div className="bg-[#f3ede5] p-6 rounded-xl shadow-md w-full max-w-sm mb-10">
//         <h3 className="font-semibold text-gray-800 mb-4">Recent Posts</h3>
//         <ul className="space-y-2 text-gray-700">
//           {recent.slice(0, 4).map((p) => (
//             <li key={p.id}>
//               <Link href={`/blog/${p.slug}`} className="hover:text-[#be965b]">
//                 {p.title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Social */}
//       <div className="bg-[#f3ede5] text-gray-800 mb-10 p-6 rounded-xl shadow-md w-full max-w-sm">
//         <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
//         <div className="flex space-x-4 text-[#5c4b3f]">
//           <Link href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
//             <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
//               <FaFacebookF size={18} />
//             </div>
//           </Link>
//           <Link href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
//             <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
//               <FaInstagram size={18} />
//             </div>
//           </Link>
//           <Link href="https://www.tiktok.com/@yourpage" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
//             <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
//               <FaTiktok size={18} />
//             </div>
//           </Link>
//           <Link href="https://www.youtube.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
//             <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
//               <FaYoutube size={18} />
//             </div>
//           </Link>
//           <Link href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
//             <div className="bg-[#be965b] text-white rounded-full p-3 flex items-center justify-center w-10 h-10 hover:bg-black transition-colors cursor-pointer">
//               <FaWhatsapp size={18} />
//             </div>
//           </Link>
//         </div>
//       </div>
//     </aside>
//   );
// }