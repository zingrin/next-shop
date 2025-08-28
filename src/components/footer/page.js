"use client";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-amber-400 text-white dark:bg-gray-900 dark:text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold">NextShop</h2>
            <p className="mt-2 text-sm">
              NextShop is your one-stop online store for trendy products.  
              We provide fast delivery, premium quality, and unbeatable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/products" className="hover:underline">Products</Link></li>
              <li><Link href="/addProducts" className="hover:underline">Add Products</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p>Email: support@nextshop.com</p>
            <p>Phone: +880 1234-567890</p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amber-300 dark:border-gray-700 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} NextShop. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
