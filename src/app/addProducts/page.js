"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!product.name || !product.price || !product.category || !product.image) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to add product");
      setProduct({ name: "", price: "", category: "Men", image: "", description: "" });
      router.push("/products");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">Add New Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name*</label>
          <input type="text" name="name" value={product.name} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"/>
        </div>
        <div>
          <label className="block mb-1 font-medium">Price ($)*</label>
          <input type="number" name="price" value={product.price} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"/>
        </div>
        <div>
          <label className="block mb-1 font-medium">Category*</label>
          <select name="category" value={product.category} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500">
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL*</label>
          <input type="text" name="image" value={product.image} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"/>
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" value={product.description} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"/>
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition">
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
