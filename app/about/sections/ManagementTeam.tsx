'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { managementTeam } from '@/data/managementTeam';

// Utility to truncate text by word count
function truncateWords(text: string, wordLimit: number) {
  const words = text.split(' ');
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function ManagementTeam() {
  const [selected, setSelected] = useState<any | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const ceo = managementTeam.find((p) => p.featured);
  const rest = managementTeam.filter((p) => !p.featured);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTooltipPosition({ x: e.clientX + 8, y: e.clientY + 4 });
    };

    if (hovered) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hovered]);

  return (
    <section className="py-20 px-4 md:px-8 bg-white relative">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[#be965b] mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Management Team
        </motion.h2>

        {/* CEO Card */}
        {ceo && (
          <motion.div
            className="flex justify-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <div
              onClick={() => setSelected(ceo)}
              onMouseEnter={() => setHovered(ceo.name)}
              onMouseLeave={() => setHovered(null)}
              className="group relative cursor-pointer bg-[#f9f4ee] p-10 rounded-xl shadow-lg max-w-md w-full text-center hover:shadow-xl transition duration-300"
            >
              <div className="transition transform hover:scale-105 inline-block rounded-full ring-4 ring-[#be965b]">
                <Image
                  src={ceo.image}
                  alt={ceo.name}
                  width={180}
                  height={180}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-5">{ceo.name}</h3>
              <p className="text-[#be965b] text-sm font-medium mb-3">{ceo.role}</p>
              <p className="text-sm text-gray-600">{truncateWords(ceo.bio, 30)}</p>
            </div>
          </motion.div>
        )}

        {/* Other Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {rest.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative bg-[#f9f4ee] rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg cursor-pointer transition duration-300"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index + 1}
              onClick={() => setSelected(member)}
              onMouseEnter={() => setHovered(member.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="transition transform hover:scale-105 inline-block rounded-full ring-4 ring-[#be965b]">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={130}
                  height={130}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">{member.name}</h3>
              <p className="text-[#be965b] text-sm font-medium mb-2">{member.role}</p>
              <p className="text-sm text-gray-600">{truncateWords(member.bio, 30)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div
          className="fixed z-50 px-3 py-1 text-xs text-white bg-black bg-opacity-80 rounded pointer-events-none transition-opacity duration-200"
          style={{
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
            transform: 'translateY(-100%)',
          }}
        >
          Click to view full profile
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] p-6 relative shadow-xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl font-bold"
              >
                &times;
              </button>
              <div className="rounded-full mx-auto mb-4 ring-4 ring-[#be965b] w-32 h-32 overflow-hidden">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center">{selected.name}</h3>
              <p className="text-[#be965b] text-sm font-medium mb-3 text-center">{selected.role}</p>
              <div className="text-sm text-gray-600 text-left overflow-y-auto max-h-[50vh] pr-2 whitespace-pre-line">
                {selected.bio}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}