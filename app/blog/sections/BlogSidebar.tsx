'use client';

import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';

type BlogSidebarProps = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
};

// Categories array - you can later convert to dynamic if needed
const categories = [
  'Distribution',
  'Logistics',
  'Partnerships',
  'Innovation',
  'Sustainability',
];

// Social media links data with SVG icons

export default function BlogSidebar({ searchQuery, setSearchQuery }: BlogSidebarProps) {
  return (
    <aside>
      {/* Search Blog */}
      <div className="bg-[#f3ede5] mb-10 p-6 rounded-xl shadow-md w-full max-w-sm">
        <h3 className="font-semibold text-gray-800 mb-2">Search Blog</h3>
        <input
          type="search"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-[#fcfbf8] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
          aria-label="Search blog articles"
        />
      </div>

      {/* Recent Posts */}
      <div className="bg-[#f3ede5] p-6 rounded-xl shadow-md w-full max-w-sm mb-10">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Posts</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <Link href="/blog/guinness-national-promo" className="hover:text-[#be965b]">
              Guinness National Promotion Launch
            </Link>
          </li>
          <li>
            <Link href="/blog/retailer-training-event" className="hover:text-[#be965b]">
              Retailer Training Event – Accra
            </Link>
          </li>
          <li>
            <Link href="/blog/holiday-discounts" className="hover:text-[#be965b]">
              Holiday Discounts Are Here!
            </Link>
          </li>
          <li>
            <Link href="/blog/community-outreach-kumasi" className="hover:text-[#be965b]">
              Community Outreach in Kumasi
            </Link>
          </li>
        </ul>
      </div>

      {/* Categories */}
      <div className="bg-[#f3ede5] mb-10 p-6 rounded-xl shadow-md w-full max-w-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="bg-[#fcfbf8] text-gray-800 rounded-full px-3 py-1 text-sm font-medium transition hover:text-white hover:bg-[#be965b]"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Follow Us */}
          {/* Follow Us */}
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
