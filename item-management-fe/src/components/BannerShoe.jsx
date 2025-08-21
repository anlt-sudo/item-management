import React from "react";

// Giả sử bạn có 5 ảnh nhỏ là các phần của chiếc giày
const SHOE_PARTS = [
  {
    src: "https://res.cloudinary.com/dhhdgp7ak/image/upload/v1755700208/rsbjddcmkbfgkvyehwpf.jpg",
    className: "z-10 -rotate-[10deg] scale-x-110 -translate-y-2",
  },
  {
    src: "https://res.cloudinary.com/dhhdgp7ak/image/upload/v1755700208/rsbjddcmkbfgkvyehwpf.jpg",
    className: "z-20 -rotate-[5deg] scale-x-105 -translate-y-1 -translate-x-2",
  },
  {
    src: "https://res.cloudinary.com/dhhdgp7ak/image/upload/v1755700208/rsbjddcmkbfgkvyehwpf.jpg",
    className: "z-30 rotate-0 scale-x-100",
  },
  {
    src: "https://res.cloudinary.com/dhhdgp7ak/image/upload/v1755700208/rsbjddcmkbfgkvyehwpf.jpg",
    className: "z-40 rotate-[7deg] scale-x-105 translate-y-1 -translate-x-2",
  },
  {
    src: "https://res.cloudinary.com/dhhdgp7ak/image/upload/v1755700208/rsbjddcmkbfgkvyehwpf.jpg",
    className: "z-50 rotate-[12deg] scale-x-110 translate-y-2 -translate-x-3",
  },
];

const BannerShoe = () => (
  <div className="relative w-full h-[180px] md:h-[240px] flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 rounded-xl overflow-hidden shadow mb-8">
    <div className="flex w-full h-full">
      {SHOE_PARTS.map((part, i) => (
        <img
          key={i}
          src={part.src}
          alt={`Shoe part ${i + 1}`}
          className="w-1/5 h-full object-cover px-10"
          draggable={false}
        />
      ))}
    </div>
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-base md:text-xl font-bold text-gray-800 bg-white/70 px-6 py-2 rounded shadow">
      Sáng tạo cùng Nike - Ghép hình chiếc giày độc đáo!
    </div>
  </div>
);

export default BannerShoe;
