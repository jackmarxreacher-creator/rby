'use client';

import {
  HandRaisedIcon,
  HeartIcon,
  ShieldCheckIcon,
  BoltIcon,
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function AboutPrinciples() {
  return (
    <section className="relative py-16 px-4 md:px-8 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banners/office.jpg" // replace with your preferred image path
          alt="Mission and Values Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-[#be965b] mb-3">Our Mission</h2>
          <p>
            To provide unique service delivery where tailor-made services are within the reach of customers,
            irrespective of their location, while establishing successful relationships with our customers and suppliers.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>whoweare.webp
          <h2 className="text-3xl font-bold text-[#be965b] mb-3">Our Vision</h2>
          <p>To be the hallmark of excellence in the distributorship industry.</p>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
          <h2 className="text-3xl font-bold text-[#be965b] mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <HandRaisedIcon className="w-8 h-8 text-[#be965b] flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Respect</h3>
                <p>We treat all our customers, suppliers, and team members with dignity and respect.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <HeartIcon className="w-8 h-8 text-[#be965b] flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Loyalty</h3>
                <p>We demonstrate unwavering loyalty to our partners and customers, as evidenced by our 39-year exclusive partnership with Guinness Ghana.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheckIcon className="w-8 h-8 text-[#be965b] flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Integrity</h3>
                <p>We conduct our business with the highest ethical standards and transparency in all our dealings.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <BoltIcon className="w-8 h-8 text-[#be965b] flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Hard Work</h3>
                <p>We are committed to diligent effort and dedication in delivering exceptional service to our customers.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
          <h2 className="text-3xl font-bold text-[#be965b] mb-3">Our Commitment</h2>
          <p>
            With nearly four decades of experience in the beverage distribution industry, Ricky Boakye Yiadom Ltd
            remains committed to delivering exceptional service to our customers across the Ashanti Region.
          </p>
          <p className="mt-3">
            Our modern facilities, experienced team, and strong partnerships position us to meet the evolving needs of our
            market while maintaining the personal touch that has defined our success since 1986.
          </p>
          <p className="mt-2 font-semibold italic text-[#be965b]">
            Ricky Boakye Yiadom Ltd – Your trusted partner in beverage distribution since 1986.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
