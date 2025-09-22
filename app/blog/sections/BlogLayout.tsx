import React, { ReactNode } from "react";

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
      {children}
    </section>
  );
}




// // app/blog/sections/BlogLayout.tsx

// import React, { ReactNode } from 'react';

// type BlogLayoutProps = {
//   children: ReactNode;
// };

// export default function BlogLayout({ children }: BlogLayoutProps) {
//   return (
//     <section className="w-full grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
//       {children}
//     </section>
//   );
// }
