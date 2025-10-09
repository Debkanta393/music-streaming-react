import React from 'react'
import { useSelector } from 'react-redux';

const songs = [
  {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    image: '/Songs/songs1.jpg',
    duration: '3:53'
  },
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    image: '/Songs/songs3.jpg',
    duration: '3:20'
  },
  {
    title: 'Humsafar',
    artist: 'Akhil Sachdeva',
    image: '/Songs/Humsafar.jpeg',
    duration: '4:10'
  },
  {
    title: 'Levitating',
    artist: 'Dua Lipa',
    image: '/Songs/songs4.jpg',
    duration: '3:23'
  },
  {
    title: 'Sunflower',
    artist: 'Post Malone',
    image: '/Songs/songs5.jpg',
    duration: '2:38'
  },
  {
    title: 'Closer',
    artist: 'The Chainsmokers',
    image: '/Songs/songs6.jpg',
    duration: '4:05'
  },
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    image: '/Songs/songs7.jpg',
    duration: '4:23'
  },
  {
    title: 'Faded',
    artist: 'Alan Walker',
    image: '/Songs/songs8.jpg',
    duration: '3:32'
  },
];

export default function Songs() {

  const { isAuthenticated } = useSelector(state => state.auth)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#232526] to-[#181818] text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/Songs/songs1.jpg"
          alt="Songs Hero"
          className="absolute w-full h-full object-cover object-center opacity-60 animate-fade-in"
        />
        <div className="relative z-10 text-center animate-fade-in-slow">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gradient-primary drop-shadow-lg mb-4">
            Trending Songs
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-medium max-w-2xl mx-auto">
            Listen to the latest chartbusters and all-time favorites. Find your next favorite track here!
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2027]/80 to-transparent" />
      </div>

      {/* Songs Grid */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {songs.map((song) => (
          <div
            key={song.title}
            className="card-glass rounded-2xl overflow-hidden shadow-xl hover-lift animate-slide-up flex flex-col"
          >
            <img
              src={song.image}
              alt={song.title}
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-5 flex flex-col gap-2 flex-1">
              <h2 className="text-lg font-bold text-gradient-secondary mb-1">{song.title}</h2>
              <p className="text-white/80 text-sm mb-1">by <span className="font-semibold text-white">{song.artist}</span></p>
              <span className="text-xs text-white/60 mb-2">{song.duration}</span>
              <button className="btn-primary px-4 py-2 rounded-full text-sm font-semibold mt-auto hover-lift">▶ Play</button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      {!isAuthenticated &&
        <div className="flex flex-col items-center py-10 animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gradient-primary">Want to save your favorite songs?</h3>
          <p className="text-white/70 mb-4">Sign up or log in to create playlists and enjoy unlimited streaming!</p>
          <a href="/signup" className="btn-primary px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover-lift">Sign Up Free</a>
        </div>
      }
    </div>
  )
}
