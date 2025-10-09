import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaEdit, FaPlay, FaUserEdit, FaTrash } from "react-icons/fa";
import userImage from "/public/user.png";
import { useDispatch } from "react-redux";
import { fetchMe, updateUser } from "../create-slice/auth-slice";
import { getAllSongOfArtist, deleteSong } from "../create-slice/song-slice";
import { getAllProduct, deleteProduct } from "../create-slice/product-slice";
import { toast } from 'react-toastify';
import PaymentHistory from '../components/PaymentHistory';
import { logout } from "../create-slice/auth-slice";

export default function Profile() {
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [songs, setSongs] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    image: null
  })

  // Profile picture handling
  const imageRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const imageHandler = () => {
    imageRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    } else {
      setPreviewImage(null);
    }
  };

  // Getting data from user
  const [profileData, setProfileData] = useState({
    id: "",
    name: "",
    email: "",
    bio: ""
  });
  const fileBaseURL = import.meta.env.VITE_FILE_API_URI;
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Fetch user data
  useEffect(() => {
    const handleUserData = async () => {
      try {
        const response = await dispatch(fetchMe());
        console.log("Response", response)
        setProfileData((prev) => ({
          ...prev,
          id: response.payload._id,
          name: response.payload.name,
          email: response.payload.email,
          bio: response.payload.bio
        }));
        const file = response.payload.image
        setProfileImage(response.payload.image);
        console.log(response.payload.image)
        const imageURL = URL.createObjectURL(file);

      } catch (error) {
      }
    };
    handleUserData();
  }, []);


  // Get all song of the artist
  useEffect(() => {
    const handleGetSongs = async () => {
      try {
        const action = await dispatch(getAllSongOfArtist(profileData.id));
        if (action.payload?.songs) {
          setSongs(action.payload.songs[0].songs);
          setHasFetched(true);
        }
      } catch (error) { }
    };
    if (profileData) handleGetSongs();
  }, [dispatch, profileData, hasFetched]);


  // Get all products of the artist
  useEffect(() => {
    const handleGetProduct = async () => {
      try {
        if (profileData) {
          const response = await dispatch(getAllProduct(profileData.id));
          setProducts(response.payload.products.product);
        }
      } catch (error) { }
    };
    handleGetProduct();
  }, [profileData, dispatch]);


  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault()
    console.log(profileData)
    try {
      const response = await dispatch(updateUser({ profileData, profileImage }))
      setEditProfile(false)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  // Delete song
  const handleDeleteSong = async (songId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (!confirmed) return; // ⛔ Exit if user cancels

      const response = await dispatch(deleteSong(songId));
      console.log(response);

      if (response?.payload?.status === 200) {
        toast.success('Song deleted successfully!');
      }

      const remainingSongs = songs.filter(song => song._id !== songId);
      setSongs(remainingSongs);

    } catch (error) {
      console.log(error);
    }
  };


  // Delete product
  const handleDeleteProduct = async (proId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (!confirmed) return; // ⛔ Exit if user cancels

      const response = await dispatch(deleteProduct(proId));
      console.log(response);

      if (response?.payload?.status === 200) {
        toast.success('Product deleted successfully!');
      }

      const remainingProducts = products.filter(pro => pro._id !== proId);
      setProducts(remainingProducts);

    } catch (error) {
      console.log(error);
    }
  };


  // Logout
  const handleLogout =async()=>{
    try {
      const response=await dispatch(logout())
      if(response.payload){
        toast.success("You are logged out successfully!")
        navigate("/")
      }
    } catch (error) {
      toast.error("Logout failed!")
    }
  }

  // Modal for editing profile
  const EditProfileModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#232526]/90 to-[#0f2027]/90 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-white/10">
        <button
          className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
          onClick={() => setEditProfile(false)}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
        <form className="flex flex-col gap-4" onSubmit={handleUpdateUser}>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            className="px-4 py-2 rounded-lg bg-[#181818] border border-[#00f2fe]/30 text-white focus:outline-none"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            className="px-4 py-2 rounded-lg bg-[#181818] border border-[#00f2fe]/30 text-white focus:outline-none"
            placeholder="Email"
          />
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleProfileChange}
            className="px-4 py-2 rounded-lg bg-[#181818] border border-[#00f2fe]/30 text-white focus:outline-none"
            placeholder="Bio"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-bold shadow hover:scale-105 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#232526] to-[#0f2027] text-white font-sans flex flex-col items-center relative">
      {/* Hero Section */}
      <div className="w-full h-56 md:h-72 bg-gradient-to-r from-[#00f2fe]/30 via-[#4facfe]/20 to-[#232526]/60 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight text-center">
          Welcome, <span className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent">{profileData.name || "Artist"}</span>
        </h1>
      </div>

      {/* Profile Card */}
      <div className="w-full max-w-3xl -mt-20 md:-mt-28 z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 items-center border border-white/10 relative">
          {/* Profile Image */}
          <div className="relative w-36 h-36 group">
            <img
              src={previewImage ? previewImage : profileData.id ? `${fileBaseURL}/uploads/${(profileImage || '')}` : userImage}
              alt=""
              className="w-full h-full rounded-full object-cover border-4 border-[#00f2fe]/40 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
            />
            <div
              className="absolute bottom-4 right-4 bg-gradient-to-br from-[#00f2fe] to-[#4facfe] rounded-full p-2 cursor-pointer shadow-lg border-2 border-white/30 hover:scale-110 transition"
              onClick={imageHandler}
              title="Change profile picture"
            >
              <FaCamera className="text-white text-lg" />
              <input type="file" hidden ref={imageRef} onChange={handleImageChange} />
            </div>
          </div>
          {/* Profile Info */}
          <div className="flex-1 flex flex-col gap-2 items-center md:items-start">
            <h2 className="text-3xl font-bold mb-1 flex items-center gap-2">
              {profileData.name}
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#00f2fe]/30 to-[#4facfe]/30 text-[#00f2fe] text-xs font-bold border border-[#00f2fe]/40 ml-2">
                <FaUserEdit className="mr-1" /> Artist
              </span>
            </h2>
            <p className="text-white/80 mb-1 text-lg">{profileData.email}</p>
            <p className="text-white/70 mb-2 italic text-center md:text-left">{profileData.bio || "Add a short bio about yourself!"}</p>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[#00f2fe] font-semibold">1,234 Followers</span>
            </div>
            <div className="flex gap-4 w-full px-4">
              <button
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-bold shadow hover:scale-105 
                transition w-fit mt-2 flex items-center gap-2 hover:bg-gradient-to-r hover:from-[#4facfe] hover:to-[#00f2fe] text-md"
                onClick={() => setEditProfile(true)}
              >
                <FaEdit /> Edit Profile
              </button>
              <button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#fa327e] to-[#e44343] text-black font-bold shadow 
                hover:scale-105 transition w-fit mt-2 flex items-center gap-2 text-md hover:bg-gradient-to-r hover:from-[#e44343] hover:to-[#fa327e]"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      {editProfile && <EditProfileModal />}

      {/* Artist Section: Songs and Products */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10 mt-16 z-10 mb-20">
        {/* Songs */}
        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10 mb-8 md:mb-0 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <FaPlay className="text-[#00f2fe] text-xl" />
            <h3 className="text-2xl font-bold text-[#00f2fe]">Your Uploaded Songs</h3>
          </div>
          <div className="h-1 w-16 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full mb-4" />
          <div className="flex-1 overflow-y-auto max-h-96 custom-scrollbar pr-2">
            {songs?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-white/60">
                <FaPlay className="text-4xl mb-2 opacity-30" />
                <span>No songs uploaded yet.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {songs?.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-[#181818]/80 rounded-xl p-3 hover:shadow-xl hover:border-[#00f2fe]/40 border-l-4 border-l-[#00f2fe] border border-transparent transition cursor-pointer group relative"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <img
                        src={`${fileBaseURL}/${(song.image || "").replace(/\\/g, "/")}`}
                        alt={song.title}
                        className="w-full h-full rounded-lg object-cover border-2 border-[#00f2fe]/20 group-hover:border-[#00f2fe]/60 transition"
                      />
                      <button
                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition"
                        title="Play preview"
                      >
                        <FaPlay className="text-[#00f2fe] text-base" />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-white truncate group-hover:text-[#00f2fe] transition">
                        {song.title}
                      </h4>
                      <p className="text-white/60 text-xs truncate">
                        {song.genre} • {song.duration}
                      </p>
                    </div>
                    <button
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-[#00f2fe]/20 to-[#4facfe]/20 text-[#00f2fe] font-bold text-xs hover:bg-[#00f2fe]/40 transition cursor-pointer"
                      onClick={() => navigate(`/edit-song/${song._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSong(song._id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 cursor-pointer"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Products */}
        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <FaEdit className="text-[#4facfe] text-xl" />
            <h3 className="text-2xl font-bold text-[#4facfe]">Your Products</h3>
          </div>
          <div className="h-1 w-16 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-full mb-4" />
          <div className="flex-1 overflow-y-auto max-h-96 custom-scrollbar pr-2">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-white/60">
                <FaEdit className="text-4xl mb-2 opacity-30" />
                <span>No products added yet.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-[#181818]/80 rounded-xl p-3 hover:shadow-xl hover:border-[#4facfe]/40 border-l-4 border-l-[#4facfe] border border-transparent transition cursor-pointer group relative"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <img
                        src={`${fileBaseURL}/${(product.image || "").replace(/\\/g, "/")}`}
                        alt={product.name}
                        className="w-full h-full rounded-lg object-cover border-2 border-[#4facfe]/20 group-hover:border-[#4facfe]/60 transition"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-white truncate group-hover:text-[#4facfe] transition">
                        {product.proName}
                      </h4>
                      <p className="text-white/60 text-xs truncate">₹{product.price}</p>
                    </div>
                    <button
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-[#4facfe]/20 to-[#00f2fe]/20 text-[#4facfe] font-bold text-xs hover:bg-[#4facfe]/40 transition cursor-pointer"
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 cursor-pointer"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment History Section */}
      <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-[#4facfe] text-xl">💳</div>
          <h3 className="text-2xl font-bold text-[#4facfe]">Payment History</h3>
        </div>
        <div className="h-1 w-16 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-full mb-4" />
        <PaymentHistory />
      </div>

      {/* Decorative blurred circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#00f2fe]/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4facfe]/20 rounded-full blur-3xl -z-10 animate-pulse" />
    </div>
  );
} 