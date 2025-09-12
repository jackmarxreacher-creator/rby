"use client";

import { motion } from "framer-motion";
import {
  FaTruck,
  FaHeadset,
  FaTags,
  FaShippingFast,
  FaCheckCircle,
  FaStore,
} from "react-icons/fa";

const services = [
  {
    title: "Wholesale & Retail Distribution",
    description: "Supplying both retailers and individual customers with top-quality beverages.",
    icon: <FaStore className="text-[#be965b] text-4xl" />,
  },
  {
    title: "Free Delivery within Kumasi",
    description: "Enjoy fast and free delivery services within Kumasi and nearby areas.",
    icon: <FaTruck className="text-[#be965b] text-4xl" />,
  },
  {
    title: "Bulk Order Discounts",
    description: "Special pricing and discounts for customers ordering in bulk quantities.",
    icon: <FaTags className="text-[#be965b] text-4xl" />,
  },
  {
    title: "Quick Dispatch",
    description: "Orders are processed and dispatched swiftly to keep your business moving.",
    icon: <FaShippingFast className="text-[#be965b] text-4xl" />,
  },
  {
    title: "24/7 Customer Support",
    description: "Our dedicated support team is always available to assist you anytime.",
    icon: <FaHeadset className="text-[#be965b] text-4xl" />,
  },
  {
    title: "Quality Guarantee",
    description: "Every product is verified and guaranteed to meet the highest quality standards.",
    icon: <FaCheckCircle className="text-[#be965b] text-4xl" />,
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-[#f3ede5] px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#be965b] mb-12">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#1c1c1c] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



// "use client";

// import { motion } from "framer-motion";
// import { FaTruck, FaStore, FaBoxOpen, FaBullhorn } from "react-icons/fa";

// const services = [
//   {
//     title: "Wholesale Distribution",
//     description:
//       "Supplying retailers and partners with a wide range of premium beverages at competitive wholesale rates.",
//     icon: <FaBoxOpen size={36} className="text-[#be965b]" />,
//   },
//   {
//     title: "Retail Sales",
//     description:
//       "Providing affordable retail options directly to consumers through our trusted network.",
//     icon: <FaStore size={36} className="text-[#be965b]" />,
//   },
//   {
//     title: "Logistics & Delivery",
//     description:
//       "Ensuring timely and reliable delivery of products across all our distribution zones.",
//     icon: <FaTruck size={36} className="text-[#be965b]" />,
//   },
//   {
//     title: "Promotions & Events",
//     description:
//       "Partnering with brands to run nationwide promotions, product activations, and marketing events.",
//     icon: <FaBullhorn size={36} className="text-[#be965b]" />,
//   },
// ];

// export default function Services() {
//   return (
//     <section className="py-20 px-4 md:px-8 bg-[#f3ede5]">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-[#be965b] mb-12 text-center">
//           Our Services
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center flex flex-col items-center"
//             >
//               <div className="mb-4">{service.icon}</div>
//               <h3 className="text-lg font-semibold text-[#1c1c1c] mb-2">
//                 {service.title}
//               </h3>
//               <p className="text-gray-600 text-sm">{service.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
