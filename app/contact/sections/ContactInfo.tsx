'use client';

import { motion, easeInOut } from 'framer-motion'; // ← import typed easing
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const contactDetails = [
  {
    icon: <FiMapPin size={24} />,
    label: 'Our Address',
    value: 'Ricky Boakye Yiadom Ltd. \n P. O. Box 9103, Ahinsan, Kumasi',
  },
  {
    icon: <FiPhone size={24} />,
    label: 'Phone',
    value: 'Main: +233 30 804 0125   \n Ejisu: +233 53 103 3340',
  },
  {
    icon: <FiMail size={24} />,
    label: 'Email',
    value: 'info@rby.com',
  },
  {
    icon: <FiClock size={24} />,
    label: 'Working Hours',
    value: 'Mon - Sat: 8:00 AM – 5:00 PM\nSun: Closed',
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: easeInOut, // ← fixed easing
    },
  }),
};

export default function ContactInfo() {
  return (
    <section className="py-16 px-4 md:px-10 bg-[#f9f4ee]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-[#be965b] text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {contactDetails.map((detail, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 bg-white rounded-lg shadow-md p-6"
              variants={itemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="text-[#be965b]">{detail.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {detail.label}
                </h3>
                <p className="text-sm whitespace-pre-line text-gray-600">
                  {detail.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp Button */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://wa.me/233241234567 "
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-6 py-3 rounded-full transition duration-300 shadow"
          >
            <FaWhatsapp size={20} />
            Message Us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}



// 'use client';

// import { motion } from 'framer-motion';
// import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
// import { FaWhatsapp } from 'react-icons/fa';

// const contactDetails = [
//   {
//     icon: <FiMapPin size={24} />,
//     label: 'Our Address',
//     value: 'Ricky Boakye Yiadom Ltd. \n P. O. Box 9103, Ahinsan, Kumasi',
//   },
//   {
//     icon: <FiPhone size={24} />,
//     label: 'Phone',
//     value: '+233 30 804 0125',
//   },
//   {
//     icon: <FiMail size={24} />,
//     label: 'Email',
//     value: 'info@rby.com',
//   },
//   {
//     icon: <FiClock size={24} />,
//     label: 'Working Hours',
//     value: 'Mon - Sat: 8:00 AM – 5:00 PM\nSun: Closed',
//   },
// ];

// const itemVariant = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.5,
//       ease: 'easeOut',
//     },
//   }),
// };

// export default function ContactInfo() {
//   return (
//     <section className="py-16 px-4 md:px-10 bg-[#f9f4ee]">
//       <div className="max-w-5xl mx-auto">
//         <motion.h2
//           className="text-2xl md:text-3xl font-bold text-[#be965b] text-center mb-10"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           Get in Touch
//         </motion.h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {contactDetails.map((detail, i) => (
//             <motion.div
//               key={i}
//               className="flex items-start gap-4 bg-white rounded-lg shadow-md p-6"
//               variants={itemVariant}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               custom={i}
//             >
//               <div className="text-[#be965b]">{detail.icon}</div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                   {detail.label}
//                 </h3>
//                 <p className="text-sm whitespace-pre-line text-gray-600">
//                   {detail.value}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* WhatsApp Button */}
//         <motion.div
//           className="mt-10 flex justify-center"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <a
//             href="https://wa.me/233241234567"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-6 py-3 rounded-full transition duration-300 shadow"
//           >
//             <FaWhatsapp size={20} />
//             Message Us on WhatsApp
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
