'use client';

import Image from 'next/image';
import { rbyBrands } from '@/data/rbyBrands';
import { motion, easeInOut } from 'framer-motion'; // ← import typed easing

export default function Brands() {
  const count = rbyBrands.length;
  const lastRowCount = count % 8 || 8; // how many tiles in last row
  const startIndex = count - lastRowCount;

  const fadeIn = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: easeInOut, // ← fixed easing
      },
    }),
  };

  return (
    <section className="bg-[#f9f4ee] py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-[#be965b] mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Brands
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 place-items-center">
          {rbyBrands.map((brand, idx) => {
            const isInLastRow = idx >= startIndex;
            const isFirstInLastRow = idx === startIndex;
            const colStartClass =
              isFirstInLastRow && lastRowCount < 8
                ? `lg:col-start-${Math.floor((8 - lastRowCount) / 2) + 1}`
                : '';

            return (
              <motion.div
                key={idx}
                className={`bg-white w-full aspect-[3/2] flex items-center justify-center rounded-md shadow-sm p-4 
                transform transition duration-300 hover:scale-105 hover:shadow-lg
                ${colStartClass}`}
                custom={idx}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative w-full h-full max-h-[50px] max-w-[80px] mx-auto filter hover:grayscale transition duration-500">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}




// 'use client';

// import Image from 'next/image';
// import { rbyBrands } from '@/data/rbyBrands';
// import { motion } from 'framer-motion';

// export default function Brands() {
//   const count = rbyBrands.length;
//   const lastRowCount = count % 8 || 8; // how many tiles in last row
//   const startIndex = count - lastRowCount;

//   const fadeIn = {
//     hidden: { opacity: 0, scale: 0.9, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.4,
//         ease: 'easeOut',
//       },
//     }),
//   };

//   return (
//     <section className="bg-[#f9f4ee] py-16 px-4 md:px-10">
//       <div className="max-w-6xl mx-auto text-center">
//         <motion.h2
//           className="text-2xl md:text-3xl font-bold text-[#be965b] mb-10"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           Our Brands
//         </motion.h2>

//         <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 place-items-center">
//           {rbyBrands.map((brand, idx) => {
//             const isInLastRow = idx >= startIndex;
//             const isFirstInLastRow = idx === startIndex;
//             const colStartClass =
//               isFirstInLastRow && lastRowCount < 8
//                 ? `lg:col-start-${Math.floor((8 - lastRowCount) / 2) + 1}`
//                 : '';

//             return (
//               <motion.div
//                 key={idx}
//                 className={`bg-white w-full aspect-[3/2] flex items-center justify-center rounded-md shadow-sm p-4 
//                 transform transition duration-300 hover:scale-105 hover:shadow-lg
//                 ${colStartClass}`}
//                 custom={idx}
//                 variants={fadeIn}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//               >
//                 <div className="relative w-full h-full max-h-[50px] max-w-[80px] mx-auto filter grayscale hover:grayscale-0 transition duration-500">
//                   <Image
//                     src={brand.image}
//                     alt={brand.name}
//                     fill
//                     loading="lazy"
//                     className="object-contain"
//                   />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
