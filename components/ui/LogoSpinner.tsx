'use client';

import Image from 'next/image';

export default function LogoSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
      <div className="w-20 h-20 animate-spin origin-center">
        <Image
          src="/images/logos/rby_logo.webp"
          alt="Loading..."
          width={80}
          height={80}
          priority
        />
      </div>
    </div>
  );
}
