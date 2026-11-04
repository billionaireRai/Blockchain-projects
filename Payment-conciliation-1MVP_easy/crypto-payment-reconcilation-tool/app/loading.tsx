"use client";

import Image from "next/image";
import Icon from '@/public/images/paylume-icon.png';

export default function GlobalLoader() {
  return (
    <div
      className="relative w-screen h-screen inline-flex items-center justify-center rounded-full bg-white p-2"
      role="status"
      aria-label="Loading"
    >
      {/* Rotating spinner */}
      <svg
        className="size-20 shrink-0 animate-spin text-red-600"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        >
          <path d="M12 2.75V5.25" opacity="0.15" />
          <path d="M16.95 4.08L15.7 6.25" opacity="0.22" />
          <path d="M19.92 7.05L17.75 8.3" opacity="0.32" />
          <path d="M21.25 12H18.75" opacity="0.42" />
          <path d="M19.92 16.95L17.75 15.7" opacity="0.54" />
          <path d="M16.95 19.92L15.7 17.75" opacity="0.66" />
          <path d="M12 21.25V18.75" opacity="0.78" />
          <path d="M7.05 19.92L8.3 17.75" opacity="0.9" />
          <path d="M4.08 16.95L6.25 15.7" opacity="1" />
          <path d="M2.75 12H5.25" opacity="0.86" />
          <path d="M4.08 7.05L6.25 8.3" opacity="0.7" />
          <path d="M7.05 4.08L8.3 6.25" opacity="0.5" />
        </g>
      </svg>

      {/* Centered Paylume logo */}
      <div className="absolute inset-0 flex items-center justify-center rounded-full">
        <Image
          src={Icon}
          width={38}
          height={38}
          alt="Paylume"
          priority
          className="object-contain rounded-full"
        />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}