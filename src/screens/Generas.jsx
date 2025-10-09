import React from 'react'
import { useSelector } from 'react-redux';

const genres = [
  {
    name: 'Pop',
    image: '/Songs/songs1.jpg',
    description: 'Catchy melodies and chart-topping hits from the world of Pop music.'
  },
  {
    name: 'Rock',
    image: '/Songs/songs3.jpg',
    description: 'Feel the energy with classic and modern Rock anthems.'
  },
  {
    name: 'Hip-Hop',
    image: '/Songs/songs4.jpg',
    description: 'Rhythmic beats and powerful lyrics from top Hip-Hop artists.'
  },
  {
    name: 'Jazz',
    image: '/Songs/songs5.jpg',
    description: 'Smooth, soulful, and improvisational sounds of Jazz.'
  },
  {
    name: 'Electronic',
    image: '/Songs/songs6.jpg',
    description: 'Pulsating electronic music for every mood and moment.'
  },
  {
    name: 'Classical',
    image: '/Songs/songs7.jpg',
    description: 'Timeless masterpieces from the world’s greatest composers.'
  },
  {
    name: 'Indie',
    image: '/Songs/songs8.jpg',
    description: 'Discover unique sounds and rising stars in Indie music.'
  },
  {
    name: 'Bollywood',
    image: '/Songs/Humsafar.jpeg',
    description: 'Vibrant and emotional tracks from Bollywood cinema.'
  },
];

export default function Generas() {

  const { isAuthenticated } = useSelector(state => state.auth)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232526] to-[#0f2027] text-white">
      {/* Hero Section with Video */}
      <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <video
          className="absolute w-full h-full object-cover opacity-60 animate-fade-in"
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
        />
        <div className="relative z-10 text-center animate-fade-in-slow">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gradient-primary drop-shadow-lg mb-4">
            Explore Genres
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-medium max-w-2xl mx-auto">
            Dive into a world of music. Discover your favorite genres, explore new sounds, and find the perfect vibe for every moment.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2027]/80 to-transparent" />
      </div>

      {/* Genres Grid */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {genres.map((genre) => (
          <div
            key={genre.name}
            className="card-glass rounded-2xl overflow-hidden shadow-xl hover-lift animate-slide-up"
          >
            <img
              src={genre.image}
              alt={genre.name}
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-5 flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-gradient-secondary mb-1">{genre.name}</h2>
              <p className="text-white/80 text-sm">{genre.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      {!isAuthenticated &&
        <div className="flex flex-col items-center py-10 animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gradient-primary">Ready to discover more?</h3>
          <p className="text-white/70 mb-4">Sign up or log in to create your own playlists and follow your favorite genres!</p>
          <a href="/signup" className="btn-primary px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover-lift">Get Started</a>
        </div>
      }
    </div>
  )
}
