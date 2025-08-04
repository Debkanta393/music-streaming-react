import React from 'react'
import artist from "../artist.json"
import { useNavigate } from 'react-router-dom'
import { FaStar, FaQuoteLeft, FaMusic, FaInstagram, FaTwitter, FaPlay } from 'react-icons/fa';
import { GiMicrophone } from "react-icons/gi";

const fallbackGenres = [
  'Pop', 'Rock', 'Jazz', 'Hip-Hop', 'Classical', 'Indie', 'Electronic', 'Soul', 'Folk', 'R&B'
];
const fallbackTaglines = [
  'Featured Artist',
  'Rising Star',
  'Top Charting',
  'New Sensation',
  'Award Winner',
  'Fan Favorite',
  'Trending Now',
  'Legend in the Making',
  'Voice of a Generation',
  'Musical Innovator'
];
const funFacts = [
  'Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.',
  'Where words fail, music speaks.',
  'Every artist was first an amateur.',
  'Music can change the world.',
  'Art enables us to find ourselves.',
  'Creativity takes courage.',
  'Music is the strongest form of magic.',
  'Art is not what you see, but what you make others see.'
];
const artistBios = [
  'Passionate about blending genres and breaking boundaries.',
  'Known for electrifying live performances and heartfelt lyrics.',
  'A storyteller at heart, bringing emotions to life through music.',
  'Inspired by the classics, creating the sound of tomorrow.',
  'Champion of indie music and creative freedom.',
  'Bringing soulful vibes and positive energy to every track.',
  'Award-winning producer and vocal powerhouse.',
  'Fusing tradition with innovation in every beat.',
  'A voice that resonates with millions.',
  'On a mission to make the world dance.'
];

