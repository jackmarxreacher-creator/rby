'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  description?: string;
  backgroundImage: string;
}

export default function PageHero({
  title,
  description,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative w-full h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={`${title} Background`}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay color now #f3ede5 at 80% */}
        <div className="absolute inset-0 bg-[#000000]/50" />
      </div>

      {/* Text overlaid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-gray-200 text-lg md:text-xl">{description}</p>
        )}
      </motion.div>
    </section>
  );
}
