"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let scrollHandler: ((this: Window, ev: Event) => any) | null = null;

    const selector = 'section[data-hero], section#page-hero, .page-hero, .hero, section[role="banner"]';
    const heroEls = typeof document !== "undefined" ? Array.from(document.querySelectorAll<HTMLElement>(selector)) : [];

    if (heroEls.length > 0) {
      // Track visibility of each hero element. Header is transparent while any hero is visible.
      const visibility = new Map<HTMLElement, boolean>();
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibility.set(entry.target as HTMLElement, entry.isIntersecting);
          });
          const anyVisible = Array.from(visibility.values()).some(Boolean);
          setIsScrolled(!anyVisible);
        },
        { root: null, threshold: 0, rootMargin: '-64px 0px 0px 0px' }
      );

      heroEls.forEach((el) => {
        visibility.set(el, true);
        obs.observe(el);
      });

      observer = obs;
    } else {
      // fallback to scroll position
      const onScroll = () => setIsScrolled(window.scrollY > 12);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      scrollHandler = onScroll;
    }

    return () => {
      if (observer) observer.disconnect();
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler as any);
    };
  }, [pathname]);

  useEffect(() => {
    const cls = "header-scrolled";
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle(cls, isScrolled);
    }
    return () => {
      if (typeof document !== "undefined") document.documentElement.classList.remove(cls);
    };
  }, [isScrolled]);
  

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products-services", label: "Products & Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[var(--background)] text-[var(--foreground)] shadow-md' : 'bg-transparent text-white'}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="flex items-center" aria-label="Go to homepage">
          <Image src="/images/logos/rby_color_logo.webp" alt="RBY Logo" width={70} height={60} priority />
        </Link>

        <nav className="hidden md:flex items-center space-x-8 font-medium">
          {navItems.map((i) => (
            <Link key={i.href} href={i.href} className="hover:text-[#be965b] transition-colors duration-200">
              {i.label}
            </Link>
          ))}
          <Link href="/request" className={`inline-block bg-[#be965b] hover:bg-amber-600 px-4 py-2 rounded-md transition-colors ${isScrolled ? 'text-[var(--background)]' : 'text-white'}`}>
            Request Order
          </Link>
        </nav>

        <button onClick={() => setMenuOpen((s) => !s)} className="md:hidden focus:outline-none" aria-label="Toggle menu">
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

      {menuOpen && (
        <nav className={`md:hidden shadow-inner ${isScrolled ? 'bg-[var(--background)] text-[var(--foreground)]' : 'bg-black/80 text-white'}`}>
          <ul className="flex flex-col space-y-4 px-6 py-6 font-medium">
            {navItems.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="block hover:text-[#be965b] transition-colors duration-200" onClick={() => setMenuOpen(false)}>
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/request" className={`block bg-[#be965b] hover:bg-amber-600 px-4 py-2 rounded-md transition-colors ${isScrolled ? 'text-[var(--background)]' : 'text-white'}`} onClick={() => setMenuOpen(false)}>
                Request Order
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
