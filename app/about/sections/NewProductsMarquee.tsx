"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { newProducts as fallbackProducts } from '@/data/newProducts';
import { motion, useAnimation } from 'framer-motion';

type Item = { id?: string; name: string; image: string };

export default function NewProductsMarquee({ products }: { products?: Item[] }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: {
        ease: 'linear',
        duration: 40,
        repeat: Infinity,
      },
    });
  }, [controls]);

  const source = products && products.length ? products : fallbackProducts;
  const duplicated = [...source, ...source]; // seamless loop

  return (
    <section className="bg-[#f3ede5] py-6 overflow-hidden border-t border-[#e2d9cd]">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() =>
          controls.start({
            x: ['0%', '-50%'],
            transition: {
              ease: 'linear',
              duration: 40,
              repeat: Infinity,
            },
          })
        }
      >
        <motion.div
          className="flex gap-10 w-max items-center"
          animate={controls}
          initial={{ x: '0%' }}
        >
          {duplicated.map((product, index) => (
            <div key={index} className="flex items-center gap-4 min-w-[220px]">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#be965b] shadow-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-base font-medium text-gray-800" title={product.name}>
                {product.name.length > 10 ? `${product.name.slice(0, 10)}…` : product.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
