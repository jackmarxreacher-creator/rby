"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa';

interface BlogPost {
  title: string;
  coverImage: string | null;
  slug: string;
}

export default function Footer({ posts = [] }: { posts?: BlogPost[] }) {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-4 md:px-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1: Logo and Company Intro */}
        <div>
          <Link href="/" className="inline-flex items-center space-x-3 mb-4">
            <Image
              src="/images/logos/rby_color_logo.webp"
              alt="RBY Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-xl font-bold text-[#be965b] tracking-wide">
              RICKY BOAKYE YIADOM LTD.
            </span>
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            We are a trusted distribution brand committed to excellence and growth in the beverage sector, delivering value and service across Ghana.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#be965b]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#be965b]">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#be965b]">About Us</Link></li>
            <li><Link href="/products-services" className="hover:text-[#be965b]">Products & Services</Link></li>
            <li><Link href="/blog" className="hover:text-[#be965b]">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-[#be965b]">Contact</Link></li>
            <li><Link href="/login" className="hover:text-[#be965b]">CMS</Link></li>
            <li><Link href="/signup" className="hover:text-[#be965b]">Enter</Link></li>
          </ul>
        </div>

        {/* Column 3: Latest Blog Posts – PLAIN DATA */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#be965b]">Latest Blog Posts</h4>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug} className="flex items-start space-x-3">
                <Image
                  src={post.coverImage || "/default-image.jpg"}
                  alt={post.title}
                  width={50}
                  height={50}
                  className="rounded object-cover"
                />
                <Link href={`/blog/${post.slug}`} className="text-sm text-gray-300 hover:text-[#be965b]">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Social Media + Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#be965b]">Stay Connected</h4>
          <div className="flex space-x-4 mb-6 text-xl">
            <Link href="#" aria-label="Facebook"><FaFacebookF className="hover:text-[#be965b]" /></Link>
            <Link href="#" aria-label="Instagram"><FaInstagram className="hover:text-[#be965b]" /></Link>
            <Link href="#" aria-label="YouTube"><FaYoutube className="hover:text-[#be965b]" /></Link>
            <Link href="#" aria-label="TikTok"><FaTiktok className="hover:text-[#be965b]" /></Link>
            <Link href="#" aria-label="WhatsApp"><FaWhatsapp className="hover:text-[#be965b]" /></Link>
          </div>

          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded bg-neutral-900 text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#be965b] text-black font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-neutral-800 pt-4">
        &copy; {new Date().getFullYear()} RICKY BOAKYE YIADOM LTD. All rights reserved.
      </div>
    </footer>
  );
}



// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaYoutube,
//   FaTiktok,
//   FaWhatsapp,
// } from 'react-icons/fa';

// import { blogPosts } from '@/data/blogPosts';

// export default function Footer() {
//   const latestPosts = blogPosts.slice(0, 3);

//   return (
//     <footer className="bg-black text-white pt-12 pb-6 px-4 md:px-8 border-t border-neutral-800">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

//         {/* Column 1: Logo and Company Intro */}
//         <div>
//           <Link href="/" className="inline-flex items-center space-x-3 mb-4">
//             <Image
//               src="/images/logos/rby_color_logo.webp"
//               alt="RBY Logo"
//               width={50}
//               height={50}
//               className="object-contain"
//             />
//             <span className="text-xl font-bold text-[#be965b] tracking-wide">
//               RICKY BOAKYE YIADOM LTD.
//             </span>
//           </Link>
//           <p className="text-sm text-gray-400 mt-4">
//             We are a trusted distribution brand committed to excellence and growth in the beverage sector, delivering value and service across Ghana.
//           </p>
//         </div>

//         {/* Column 2: Quick Links */}
//         <div>
//           <h4 className="text-lg font-semibold mb-4 text-[#be965b]">
//             Quick Links
//           </h4>
//           <ul className="space-y-2 text-sm">
//             <li><Link href="/" className="hover:text-[#be965b]">Home</Link></li>
//             <li><Link href="/about" className="hover:text-[#be965b]">About Us</Link></li>
//             <li><Link href="/products-services" className="hover:text-[#be965b]">Products & Services</Link></li>
//             <li><Link href="/blog" className="hover:text-[#be965b]">Blog</Link></li>
//             <li><Link href="/contact" className="hover:text-[#be965b]">Contact</Link></li>
//             {/* ✅ Updated CMS link to point to Login */}
//             <li><Link href="/login" className="hover:text-[#be965b]">CMS</Link></li>
//             <li><Link href="/signup" className="hover:text-[#be965b]">Enter</Link></li>
//           </ul>
//         </div>

