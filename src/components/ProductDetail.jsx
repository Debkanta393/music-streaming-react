import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, getProductById } from "../create-slice/product-slice"
import {
  addToCartLocal,
  addToCartAPI,
  initializeCart,
  setAuthStatus
} from '../create-slice/cart-slice';
import { fetchMe } from '../create-slice/auth-slice';



// Demo reviews and Q&A data
const demoReviews = [
  { name: 'Amit Sharma', rating: 5, date: '2024-05-01', comment: 'Amazing quality! Totally worth the price.' },
  { name: 'Priya Singh', rating: 4, date: '2024-04-28', comment: 'Looks great and works as expected. Fast delivery.' },
  { name: 'Rahul Verma', rating: 3, date: '2024-04-20', comment: 'Good, but packaging could be better.' },
];
const demoQA = [
  { question: 'Is this product covered under warranty?', answer: 'Yes, it comes with a 1-year manufacturer warranty.' },
  { question: 'Can I return the product if not satisfied?', answer: 'Yes, you can return within 10 days of delivery.' },
  { question: 'Does it come in different colors?', answer: 'Currently, only the color shown is available.' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState({})

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [artistName, setArtistName] = useState("")
  const dispatch = useDispatch()

  // Get cart and auth state
  const { items: cartItems, loading: cartLoading } = useSelector(state => state.cart);
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isAuthenticated } = useSelector(state=> state.auth)
  const [addedToCart, setAddedToCart] = useState({})
  const [loading, setLoading] = useState(false)
  // Set selected image
  const [selectedProductId, setSelectedProductId] = useState(null);



  // Getting selected product
  useEffect(() => {
    const handleGetSpecificProduct = async () => {
      console.log("Dispatching getProductById with id:", id);
      try {
        let response;
        if (!selectedProductId) {
          response = await dispatch(getProductById(id)).unwrap();
        }
        else {
          response = await dispatch(getProductById(selectedProductId)).unwrap();
        }
        // Get all products of an artist
        if (response) {
          const allProducts = await dispatch(getAllProduct(response.artistId))
          setAllProducts(allProducts.payload.products.product)
          console.log(allProducts)
        }
        setSelectedProduct(response.product);
        setSelectedProductId(response.product._id)
        setArtistName(response.artistName)
      } catch (error) {
        console.error("API failed:", error);
      }
    };

    if (id) handleGetSpecificProduct();
  }, [id, selectedProductId, setSelectedProductId]);


  // Add to cart functionality
  useEffect(() => {
    dispatch(initializeCart());
    dispatch(setAuthStatus(!!localStorage.getItem('token')));
  }, [dispatch]);

  console.log(isAuthenticated)
  const handleAddToCart = async (product) => {
    try {
      if (isAuthenticated) {
        // User is logged in - use API
        await dispatch(addToCartAPI({
          productId: selectedProductId,
          quantity: 1
        })).unwrap();
      } else {
        // User is not logged in - use local storage
        dispatch(addToCartLocal({ product: selectedProduct, quantity: 1 }));
      }
      // Show success feedback
      setAddedToCart(prev => ({ ...prev, [product._id]: true }));
      setTimeout(() => {
        setAddedToCart(prev => ({ ...prev, [product._id]: false }));
      }, 2000);

    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.productId === productId);
  };


  // Buy now functionality
  const handleBuy = () => {
    alert('Thank you for your purchase!');
    navigate('/products');
  };



  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-2">
      <div className='flex flex-col w-full overflow-hidden justify-evenly bg-white backdrop-blur-lg rounded-3xl '>
        <div className="flex flex-col md:flex-row w-[90%] mx-auto">
          {/* Left: Thumbnails */}
          {allProducts && (
            <div className="flex flex-row md:flex-col gap-2 p-4 md:p-6 items-center md:items-start bg-white/60 rounded-2xl shadow-md m-4">
              {allProducts?.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000/${(img.image || '').replace(/\\/g, '/')}`}
                  alt={allProducts.proName + ' thumbnail ' + (idx + 1)}
                  className={`w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedProductId === img ? 'border-[#6C63FF] shadow-lg scale-105' : 'border-gray-200 hover:border-[#00BFAE]'}`}
                  onClick={() => setSelectedProductId(img._id)}
                />
              ))}
            </div>
          )}
          {/* Center: Main Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <img
              src={`http://localhost:5000/${(selectedProduct.image || '').replace(/\\/g, '/')}`}
              alt=""
              className="w-64 h-64 md:w-[480px] md:h-[35rem] rounded-2xl shadow-xl border-4 border-[#6C63FF]/20 object-cover bg-white"
            />
          </div>
          {/* Right: Info Panel */}
          <div className="flex-1 flex flex-col justify-center p-6 md:p-10 border-t md:border-t-0 md:border-l border-gray-100 min-w-[320px] max-w-[40%] bg-white/70 rounded-2xl shadow-lg m-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#6C63FF] mb-2 leading-tight">{selectedProduct.proName}</h2>
              <p className="text-base text-[#00BFAE] mb-1 italic">by {artistName}</p>
              {/* Rating and Amazon's Choice badge (static for demo) */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400 text-lg">★ ★ ★ ★ ☆</span>
                <span className="text-sm text-gray-500">(600 ratings)</span>
              </div>
              {/* Price and discount */}
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-green-600">₹{selectedProduct.price * 100}</span>
                <span className="text-base text-gray-400 line-through">₹{Math.round(selectedProduct.price * 133)}</span>
                <span className="text-base text-red-500 font-semibold">-25%</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">Inclusive of all taxes</div>
              {/* Offers (static for demo) */}
              <div className="mb-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded text-sm text-gray-700 mb-1">No Cost EMI available</div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-2 rounded text-sm text-gray-700 mb-1">Upto ₹372 cashback as Credit Card</div>
                <div className="bg-green-50 border-l-4 border-green-400 p-2 rounded text-sm text-gray-700">Upto ₹1,242 discount on select cards</div>
              </div>
              {/* Stock and delivery info (static for demo) */}
              <div className="mb-4">
                <span className="text-green-600 font-semibold">In stock</span>
                <div className="text-xs text-gray-500">Ships from Amazon | Free delivery</div>
              </div>
              {/* Protection plan (static for demo) */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm mb-1">
                  <input type="checkbox" className="accent-[#6C63FF]" />
                  Extended warranty for 1 year for ₹149
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-[#00BFAE]" />
                  Total Protection Plan for 2 years for ₹499
                </label>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">{selectedProduct.description}</p>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-row gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                className="w-80 px-8 py-3  text-gray-400 rounded-xl font-bold text-lg shadow-md border border-[#6C63FF]/30 transition-all duration-200 cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuy}
                className="w-80 px-8 py-3 bg-gradient-to-r from-[#00BFAE] to-[#6C63FF] hover:from-[#6C63FF] hover:to-[#00BFAE] text-white rounded-xl 
                font-bold text-lg shadow-md border border-[#00BFAE]/30 transition-all duration-200 cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className='w-[90%] mx-auto mt-10'>
          <h3 className="text-2xl font-bold text-[#6C63FF]">About this item</h3>
          <ul className='mt-5 list-disc ml-10'>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nobis iste sed consectetur aperiam unde accusantium nesciunt delectus, earum hic amet voluptates voluptas dolorum animi ipsa odio facilis temporibus itaque?</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, molestias labore maxime blanditiis minus fuga fugit quos temporibus iusto perspiciatis deleniti soluta harum inventore dolor incidunt illo, voluptatibus aliquam. Dignissimos?</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, aliquam. Mollitia id consectetur molestias placeat asperiores rem corporis, neque labore eum, consequuntur aliquid est, nemo vel qui sint debitis recusandae.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, commodi velit? Aut quasi, neque ipsum nostrum repellendus fugiat illo ipsa possimus exercitationem. Officia facilis architecto consectetur? Soluta maiores ratione dolorem!</li>
          </ul>
        </div>

        {/* Similar Products Section */}
        {/* <div className="w-full max-w-6xl">
          <h3 className="text-2xl font-bold text-[#6C63FF] mb-4 ml-2">Similar Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {similarProducts.map(sp => (
              <div key={sp.id} className="bg-white/80 rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-xl transition cursor-pointer">
                <img src={sp.image} alt={sp.name} className="w-28 h-28 object-cover rounded-lg mb-2 border-2 border-[#6C63FF]/20" />
                <div className="text-center">
                  <div className="font-bold text-[#6C63FF]">{sp.name}</div>
                  <div className="text-sm text-gray-500">by {sp.artist}</div>
                  <div className="text-green-600 font-semibold mt-1">₹{sp.price * 100}</div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Reviews Section */}
        <div className="w-[90%] mx-auto mt-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-[#6C63FF]">Customer Reviews</h3>
            <button onClick={() => setShowReviewForm(true)} className="bg-[#6C63FF] text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-[#00BFAE] transition">Write a Review</button>
          </div>
          <div className="space-y-4">
            {demoReviews.map((review, idx) => (
              <div key={idx} className="bg-white/90 rounded-xl shadow p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#6C63FF]">{review.name}</span>
                  <span className="text-yellow-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  <span className="text-xs text-gray-400 ml-auto">{review.date}</span>
                </div>
                <div className="text-gray-700">{review.comment}</div>
              </div>
            ))}
          </div>
          {showReviewForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 shadow-xl w-full max-w-md">
                <h4 className="text-lg font-bold mb-2 text-[#6C63FF]">Write a Review</h4>
                <p className="text-gray-500 mb-4">(Demo only: form not functional)</p>
                <button onClick={() => setShowReviewForm(false)} className="mt-2 px-4 py-2 bg-[#6C63FF] text-white rounded-full font-semibold hover:bg-[#00BFAE] transition">Close</button>
              </div>
            </div>
          )}
        </div>

        {/* Q&A Section */}
        <div className="w-[90%] mx-auto mt-20 mb-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-[#6C63FF]">Questions & Answers</h3>
            <button onClick={() => setShowQuestionForm(true)} className="bg-[#00BFAE] text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-[#6C63FF] transition">Ask a Question</button>
          </div>
          <div className="space-y-4">
            {demoQA.map((qa, idx) => (
              <div key={idx} className="bg-white/90 rounded-xl shadow p-4">
                <div className="font-semibold text-[#6C63FF]">Q: {qa.question}</div>
                <div className="text-gray-700 mt-1">A: {qa.answer}</div>
              </div>
            ))}
          </div>
          {showQuestionForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 shadow-xl w-full max-w-md">
                <h4 className="text-lg font-bold mb-2 text-[#00BFAE]">Ask a Question</h4>
                <p className="text-gray-500 mb-4">(Demo only: form not functional)</p>
                <button onClick={() => setShowQuestionForm(false)} className="mt-2 px-4 py-2 bg-[#00BFAE] text-white rounded-full font-semibold hover:bg-[#6C63FF] transition">Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 