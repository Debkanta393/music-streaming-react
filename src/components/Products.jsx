import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import products from '../products.json';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../create-slice/product-slice';
import { getSongById } from '../create-slice/song-slice';
import { initializeCart, setAuthStatus, addToCartAPI, addToCartLocal } from '../create-slice/cart-slice';
import { fetchMe } from '../create-slice/auth-slice';

export default function Products({ artistId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { songId } = useParams()
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { isAuthenticated }=useSelector(state=> state.auth)
    const [addedToCart, setAddedToCart] = useState({});
    const fileBaseURL = import.meta.env.VITE_FILE_API_URI;


    // Fetch user data
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await dispatch(fetchMe())
    //             if (response.payload !== "No token provided") {
    //                 setIsAuthenticated(true)
    //             }
    //         } catch (error) {
    //         }
    //     }
    //     fetchUserData()
    // }, [])


    useEffect(() => {
        dispatch(initializeCart());
        dispatch(setAuthStatus(!!localStorage.getItem('token')));
    }, [dispatch]);

    const handleAddToCart = async (product) => {
        try {
            if (isAuthenticated) {
                // User is logged in - use API
                await dispatch(addToCartAPI({
                    productId: product._id,
                    quantity: 1
                })).unwrap();
            } else {
                // User is not logged in - use local storage
                dispatch(addToCartLocal({ product: product, quantity: 1 }));
            }
            // Show success feedback
            setAddedToCart(prev => ({ ...prev, [product._id]: true }));
            setTimeout(() => {
                setAddedToCart(prev => ({ ...prev, [product._id]: false }));
            }, 2000);

        } catch (error) {
            
        }
    };

    // const [artistName, setArtistName] = useState("")
    // const [songData, setSongData] = useState({})
    // const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     const getSongHandler = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await dispatch(getSongById({ category, songId }));

    //             if (!response.payload) throw new Error("Song not found");

    //             setArtistName(response.payload.artistName);
    //             setSongData(response.payload.song);
    //         } catch (error) {
    //             console.error("Failed to fetch song:", error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (songId) getSongHandler();
    // }, [songId, dispatch]);
    // Get all product of a auther
    // const artistId = useSelector((state) => state.song.song.artistId)
    const [products, setProducts] = useState([])
    useEffect(() => {
        const handleGetProduct = async () => {
            try {
                if (artistId) {
                    const response = await dispatch(getAllProduct(artistId))
                    setProducts(response.payload.products.product)
                }
            } catch (error) {
                
            }
        }
        handleGetProduct()
    }, [artistId])


    return (
        <div className="py-10 ">
            <h2 className="text-3xl font-extrabold px-14 mb-10 text-white tracking-tight drop-shadow-xl">
                Artist Merchandise
            </h2>
            {!products ?
                (
                    <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6 md:px-12">
                        {Array(4).fill().map((_, i) => (
                            <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 shadow animate-pulse bg-white h-96">
                                <div className="flex flex-col space-y-3">
                                    {/* Image placeholder */}
                                    <div className="h-76 w-full rounded bg-gray-200" />

                                    {/* Button placeholder */}
                                    <div className="h-10 w-full rounded bg-gray-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6 md:px-12">
                        {products.map(product => (
                            <div
                                key={product._id}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer 
                    overflow-hidden group border border-gray-200 hover:border-blue-400 relative"
                            >
                                {/* IMAGE WRAPPER */}
                                <div className="relative overflow-hidden h-96">
                                    <img
                                        src={`${fileBaseURL}/${(product.image || '').replace(/\\/g, '/')}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />
                                    <p>{product.proName}</p>
                                    {/* SLIDE-UP "ADD TO CART" BUTTON */}
                                    <div
                                        className="absolute bottom-[-100%] left-0 w-full h-full bg-black/50 flex justify-center items-end opacity-0
                          group-hover:bottom-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-10"
                                        onClick={() => navigate(`/products/${product._id}`)}
                                    >
                                        <button className="mb-5 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-100 transition
                                cursor-pointer z-20"  onClick={(e) => {
                                                e.stopPropagation(); // prevent triggering navigate()
                                                handleAddToCart(product); // your custom handler
                                            }}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >

    );
}
