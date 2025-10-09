import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa'
import { GiMushroomGills } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../create-slice/auth-slice';
import { initializeCart, setAuthStatus, getCartItemsAPI } from '../create-slice/cart-slice';
import { useNavigate } from 'react-router-dom';
import { getAllProduct } from '../create-slice/product-slice';
import { getSongByName, searchSongsByTitle } from "../create-slice/song-slice";


const placeHolder = [
  "find us", "look up", "see all", "discover", "explore", "check out", "pick up", "search", "play", "our art", "our vision"
]
export default function Header() {

  const token = localStorage.getItem("token")
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cart = localStorage.getItem("cart")
  const [cartNumber, setCartNumber] = useState(null)
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const [suggestions, setSuggestions] = useState([]);
  const [title, setTitle] = useState("");



  // Placeholder for the search input
  const [placeholder, setPlaceholder] = useState(placeHolder[Math.floor(Math.random() * placeHolder.length)])
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * placeHolder.length)
      setPlaceholder(placeHolder[randomIndex])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    dispatch(fetchMe()); // ✅ fetch user on app load
    dispatch(initializeCart()); // Initialize cart from localStorage
    dispatch(setAuthStatus(!!token)); // Set auth status
  }, [dispatch, token]);


  // Getting cart products
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);
  useEffect(() => {
    const handleGetCarts = async () => {
      try {
        if (isAuthenticated) {
          console.log("Get product function called")
          console.log(user?._id)
          const response = await dispatch(getCartItemsAPI())
          setCartNumber(response?.payload?.cart?.length)
          console.log(response)
        }
        else {
          if (cart) {
            console.log((JSON.parse(cart)).length)
            setCartNumber((JSON.parse(cart)).length)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleGetCarts()
  }, [isAuthenticated, cart])


  // Performing song suggestion
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const trimmed = title.trim();
      if (trimmed.length >= 2) {
        try {
          const response = await dispatch(searchSongsByTitle(trimmed));
          setSuggestions(response.payload || []);
        } catch (error) {
          console.error("Suggestion fetch error:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
  
    return () => clearTimeout(delayDebounce);
  }, [title, dispatch]);


  // Search song
  const handleSearchSong = async (e) => {
    if (e.key === 'Enter') {
      try {
        console.log(title);
        const encodedSongName = encodeURIComponent(title.trim());
        const response = await dispatch(getSongByName(encodedSongName));
        const songDetails = response.payload.data.song
        console.log(songDetails)
        navigate(`/${songDetails.genre}/${songDetails._id}`)
        setTitle("")
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    }
  };






  return (
    <>
      <div className='w-full flex justify-between items-center px-4 lg:px-20 py-2 bg-[#093FB4]'>
        <div className=''>
          <Link to="/">
            <img src="/logo.png" alt="logo" className='w-32 h-20' />
          </Link>
        </div>
        <div className='hidden lg:flex items-center gap-10 lg:w-5/12'>
          <div className='flex items-center gap-2 p-1 bg-white w-full pl-4 rounded-3xl relative'>
            <GiMushroomGills className='text-gray-600 text-2xl' />
            <input type="text" placeholder={placeholder} className='w-10/12 p-2 rounded-md bg-white text-black focus:outline-none border-none placeholder:transform 
          placeholder:transition-transform placeholder:duration-300 placeholder:ease-in-out placeholder:text-gray-500' value={title} onKeyDown={handleSearchSong}
              onChange={(e) => setTitle(e.target.value)}
            />
            {suggestions?.length > 0 && (
              <ul className="absolute bg-white border-1 border-gray-200 w-full mt-1 rounded shadow z-10 top-10 left-0">
                {suggestions?.map((song) => (
                  <li
                    key={song._id}
                    onClick={() => {
                      navigate(`/${song.genre}/${song._id}`);
                      setTitle("");
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {song.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='relative'>
            <Link to="/cart">
              <FaShoppingCart className='text-2xl sm:text-3xl text-white cursor-pointer hover:text-gray-300 transition-colors' />
              {totalItems > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
          {
            !token ? (
              <div className='flex items-center gap-4'>
                <ul className='flex items-center gap-4'>
                  <li className='text-white text-[17px] font-semibold hover:underline'><Link to="/login">login</Link></li>
                  <li className='text-white text-[17px] font-semibold hover:underline'><Link to="/signup">signup</Link></li>
                </ul>
              </div>
            ) : (
              <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/profile")}>
                <FaUserCircle className='text-2xl sm:text-3xl text-white' />
                <p className='hidden md:flex text-white text-lg font-semibold'>{user?.name}</p>
              </div>
            )}
        </div>
      </div>
    </>
  )
}
