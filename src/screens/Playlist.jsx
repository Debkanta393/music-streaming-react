import React from 'react'
import { useSelector } from 'react-redux';

const playlists = [
  {
    name: 'Morning Motivation',
    description: 'Start your day with energetic and uplifting tracks.',
    image: '/Songs/songs5.jpg',
  },
  {
    name: 'Chill Hits',
    description: 'Relax and unwind with smooth, mellow tunes.',
    image: '/Songs/songs8.jpg',
  },
  {
    name: 'Bollywood Party',
    description: 'Dance to the latest and greatest Bollywood hits.',
    image: '/Songs/Humsafar.jpeg',
  },
  {
    name: 'Rock Classics',
    description: 'Timeless rock anthems from legendary bands.',
    image: '/Songs/songs3.jpg',
  },
  {
    name: 'Focus Flow',
    description: 'Stay productive with instrumental and lo-fi beats.',
    image: '/Songs/songs6.jpg',
  },
  {
    name: 'Workout Pump',
    description: 'High-energy tracks to power your workout.',
    image: '/Products/guiter.jpg',
  },
  {
    name: 'Love Songs',
    description: 'Romantic tracks for every mood and moment.',
    image: '/Songs/songs7.jpg',
  },
  {
    name: 'Indie Discoveries',
    description: 'Explore fresh sounds from up-and-coming indie artists.',
    image: '/Songs/songs4.jpg',
  },
];

export default function Playlist() {

  const { isAuthenticated } = useSelector(state => state.auth)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232526] to-[#0f2027] text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/Songs/songs5.jpg"
          alt="Playlist Hero"
          className="absolute w-full h-full object-cover object-center opacity-60 animate-fade-in"
        />
        <div className="relative z-10 text-center animate-fade-in-slow">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gradient-primary drop-shadow-lg mb-4">
            Curated Playlists
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-medium max-w-2xl mx-auto">
            Handpicked playlists for every mood, moment, and activity. Find your perfect soundtrack!
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2027]/80 to-transparent" />
      </div>

      {/* Playlists Grid */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {playlists.map((playlist) => (
          <div
            key={playlist.name}
            className="card-glass rounded-2xl overflow-hidden shadow-xl hover-lift animate-slide-up flex flex-col"
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-5 flex flex-col gap-2 flex-1">
              <h2 className="text-lg font-bold text-gradient-secondary mb-1">{playlist.name}</h2>
              <p className="text-white/80 text-sm mb-2">{playlist.description}</p>
              <button className="btn-primary px-4 py-2 rounded-full text-sm font-semibold mt-auto hover-lift">▶ Play Playlist</button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      {!isAuthenticated &&
        <div className="flex flex-col items-center py-10 animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gradient-primary">Create your own playlists!</h3>
          <p className="text-white/70 mb-4">Sign up or log in to start building and sharing your favorite playlists with friends.</p>
          <a href="/signup" className="btn-primary px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover-lift">Start Now</a>
        </div>
      }
    </div>
  )
}
