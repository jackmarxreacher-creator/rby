'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Kwame Mensah',
    quote: 'RBY always delivers on time and with excellent customer care!',
    image: '/images/customers/Kwame_Mensah.jpg',
    rating: 5,
  },
  {
    name: 'Akosua Boateng',
    quote: 'A trusted partner for all our beverage needs. Highly recommended!',
    image: '/images/customers/Akosua_Boateng.webp',
    rating: 4,
  },
  {
    name: 'Yaw Ofori',
    quote: 'Fantastic wholesale pricing and reliable supply every month.',
    image: '/images/customers/Yaw_Ofori.jpg',
    rating: 5,
  },
  {
    name: 'Kofi George',
    quote: 'A trusted partner for all our beverage needs. Highly recommended!',
    image: '/images/customers/Kofi_George.jpg',
    rating: 5,
  },
  {
    name: 'Kofi Dankwa',
    quote: 'Fantastic wholesale pricing and reliable supply every month.',
    image: '/images/customers/Kofi_Dankwa.webp',
    rating: 4,
  },
  {
    name: 'Janet Siaw',
    quote: 'A trusted partner for all our beverage needs. Highly recommended!',
    image: '/images/customers/Janet_Siaw.webp',
    rating: 5,
  },
];

export default function Testimonials() {
  const repeated = [...testimonials, ...testimonials];
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: {
        ease: 'linear',
        duration: 60,
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <section className="bg-[#f3ede5] py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#be965b] mb-8 text-center">
          What Our Customers Say
        </h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() =>
            controls.start({
              x: ['0%', '-50%'],
              transition: {
                ease: 'linear',
                duration: 60,
                repeat: Infinity,
              },
            })
          }
        >
          <motion.div
            className="flex gap-8 w-max"
            animate={controls}
            initial={{ x: '0%' }}
          >
            {repeated.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 w-full max-w-[350px] mx-auto flex-shrink-0"
              >
                {/* Quote icon in background */}
                <div className="absolute text-[120px] text-gray-200 font-serif top-4 left-1/2 -translate-x-1/2 z-0 select-none leading-none">
                  &ldquo;
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                  {/* Horizontal row */}
                  <div className="flex items-center gap-4">
                    <div className="hover:ring-4 hover:ring-[#be965b] hover:scale-105 transition duration-300 rounded-full">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={96}
                        height={96}
                        className="rounded-full object-cover shadow"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#be965b]">
                        {testimonial.name}
                      </span>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500 text-sm">★</span>
                        ))}
                        {[...Array(5 - testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-gray-300 text-sm">★</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote below the row */}
                  <p className="text-gray-700 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

