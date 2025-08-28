"use client";

export default function About() {
  return (
    <section className="bg-amber-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-amber-600 mb-6">About NextShop</h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          NextShop is your ultimate online store for trendy fashion, stylish footwear, and high-quality accessories. 
          We are dedicated to providing the latest products at unbeatable prices, with a seamless shopping experience 
          for all our customers. Whether you are looking for Men’s, Women’s, or Kids’ fashion, NextShop has got you covered.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-amber-600 mb-3">Quality Products</h3>
            <p className="text-gray-600">We carefully select our products to ensure the highest quality and latest trends for our customers.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-amber-600 mb-3">Fast Delivery</h3>
            <p className="text-gray-600">Our reliable shipping ensures your orders reach you quickly and safely, every time.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-amber-600 mb-3">Customer Support</h3>
            <p className="text-gray-600">Our friendly support team is always ready to assist you with any questions or concerns.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
