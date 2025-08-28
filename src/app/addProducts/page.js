"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function AddProducts() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "Men",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "price") {
      value = Number(value);
    }
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!product.name || !product.price || !product.category || !product.image) {
      setError("⚠️ Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("❌ Failed to add product");

      // Reset form
      setProduct({
        name: "",
        price: "",
        category: "Men",
        image: "",
        description: "",
      });

      toast.success("✅ Product added successfully!");
      setTimeout(() => router.push("/products"), 1000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-2xl">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
        Add New Product
      </h2>

      {error && (
        <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name*</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price ($)*</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category*</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL*</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