export default function Artists() {
  const navigate = useNavigate();
  const handleBecomeArtist = () => {
    navigate("/become-artist");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-purple-100 font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-16 shadow-2xl mb-10 overflow-hidden"  
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url("/hero-bg.png")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-2xl mb-3 tracking-tight z-10 text-center">Meet the Artists</h1>
        <p className="text-lg text-white/90 mb-5 z-10 text-center max-w-2xl">Discover, connect, and get inspired by the most creative minds in music. Explore their journeys, listen to their stories, and become a part of our vibrant artist community.</p>
        <div className="flex flex-col sm:flex-row gap-4 items-center z-10 mb-6">
          <button
            className="flex items-center gap-2 bg-[#6C63FF] text-white px-8 py-3 rounded-full shadow-xl font-bold text-lg hover:scale-105 hover:bg-[#5548c8] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#6C63FF]/40 border-2 border-white/30"
            onClick={handleBecomeArtist}
          >
            <GiMicrophone className="text-white text-2xl" /> Become an Artist
          </button>
          <button
            className="flex items-center gap-2 bg-white/90 text-[#6C63FF] px-8 py-3 rounded-full shadow font-bold text-lg hover:scale-105 hover:bg-[#6C63FF] hover:text-white transition-all duration-300 border-2 border-[#6C63FF]/30"
          >
            Browse All Artists
          </button>
        </div>
        {/* Stats Bar */}
        <div className="flex gap-8 justify-center z-10 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">120+</span>
            <span className="text-white/80 text-sm">Artists</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">20</span>
            <span className="text-white/80 text-sm">Genres</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">50K+</span>
            <span className="text-white/80 text-sm">Listeners</span>
          </div>
        </div>
      </section>

      {/* About/How to Join Section */}
      <section className="max-w-5xl mx-auto mb-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center border-l-8 border-[#6C63FF]">
            <FaQuoteLeft className="text-[#6C63FF] text-3xl mb-2" />
            <p className="text-lg text-gray-700 italic text-center mb-2">“Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.”</p>
            <span className="text-[#6C63FF] font-bold">— Plato</span>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center border-l-8 border-[#00BFAE]">
            <h3 className="text-xl font-bold text-[#00BFAE] mb-4">Why Become an Artist?</h3>
            <ul className="space-y-3 w-full">
              <li className="flex items-center gap-3 text-gray-700"><span className="bg-[#6C63FF]/10 p-2 rounded-full"><FaMusic className="text-[#6C63FF]" /></span>Share your music with a global audience</li>
              <li className="flex items-center gap-3 text-gray-700"><span className="bg-[#6C63FF]/10 p-2 rounded-full"><FaStar className="text-[#6C63FF]" /></span>Get discovered and grow your fanbase</li>
              <li className="flex items-center gap-3 text-gray-700"><span className="bg-[#6C63FF]/10 p-2 rounded-full"><FaPlay className="text-[#6C63FF]" /></span>Collaborate with top artists and producers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#494949] mb-6 ml-2">Featured Artists</h2>
        <div
          id="artist-first-row-scroll"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          {artist.map((artist, idx) => (
            <div
              key={artist.id}
              className="group relative flex flex-col items-center justify-between h-80 w-full bg-white/90 rounded-3xl shadow-xl overflow-hidden border-2 border-[#6C63FF]/10 hover:border-[#6C63FF] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={artist.image.replace("../public/", "/")}
                alt={artist.name}
                className="w-24 h-24 object-cover rounded-full mt-6 border-4 border-[#6C63FF]/40 shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div className="mt-3 text-center z-10 px-2">
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-[#6C63FF]/20 transition-colors duration-300 font-serif drop-shadow">{artist.name}</h3>
                <div className="flex items-center justify-center gap-2 mt-1 group-hover:opacity-0">
                  <FaMusic className="text-[#6C63FF] text-base" />
                  <span className="text-sm text-gray-700 font-medium">{artist.genre || fallbackGenres[idx % fallbackGenres.length]}</span>
                </div>
                <span className="inline-block mt-2 text-xs font-semibold text-white bg-[#6C63FF] px-3 py-1 rounded-full shadow group-hover:opacity-0">{artist.tagline || fallbackTaglines[idx % fallbackTaglines.length]}</span>
                <p className="text-xs text-gray-600 mt-2 group-hover:opacity-0">{artist.bio || artistBios[idx % artistBios.length]}</p>
              </div>
              {/* Socials and Listen Now */}
              <div className="flex items-center justify-center gap-4 mt-2 mb-4 z-10">
                <a href="#" className="text-[#6C63FF] hover:text-[#001dbf] text-xl transition-colors"><FaInstagram /></a>
                <a href="#" className="text-[#6C63FF] hover:text-[#001dbf] text-xl transition-colors"><FaTwitter /></a>
                <button className="flex items-center gap-2 bg-[#00BFAE] text-white px-4 py-2 rounded-full shadow hover:bg-[#6C63FF] transition-all duration-300 font-semibold text-sm"><FaPlay /> Listen Now</button>
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/80 via-[#00BFAE]/70 to-[#6C63FF]/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 px-4">
                <button className="bg-white/90 text-[#6C63FF] font-bold px-6 py-2 rounded-full shadow-lg hover:bg-[#6C63FF]
                 hover:text-white transition-all duration-300 scale-90 group-hover:scale-110 group-hover:shadow-[#6C63FF]/60 mb-3 z-10 cursor-pointer">View Profile</button>
                <p className="text-white text-center text-sm italic max-w-[90%]">{funFacts[idx % funFacts.length]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-16 py-8 bg-gradient-to-r from-[#6C63FF]/90 via-[#00BFAE]/80 to-[#6C63FF]/90 text-white text-center rounded-t-3xl shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-xl font-bold mb-2">Ready to share your music with the world?</h3>
          <p className="mb-4">Join our artist community and inspire millions of listeners. <span className="font-semibold">Contact us:</span> support@musicstream.com</p>
          <button
            className="bg-white/90 text-[#6C63FF] px-6 py-2 rounded-full font-bold shadow hover:bg-[#6C63FF] hover:text-white transition-all duration-300"
            onClick={handleBecomeArtist}
          >Become an Artist</button>
        </div>
      </footer>
    </div>
  );
}
