// RBY Intro

'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Intro() {
  return (
    <section className="bg-[#fcfbf8] py-16 px-4 md:px-12 sm:px-3">
      <div className="max-w-7xl mx-auto grid px-4 sm:px-6 md:px-8 lg:px-12 grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#be965b]">
            About Us
          </h2>
          <p className="text-base text-gray-700 text-justify leading-relaxed sm:px-0">
            Founded in August 1986 by visionary entrepreneur Kofi Boakye Yiadom, our company started its journey from a single store in Atonsu with a simple mission: to provide quality beverages to our community with exceptional service. Mr. Yiadom's dedication to customer satisfaction and business excellence laid the foundation for what would become a thriving enterprise.
            In July 2016, marking a significant milestone in our growth trajectory, we transitioned from a sole proprietorship to a limited liability company, formalizing our commitment to professional business practices and sustainable growth.
          </p>
          <Button variant="outline">
            Read More
          </Button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/banners/whoweare.webp"
              alt="About RBY"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
