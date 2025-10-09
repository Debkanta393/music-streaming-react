import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {getAlbums} from "../create-slice/album-slice"
import { useNavigate } from 'react-router-dom';


export default function Albums() {

  const fileBaseURL = import.meta.env.VITE_FILE_API_URI;
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [albums, setAlbums]=useState([])
  useEffect(()=>{
    const handleGetAlbums=async()=>{
      const response=await dispatch(getAlbums())
      console.log(response)
      setAlbums(response.payload.albums)
    }
    handleGetAlbums()
  },[])

  console.log(albums)
  const { isAuthenticated } = useSelector(state => state.auth)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] via-[#0f2027] to-[#181818] text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/Songs/songs12.jpg"
          alt="Albums Hero"
          className="absolute w-full h-full object-cover object-center opacity-60 animate-fade-in"
        />
        <div className="relative z-10 text-center animate-fade-in-slow">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gradient-primary drop-shadow-lg mb-4">
            Featured Albums
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-medium max-w-2xl mx-auto">
            Discover the most popular albums, handpicked for you. Dive into timeless classics and the latest hits.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2027]/80 to-transparent" />
      </div>

      {/* Albums Grid */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" >
        {albums.map((album, index) => (
          <div
            key={index}
            className="card-glass rounded-2xl overflow-hidden shadow-xl hover-lift animate-slide-up flex flex-col"
            onClick={()=> navigate(`/albums/${album._id}`)}
          >
            <img
              src={`${fileBaseURL}/${(album.albumImage || '').replace(/\\/g, '/')}`}
              alt={album.albumName}
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-5 flex flex-col gap-2 flex-1">
              <h2 className="text-xl font-bold text-gradient-secondary mb-1">{album.albumName}</h2>
              <p className="text-white/80 text-sm mb-1">by <span className="font-semibold text-white mr-2">{album.artist.name}</span>({new Date(album.createdAt)
              .getUTCFullYear()})</p>
              <button className="btn-primary px-4 py-2 rounded-full text-sm font-semibold mt-auto hover-lift">▶ Play Sample</button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      {!isAuthenticated &&
        <div className="flex flex-col items-center py-10 animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gradient-primary">Want to listen to full albums?</h3>
          <p className="text-white/70 mb-4">Sign up or log in to unlock unlimited streaming and create your own album collection!</p>
          <a href="/signup" className="btn-primary px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover-lift">Join Now</a>
        </div>
      }
    </div>
  )
}
