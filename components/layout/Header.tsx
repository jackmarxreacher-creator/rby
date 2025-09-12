"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products-services", label: "Products & Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="select-none flex items-center" aria-label="Go to homepage">
          <Image
            src="/images/logos/rby_color_logo.webp"
            alt="RBY Logo"
            width={70}
            height={60}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-white">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-[#be965b] transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/request"
            className="inline-block bg-[#be965b] hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Request Order
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-black/80 backdrop-blur-md text-white shadow-inner">
          <ul className="flex flex-col space-y-4 px-6 py-6 font-medium">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block hover:text-[#be965b] transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/request"
                className="block bg-[#be965b] hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Request Order
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}







// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navItems = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About" },
//     { href: "/products-services", label: "Products & Services" },
//     { href: "/request", label: "Request" },
//     { href: "/gallery", label: "Gallery" },
//     { href: "/blog", label: "Blog" },
//     { href: "/contact", label: "Contact" },
//   ];

//   return (
//     <header className="absolute top-0 left-0 w-full z-50 bg-transparent text-white">
//       <div className="container mx-auto flex items-center justify-between py-4 px-6">
//         {/* Logo */}
//         <Link href="/" className="select-none flex items-center" aria-label="Go to homepage">
//           <Image
//             src="/images/logos/rby_color_logo.webp"
//             alt="RBY Logo"
//             width={70}
//             height={60}
//             priority
//           />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-8 font-medium text-white">
//           {navItems.map(({ href, label }) => (
//             <Link
//               key={href}
//               href={href}
//               className="hover:text-[#be965b] transition-colors duration-200"
//             >
//               {label}
//             </Link>
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-white focus:outline-none"
//           aria-label="Toggle menu"
//         >
//           {menuOpen ? (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           ) : (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Mobile Navigation Menu */}
//       {menuOpen && (
//         <nav className="md:hidden bg-black/80 backdrop-blur-md text-white shadow-inner">
//           <ul className="flex flex-col space-y-4 px-6 py-6 font-medium">
//             {navItems.map(({ href, label }) => (
//               <li key={href}>
//                 <Link
//                   href={href}
//                   className="block hover:text-[#be965b] transition-colors duration-200"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// }
