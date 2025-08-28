"use client";

import { useState } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "John Doe",
    role: "Verified Buyer",
    rating: 5,
    comment: "Amazing products! Fast delivery and top quality. Highly recommend NextShop.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Smith",
    role: "Verified Buyer",
    rating: 4,
    comment: "Great shopping experience. Products arrived on time and were exactly as described.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Mike Johnson",
    role: "Verified Buyer",
    rating: 5,
    comment: "Excellent service and fantastic customer support. Will buy again!",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const { name, role, rating, comment, avatar } = reviews[currentIndex];

  return (
    <section className="bg-amber-100 py-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-amber-600 mb-8">What Our Customers Say</h2>

        <div className="bg-white p-8 rounded-2xl shadow-md relative">
          <div className="flex flex-col items-center">
            <Image
              src={avatar}
              alt={name}
              width={150}
              height={150}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500 mb-2">{role}</p>

            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`text-amber-500 text-lg ${idx < rating ? "opacity-100" : "opacity-30"}`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-gray-700 italic max-w-xl">{`"${comment}"`}</p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevReview}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
            >
              Previous
            </button>
            <button
              onClick={nextReview}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
