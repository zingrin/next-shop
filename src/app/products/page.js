"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const updated = data.map((p) => ({
          ...p,
          selectedSize: p.size?.[0] || "M",
          selectedColor: p.color?.[0] || "Red",
          quantity: 1,
        }));
        setProducts(updated);
      })
      .catch(console.error);
  }, []);

  // Quick View
  const handleQuickView = (product) => setQuickViewProduct(product);

  // Add to Cart (with default size/color/quantity)
  const handleAddToCart = (product) => {
    setSelectedProduct({
      ...product,
      selectedSize: product.size?.[0] || "M",
      selectedColor: product.color?.[0] || "Red",
      quantity: 1,
    });
  };

  // Confirm Add to Cart
  const confirmAddToCart = () => {
    const product = selectedProduct;
    const exists = cart.find(
      (item) =>
        item._id === product._id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor
    );

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, product]);
    }

    setSelectedProduct(null);
    alert(`${product.name} added to cart ✅`);
  };

  const handleQuantityChange = (delta) => {
    setSelectedProduct((prev) => {
      if (!prev) return prev;
      let qty = prev.quantity + delta;
      if (qty < 1) qty = 1;
      return { ...prev, quantity: qty };
    });
  };

  const handleSizeChange = (value) => {
    setSelectedProduct((prev) => ({ ...prev, selectedSize: value }));
  };

  const handleColorChange = (value) => {
    setSelectedProduct((prev) => ({ ...prev, selectedColor: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-amber-600">All Products</h2>
        <button
          onClick={() => setShowCart(true)}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-semibold"
        >
          🛒 View Cart ({cart.length})
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition relative group"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain p-4"
            />
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-amber-600 font-bold mt-2">${product.price}</p>
            </div>

            {/* Overlay Buttons */}
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition gap-2">
              <button
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium w-32"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 font-medium w-32"
                onClick={() => handleQuickView(product)}
              >
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-11/12 max-w-2xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-800"
              onClick={() => setQuickViewProduct(null)}
            >
              ✖
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full md:w-1/2 h-64 object-contain rounded-xl"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-800">{quickViewProduct.name}</h3>
                <p className="text-amber-600 font-bold mt-2">${quickViewProduct.price}</p>
                <p className="text-gray-700 mt-4">{quickViewProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add to Cart Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-11/12 max-w-2xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-800"
              onClick={() => setSelectedProduct(null)}
            >
              ✖
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full md:w-1/2 h-64 object-contain rounded-xl"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h3>
                <p className="text-amber-600 font-bold mt-2">${selectedProduct.price}</p>
                <p className="text-gray-500 mt-2">{selectedProduct.category}</p>
                <p className="text-gray-700 mt-4">{selectedProduct.description}</p>

                {/* Size / Color / Quantity */}
                <div className="flex gap-2 mt-3">
                  <select
                    value={selectedProduct.selectedSize}
                    onChange={(e) => handleSizeChange(e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {selectedProduct?.size?.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedProduct.selectedColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {selectedProduct?.color?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{selectedProduct.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  className="mt-6 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-semibold"
                  onClick={confirmAddToCart}
                >
                  Confirm Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-11/12 max-w-3xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-800"
              onClick={() => setShowCart(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-4 items-center border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                      <p className="text-amber-600 font-bold">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
