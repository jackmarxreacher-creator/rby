"use client";

import { Button } from "@/components/ui/button";

interface AppreciationProps {
  onReset: () => void;
}

export default function Appreciation({ onReset }: AppreciationProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-10 text-center max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#be965b] mb-6">Thank You!</h2>
      <p className="text-lg text-gray-700 mb-4">
        Your request has been submitted successfully.
      </p>
      <p className="text-gray-600 mb-8">
        Our team will review your order and get in touch with you shortly.
      </p>
      <Button variant="default" className="px-6 py-3 text-lg" onClick={onReset}>
        Make Another Request
      </Button>
    </div>
  );
}




// "use client";

// import { Button } from "@/components/ui/button";

// interface AppreciationProps {
//   onReset: () => void;
// }

// export default function Appreciation({ onReset }: AppreciationProps) {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-10 text-center max-w-2xl mx-auto">
//       {/* Title */}
//       <h2 className="text-2xl font-bold text-[#be965b] mb-6">
//         Thank You!
//       </h2>

//       <p className="text-lg text-gray-700 mb-4">
//         Your request has been submitted successfully.
//       </p>
//       <p className="text-gray-600 mb-8">
//         Our team will review your order and get in touch with you shortly.
//       </p>

//       {/* Action button */}
//       <Button
//         variant="default"
//         className="px-6 py-3 text-lg"
//         onClick={onReset}
//       >
//         Make Another Request
//       </Button>
//     </div>
//   );
// }




// "use client";

// export default function Appreciation() {
//   return (
//     <section className="py-20 text-center bg-[#f3ede5]">
//       <h2 className="text-3xl font-bold text-[#be965b] mb-4">Thank You!</h2>
//       <p className="text-gray-700 max-w-xl mx-auto">
//         Your request has been submitted successfully. Our team will contact you shortly to confirm your order.
//       </p>
//     </section>
//   );
// }
