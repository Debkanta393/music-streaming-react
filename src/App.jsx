import React, { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Artists from "./screens/Artists"
import Generas from "./screens/Generas"
import Playlist from "./screens/Playlist"
import Songs from "./screens/Songs"
import Albums from "./screens/Albums"
import AlbumSongs from "./screens/AlbumSongs"
import Dashboard from './layout/Dashboard'
import Home from './screens/Home'
import SongDetails from './screens/SongDetails'
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import BecomeArtist from './screens/BecomeArtist'
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Profile from "./screens/Profile"
import EditSong from "./screens/EditSong"
import EditProduct from "./screens/EditProduct"
import ForgotPassword from './screens/ForgotPassword'
import ResetPassword from './screens/ResetPassword'
import Checkout from './components/Checkout'
import PrivateRoute from './PrivateRoute'
import PaymentPage from './screens/Payment'

// Fetch user data API
import { fetchMe } from './create-slice/auth-slice'


function App() {

  const dispatch = useDispatch()
  // useEffect(() => {
  //   // Disable right-click
  //   const handleContextMenu = (e) => e.preventDefault();
  //   document.addEventListener('contextmenu', handleContextMenu);

  //   // Disable F12, Ctrl+Shift+I/J/C, Ctrl+U
  //   const handleKeyDown = (e) => {
  //     if (
  //       e.key === 'F12' ||
  //       (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
  //       (e.ctrlKey && e.key === 'U')
  //     ) {
  //       e.preventDefault();
  //     }
  //   };
  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Only fetch user data if we have a token
        const tokenData = localStorage.getItem("token");
        if (tokenData) {
          const parsedToken = JSON.parse(tokenData);
          const now = new Date().getTime();
          
          if (parsedToken.expiry && parsedToken.expiry > now) {
            await dispatch(fetchMe());
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserData()
  }, [dispatch])
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="generas" element={<Generas />} />
          <Route path="artists" element={<Artists />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="songs" element={<Songs />} />
          <Route path="albums" element={<Albums />} />
          <Route path="albums/:id" element={<AlbumSongs />} />
          <Route path="/:category/:songId" element={<SongDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-song/:id" element={<EditSong />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/become-artist" element={<BecomeArtist />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
