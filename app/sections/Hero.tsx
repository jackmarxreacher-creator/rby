// Hero Section
'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      data-hero
      className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/images/banners/rby_hero.webp')` }} // Make sure the image is in the public folder
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white max-w-3xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Premium Beverage Distribution
        </h1>
        <p className="text-lg md:text-xl text-[#f3ede5] mb-6">
          Your trusted partner for quality beverages across Ghana
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/products-services" passHref>
          <Button variant="default">
            Explore Products
          </Button>
          </Link>
          <Link href="/request" passHref>
          <Button variant="outline">
            Place Order Now
          </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
