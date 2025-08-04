import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../create-slice/product-slice";
import { FaBoxOpen, FaImage, FaSave, FaArrowLeft, FaRupeeSign, FaLightbulb } from "react-icons/fa";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    item: "",
    description: "",
    image: null,
    color: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");
      try {
        const res = await dispatch(getProductById(id));
        console.log(res)
        if (res.payload && res.payload.product) {
          const product = res.payload.product;
          console.log(product)
          setProductData({
            name: product.proName || "",
            price: product.price || "",
            item: product.items || "",
            description: product.proDes || "",
            image: product.image || null,
            color: [product.color] || null
          });
          setPreviewImage(product.image ? `http://localhost:5000/${product.image.replace(/\\/g, "/")}` : null);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
      }
      setLoading(false);
    }
    fetchProduct();
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData((prev) => ({ ...prev, image: file }));
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      
      console.log(productData)
      const res = await dispatch(updateProduct({id: id, data: productData}));
      console.log(res)
      if (res.error) throw new Error(res.error.message || "Update failed");
      setSuccess("Product updated successfully!");
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      setError(err.message || "Failed to update product");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#232526] to-[#0f2027] px-4 py-10 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#4facfe]/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00f2fe]/20 rounded-full blur-3xl -z-10 animate-pulse" />
      {/* Hero Banner */}
      <div className="w-full max-w-2xl mx-auto mb-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight mb-2 animate-fade-in">
          <span className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent">Edit Your Product</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-medium mb-2 animate-fade-in-slow">Update your merchandise and boost your sales!</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {/* Main Form */}
        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 relative animate-slide-up">
          <button
            className="absolute top-4 left-4 text-white/60 hover:text-white text-xl transition-transform hover:scale-110"
            onClick={() => navigate(-1)}
            title="Back"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-[#4facfe] flex items-center gap-2">
            <FaBoxOpen /> Edit Product Details
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-full mb-6" />
          {loading ? (
            <div className="text-center text-white/70">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-400 font-semibold">{error}</div>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-white/80 mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#181818] border border-[#4facfe]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1 font-semibold flex items-center gap-2">
                  <FaRupeeSign /> Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#181818] border border-[#4facfe]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50 transition"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1 font-semibold flex items-center gap-2">
                  Item
                </label>
                <input
                  type="number"
                  name="item"
                  value={productData.item}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#181818] border border-[#4facfe]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50 transition"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1 font-semibold">Description</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#181818] border border-[#4facfe]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50 transition"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1 font-semibold flex items-center gap-2">
                  <FaImage /> Image
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-[#4facfe]/20 text-[#4facfe] font-bold hover:bg-[#4facfe]/40 transition"
                    onClick={() => imageRef.current.click()}
                  >
                    Choose Image
                  </button>
                  {previewImage && (
                    <img src={previewImage} alt="Preview" className="w-16 h-16 rounded-lg object-cover border-2 border-[#4facfe]/40 shadow-lg" />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-black font-bold text-lg shadow hover:scale-105 transition flex items-center justify-center gap-2 hover:shadow-xl"
              >
                <FaSave /> Save Changes
              </button>
              {success && <div className="text-green-400 text-center font-semibold mt-2 animate-fade-in">{success}</div>}
              {error && <div className="text-red-400 text-center font-semibold mt-2 animate-fade-in">{error}</div>}
            </form>
          )}
        </div>
        {/* Tips Sidebar */}
        <div className="hidden md:flex flex-col gap-6 w-80 bg-gradient-to-br from-[#4facfe]/20 to-[#00f2fe]/20 rounded-3xl shadow-xl p-6 border border-white/10 animate-slide-up-slow">
          <div className="flex items-center gap-2 text-[#4facfe] text-xl font-bold mb-2">
            <FaLightbulb /> Tips for a Great Product
          </div>
          <ul className="text-white/80 text-sm flex flex-col gap-2">
            <li>🛍️ Use a clear, catchy product name.</li>
            <li>💸 Set a fair and attractive price.</li>
            <li>📝 Write a detailed, enticing description.</li>
            <li>🖼️ Upload a high-quality product image.</li>
          </ul>
          <div className="mt-4">
            <img src="/public/Products/hoodie.jpg" alt="Product Art" className="rounded-xl shadow-lg w-full" />
          </div>
        </div>
      </div>
    </div>
  );
} 