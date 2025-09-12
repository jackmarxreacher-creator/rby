// Welcome Section

'use client';

import { motion } from 'framer-motion';

export default function Welcome() {
  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl px-5 font-bold text-[#be965b] mb-6">
          Welcome to Ricky Boakye Yiadom Ltd.
        </h2>
        <p className="text-gray-700 text-base md:text-lg text-justify leading-relaxed">
          Ricky Boakye Yiadom Ltd has been a trusted name in beverage distribution across Ghana’s Ashanti Region since 1986.
          Built on a foundation of integrity, loyalty, and exceptional service, we proudly partner exclusively with Guinness 
          Ghana Breweries PLC. With modern facilities and nearly four decades of experience, we remain committed to delivering 
          quality products and personalized service to every community we serve.
        </p>
      </motion.div>
    </section>
  );
}
