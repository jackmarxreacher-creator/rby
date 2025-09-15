'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CompanyProfile() {
  return (
    <section className="py-16 px-4 md:px-4 bg-[#f9f6f2]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
            {/* Text */}
            <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            >
            <h2 className="text-3xl md:text-4xl font-bold text-[#be965b] my-3">
                Our Story
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Ricky Boakye Yiadom Ltd stands as a testament to entrepreneurial vision, steady growth, and an unwavering commitment to excellence in beverage distribution across Ghana’s Ashanti Region. What began as a modest venture has evolved into one of the region's most trusted distribution partners.
            </p>
            <h3 className="text-xl md:text-xl font-bold text-[#be965b] my-3">
                Our Heritage
            </h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                'Founded in August 1986 by visionary entrepreneur Kofi Boakye Yiadom, our company started its journey from a single store in Atonsu with a simple mission: to provide quality beverages to our community with exceptional service. Mr. Yiadom's dedication to customer satisfaction and business excellence laid the foundation for what would become a thriving enterprise.'
            </p>
            </motion.div>
            
            {/* Image */}
            <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            >
            <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                src="/images/banners/about1.webp" // Replace with your actual image
                alt="RBY Company"
                fill
                className="object-cover"
                />
            </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            >
          <div className="max-w-5xl mx-auto grid">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                In July 2016, marking a significant milestone in our growth trajectory, we transitioned from a sole proprietorship to a limited liability company, formalizing our commitment to professional business practices and sustainable growth.
            </p>
            <h3 className="text-xl md:text-xl font-bold text-[#be965b] my-3">
                Our Evolution
            </h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              From our humble beginnings at a single store in Atonsu, we have undergone remarkable transformation. Today, we operate from an ultra-modern depot strategically located in Daban, Ashanti Region. This state-of-the-art facility represents our commitment to operational efficiency, product quality, and customer service excellence.    
            </p>
            <h3 className="text-xl md:text-xl font-bold text-[#be965b] my-3">
                Our Partnership
            </h3>
            <p className="text-gray-700  text-base md:text-lg leading-relaxed">
              We are proud to serve as a Key Distributor for Guinness Ghana Breweries PLC, one of Ghana’s most respected beverage companies. For the past 39 years, Ricky Boakye Yiadom Ltd has exclusively distributed Guinness products, making us the longest-serving distributor for Guinness Ghana. This remarkable partnership spans nearly four decades and reflects our proven track record in distribution excellence, market knowledge, and an unwavering commitment to maintaining the highest standards of product quality and customer service.    
            </p>
          </div>
          </motion.div>
    </section>
  );
}
