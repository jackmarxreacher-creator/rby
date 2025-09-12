"use client";

import { motion } from "framer-motion";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Props {
  mapUrl: string;
}

export default function ContactInteraction({ mapUrl }: Props) {
  return (
    <section className="relative w-full overflow-hidden text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banners/At-a-glance-jw.webp"
          alt="Contact Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#f3ede5]/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#be965b] mb-6">
              Send Us a Message
            </h2>

            <form className="flex flex-col flex-1">
              <div className="space-y-4 flex-1">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#be965b] focus:border-[#be965b] text-sm text-black bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#be965b] focus:border-[#be965b] text-sm text-black bg-white"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Enter your message here..."
                    className="w-full h-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#be965b] focus:border-[#be965b] text-sm resize-none text-black bg-white"
                  ></textarea>
                </div>
              </div>

              {/* Aligned Send Button */}
              <div className="mt-6 pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#be965b] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#a67d47] transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>

          {/* Google Map Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-stretch"
          >
            <iframe
              src={mapUrl}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[480px] rounded-lg border-2 border-[#be965b]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}





// 'use client';

// import { motion } from 'framer-motion';
// import { MapPinIcon } from '@heroicons/react/24/solid';
// import Image from 'next/image';

// export default function ContactInteraction() {
//   return (
//     <section className="relative w-full overflow-hidden text-white">
//       {/* Background Image */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="/images/banners/At-a-glance-jw.webp"
//           alt="Contact Background"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//         <div className="absolute inset-0 bg-[#f3ede5]/80" /> {/* Light overlay */}
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="flex flex-col"
//           >
//             <h2 className="text-2xl md:text-3xl font-bold text-[#be965b] mb-6">
//               Send Us a Message
//             </h2>

//             <form className="flex flex-col flex-1">
//               <div className="space-y-4 flex-1">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     placeholder="Enter your full name"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#be965b] focus:border-[#be965b] text-sm text-black bg-white"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="Enter your email address"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#be965b] focus:border-[#be965b] text-sm text-black bg-white"
//                   />
//                 </div>

//                 <div className="flex-1 flex flex-col">
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={6}
//                     placeholder="Enter your message here..."
//                     className="w-full h-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#be965b] focus:border-[#be965b] text-sm resize-none text-black bg-white"
//                   ></textarea>
//                 </div>
//               </div>

//               {/* Aligned Send Button */}
//               <div className="mt-6 pt-4">
//                 <button
//                   type="submit"
//                   className="w-full bg-[#be965b] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#a67d47] transition"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </motion.div>

//           {/* Map Box */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="flex items-stretch"
//           >
//             <div className="w-full h-full min-h-[480px] bg-gray-200 border-2 border-[#be965b] rounded-lg flex flex-col items-center justify-center text-center px-6 py-8 text-black">
//               <MapPinIcon className="h-14 w-14 text-[#be965b] mb-4" />
//               <h3 className="text-xl font-semibold mb-1">Interactive Map</h3>
//               <p className="text-sm text-gray-600">
//                 Google Maps integration would be embedded here
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

