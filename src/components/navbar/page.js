"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/products" },
    { name: "Add Products", path: "/addProducts" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => pathname === path;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setIsOpen(false);
    router.push("/signin"); 
  };

  return (
    <nav className="bg-amber-400 sticky top-0 shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            NextShop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {(user ? navLinks : navLinks.slice(0, 2)).map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className={`font-medium transition hover:text-gray-100 ${
                  isActive(link.path)
                    ? "underline underline-offset-4 text-black"
                    : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <span className="text-white font-medium">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="px-4 py-2 bg-white text-amber-600 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-2xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-amber-400 shadow-md transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-3 space-y-2">
          {(user ? navLinks : navLinks.slice(0, 2)).map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`block font-medium transition hover:text-gray-100 ${
                isActive(link.path)
                  ? "underline underline-offset-4 text-black"
                  : "text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-center font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="block px-4 py-2 bg-white text-amber-600 rounded-lg hover:bg-gray-100 transition text-center font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