//         {/* Column 3: Latest Blog Posts */}
//         <div>
//           <h4 className="text-lg font-semibold mb-4 text-[#be965b]">
//             Latest Blog Posts
//           </h4>
//           <ul className="space-y-4">
//             {latestPosts.map((post, index) => (
//               <li key={index} className="flex items-start space-x-3">
//                 <Image
//                   src={post.image}
//                   alt={post.title}
//                   width={50}
//                   height={50}
//                   className="rounded object-cover"
//                 />
//                 <Link href={`/blog/${post.slug}`} className="text-sm text-gray-300 hover:text-[#be965b]">
//                   {post.title}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Column 4: Social Media + Newsletter */}
//         <div>
//           <h4 className="text-lg font-semibold mb-4 text-[#be965b]">
//             Stay Connected
//           </h4>
//           <div className="flex space-x-4 mb-6 text-xl">
//             <Link href="#" aria-label="Facebook"><FaFacebookF className="hover:text-[#be965b]" /></Link>
//             <Link href="#" aria-label="Instagram"><FaInstagram className="hover:text-[#be965b]" /></Link>
//             <Link href="#" aria-label="YouTube"><FaYoutube className="hover:text-[#be965b]" /></Link>
//             <Link href="#" aria-label="TikTok"><FaTiktok className="hover:text-[#be965b]" /></Link>
//             <Link href="#" aria-label="WhatsApp"><FaWhatsapp className="hover:text-[#be965b]" /></Link>
//           </div>

//           <form className="flex flex-col space-y-3">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="px-3 py-2 rounded bg-neutral-900 text-white placeholder-gray-500 focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="bg-[#be965b] text-black font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="mt-10 text-center text-xs text-gray-500 border-t border-neutral-800 pt-4">
//         &copy; {new Date().getFullYear()} RICKY BOAKYE YIADOM LTD. All rights reserved.
//       </div>
//     </footer>
//   );
// }





// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaYoutube,
//   FaTiktok,
//   FaWhatsapp,
// } from 'react-icons/fa';

// import { blogPosts } from '@/data/blogPosts';

// export default function Footer() {
//   const latestPosts = blogPosts.slice(0, 3);

//   return (
//     <footer className="bg-black text-white pt-12 pb-6 px-4 md:px-8 border-t border-neutral-800">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

//         {/* Column 1: Logo and Company Intro */}
//         <div>
//           <Link href="/" className="inline-flex items-center space-x-3 mb-4">
//             <Image
//               src="/images/logos/rby_color_logo.webp"
//               alt="RBY Logo"
//               width={50}
//               height={50}
//               className="object-contain"
//             />
//             <span className="text-xl font-bold text-[#be965b] tracking-wide">
//               RICKY BOAKYE YIADOM LTD.
//             </span>
//           </Link>
//           <p className="text-sm text-gray-400 mt-4">
//             We are a trusted distribution brand committed to excellence and growth in the beverage sector, delivering value and service across Ghana.
//           </p>
//         </div>

//         {/* Column 2: Quick Links */}
//         <div>
//           <h4 className="text-lg font-semibold mb-4 text-[#be965b]">
//             Quick Links
//           </h4>
//           <ul className="space-y-2 text-sm">
//             <li><Link href="/" className="hover:text-[#be965b]">Home</Link></li>
//             <li><Link href="/about" className="hover:text-[#be965b]">About Us</Link></li>
//             <li><Link href="/products-services" className="hover:text-[#be965b]">Products & Services</Link></li>
//             <li><Link href="/request" className="hover:text-[#be965b]">Request</Link></li>
//             <li><Link href="/blog" className="hover:text-[#be965b]">Blog</Link></li>
//             <li><Link href="/contact" className="hover:text-[#be965b]">Contact</Link></li>
//             {/* ✅ New CMS Link */}
//             <li><Link href="/cms" className="hover:text-[#be965b]">CMS</Link></li>
//           </ul>
//         </div>

//         {/* Column 3: Latest Blog Posts */}
//         <div>
//           <h4 className="text-lg font-semibold mb-4 text-[#be965b]">
//             Latest Blog Posts
//           </h4>
//           <ul className="space-y-4">
//             {latestPosts.map((post, index) => (
//               <li key={index} className="flex items-start space-x-3">
//                 <Image
//                   src={post.image}
//                   alt={post.title}
//                   width={50}
//                   height={50}
//                   className="rounded object-cover"
//                 />
//                 <Link href={`/blog/${post.slug}`} className="text-sm text-gray-300 hover:text-[#be965b]">
//                   {post.title}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Column 4: Social Media + Newsletter */}
//         <div>
//           <h4 className="text-lg font-semibold mb-4 text-[#be965b]">
//             Stay Connected
//           </h4>
//           <div className="flex space-x-4 mb-6 text-xl">
//             <Link href="#" aria-label="Facebook"><FaFacebookF className="hover:text-[#be965b]" /></Link>
//             <Link href="#" aria-label="Instagram"><FaInstagram className="hover:text-[#be965b]" /></Link>
//             <Link href="#" aria-label="YouTube"><FaYoutube className="hover:text-[#be965b]" /></Link>
//             <Link href="#" aria-label="TikTok"><FaTiktok className="hover:text-[#be965b]" /></Link>
//             <Link href="#" aria-label="WhatsApp"><FaWhatsapp className="hover:text-[#be965b]" /></Link>
//           </div>

//           <form className="flex flex-col space-y-3">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="px-3 py-2 rounded bg-neutral-900 text-white placeholder-gray-500 focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="bg-[#be965b] text-black font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="mt-10 text-center text-xs text-gray-500 border-t border-neutral-800 pt-4">
//         &copy; {new Date().getFullYear()} RICKY BOAKYE YIADOM LTD. All rights reserved.
//       </div>
//     </footer>
//   );
// }
