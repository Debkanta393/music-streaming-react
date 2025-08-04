import React from 'react'
import RecomendedSongs from '../components/RecomendedSongs'
import TrendingSongs from '../components/TrendingSongs'
import PopularArtists from '../components/PopularArtists'
import { CiMicrophoneOn } from "react-icons/ci";
import {
  FaMusic,
  FaUserFriends,
  FaUpload,
  FaPlayCircle,
  FaStar,
  FaHeadphones,
  FaHeart,
  FaShare,
  FaDownload,
  FaSpotify,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaCrown,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaGlobe,
  FaMobile,
  FaDesktop,
  FaTablet,
} from "react-icons/fa";

export default function Home() {
  const token = localStorage.getItem("token")

  const handleBecomeArtist = () => {
    // Add navigation or modal logic here
  }

  const handleGetStarted = () => {
    // Add navigation logic here
  }

  const handleListenNow = () => {
    // Add navigation logic here
  }

  const stats = [
    { number: "10M+", label: "Active Users", icon: FaUsers },
    { number: "50M+", label: "Songs Streamed", icon: FaHeadphones },
    { number: "100K+", label: "Artists", icon: FaMobile },
    { number: "1M+", label: "Playlists", icon: FaMusic }
  ]

  const features = [
    {
      icon: FaHeadphones,
      title: "High Quality Audio",
      description: "Stream in crystal clear quality up to 320kbps"
    },
    {
      icon: FaMobile,
      title: "Cross Platform",
      description: "Listen anywhere on mobile, desktop, or tablet"
    },
    {
      icon: FaHeart,
      title: "Personalized",
      description: "AI-powered recommendations just for you"
    },
    {
      icon: FaShare,
      title: "Social Sharing",
      description: "Share your favorite tracks with friends"
    }
  ]

  const genres = [
    { name: "Pop", image: "/Songs/songs1.jpg", color: "from-pink-500 to-purple-600" },
    { name: "Rock", image: "/Songs/songs2.png", color: "from-red-500 to-orange-600" },
    { name: "Hip Hop", image: "/Songs/songs3.jpg", color: "from-purple-500 to-indigo-600" },
    { name: "Electronic", image: "/Songs/songs4.jpg", color: "from-blue-500 to-cyan-600" },
    { name: "Jazz", image: "/Songs/songs5.jpg", color: "from-yellow-500 to-orange-600" },
    { name: "Classical", image: "/Songs/songs6.jpg", color: "from-green-500 to-teal-600" }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Music Producer",
      image: "/Singer/singer2.jpg",
      text: "This platform changed my career. The community is amazing and the tools are incredible for independent artists.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Music Lover",
      image: "/Singer/singer3.jpg",
      text: "Best music streaming service I've ever used. The discovery features are unmatched!",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "DJ & Artist",
      image: "/Singer/singer4.webp",
      text: "The quality and variety of music here is outstanding. Perfect for both listening and creating.",
      rating: 5
    }
  ]

  return (
    <div className='p-0 m-0 min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] overflow-x-hidden'>
      {/* Hero Section */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover object-center opacity-40"
          src="/hero-video.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/20" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#00f2fe]/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#4facfe]/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-[#00f2fe]/30 rounded-full blur-lg animate-pulse delay-2000" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 max-w-6xl">
          {/* <div className="mb-8">
            <img src="/logo.png" alt="Music Streaming" className="w-24 h-24 mx-auto mb-6 animate-bounce" />
          </div> */}

          <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl tracking-tight mb-14 animate-fade-in">
            The Future of <span className="bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent animate-pulse">Music</span>
          </h1>

          {/* <p className="text-white/90 text-xl md:text-3xl font-light mb-8 animate-fade-in-slow max-w-4xl mx-auto leading-relaxed">
            Discover, stream, and share the world's best music. Join millions of music lovers and creators in the ultimate audio experience.
          </p> */}

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up">
            <button
              className="flex items-center gap-3 px-8 py-4 text-white bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-xl rounded-full font-bold shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-[#00f2fe]/50 animate-pulse-glow"
              onClick={handleGetStarted}
            >
              <FaPlayCircle className='text-2xl' /> Start Listening Free
            </button>
            <button
              className="flex items-center gap-3 px-8 py-4 text-white border-2 border-[#00f2fe] text-xl rounded-full font-bold hover:bg-[#00f2fe]/10 transition-all duration-300"
              onClick={handleBecomeArtist}
            >
              <CiMicrophoneOn className='text-2xl' /> Become an Artist
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl animate-fade-in-slow">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-[#00f2fe] mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Music Player Preview */}
        <div className="absolute top-1/10 right-10 hidden lg:block animate-float">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <img src="/Songs/songs1.jpg" alt="Now Playing" className="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <h4 className="text-white font-bold">Now Playing</h4>
                <p className="text-white/70 text-sm">Dream High - Ariana Melody</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="w-12 h-12 bg-[#00f2fe] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <FaPlayCircle className="text-white text-lg" />
              </button>
              <div className="flex gap-2">
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#00f2fe]/20 transition-colors">
                  <FaHeart className="text-white text-sm" />
                </button>
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#00f2fe]/20 transition-colors">
                  <FaShare className="text-white text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {/* <div className="w-full py-20 px-4 bg-gradient-to-r from-[#1a1a2e]/80 to-[#16213e]/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Experience music like never before with our cutting-edge platform designed for music lovers and creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#00f2fe]/50 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* How it Works Section */}
      <div className="w-full py-20 px-4 bg-gradient-to-r from-[#16213e]/60 to-[#1a1a2e]/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Get started in minutes and join the global music community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#00f2fe]/50 transition-all duration-300 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaUserFriends className="text-3xl text-white" />
                </div>
                <div className="text-4xl font-bold text-[#00f2fe] mb-2">01</div>
                <h3 className="text-2xl font-bold text-white mb-4">Join the Community</h3>
                <p className="text-white/70 text-lg">Sign up for free and connect with millions of music lovers and creators worldwide.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#4facfe]/50 transition-all duration-300 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaUpload className="text-3xl text-white" />
                </div>
                <div className="text-4xl font-bold text-[#4facfe] mb-2">02</div>
                <h3 className="text-2xl font-bold text-white mb-4">Upload & Share</h3>
                <p className="text-white/70 text-lg">Upload your own tracks and share your unique sound with the world.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#00f2fe]/50 transition-all duration-300 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaPlayCircle className="text-3xl text-white" />
                </div>
                <div className="text-4xl font-bold text-[#00f2fe] mb-2">03</div>
                <h3 className="text-2xl font-bold text-white mb-4">Listen & Discover</h3>
                <p className="text-white/70 text-lg">Explore trending songs, new releases, and curated playlists every day.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Artist Section */}
      {/* <div className="w-full py-20 px-4 bg-gradient-to-r from-[#00f2fe]/5 to-[#4facfe]/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f2fe]/20 to-[#4facfe]/20 rounded-3xl blur-2xl" />
              <img
                src="/Singer/singer1.webp"
                alt="Featured Artist"
                className="relative w-full h-[500px] rounded-3xl object-cover shadow-2xl border-4 border-[#00f2fe]/40 animate-fade-in"
              />
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 text-[#FFD700]">
                  <FaCrown className="text-xl" />
                  <span className="font-bold">Artist of the Month</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <FaStar className="text-3xl text-[#FFD700]" />
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Featured Artist: <span className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent">Ariana Melody</span>
                </h3>
              </div>
              
              <p className="text-white/80 text-xl leading-relaxed">
                Ariana Melody is taking the charts by storm with her latest single "Dream High". 
                From bedroom producer to global sensation, her journey inspires millions of aspiring artists worldwide.
              </p>
              
              <div className="flex items-center gap-4 text-white/70 text-lg">
                <div className="flex items-center gap-2">
                  <FaHeadphones />
                  <span>2.5M+ Streams</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaHeart />
                  <span>500K+ Followers</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-bold shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  onClick={handleListenNow}
                >
                  <FaPlayCircle /> Listen Now
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-[#00f2fe] text-white font-bold hover:bg-[#00f2fe]/10 transition-all duration-300">
                  Follow Artist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Genres Section */}
      <div className="w-full py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Genres</h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Discover music across all genres and find your perfect sound
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {genres.map((genre, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10 group-hover:from-black/40 group-hover:to-black/20 transition-all duration-300" />
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {genre.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Music Sections */}
      <div className="w-full py-20 px-4 bg-gradient-to-r from-[#1a1a2e]/60 to-[#16213e]/60">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Recently Played */}
          <div className='space-y-6'>
            <div className="flex items-center justify-between">
              <h2 className='text-3xl md:text-4xl font-bold text-white'>Recently Played</h2>
              <button className="text-[#00f2fe] hover:text-[#4facfe] transition-colors flex items-center gap-2 group">
                View All
                <FaPlayCircle className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <RecomendedSongs />
          </div>

          {/* New Releases */}
          <div className='space-y-6'>
            <div className="flex items-center justify-between">
              <h2 className='text-3xl md:text-4xl font-bold text-white'>New Releases</h2>
              <button className="text-[#00f2fe] hover:text-[#4facfe] transition-colors flex items-center gap-2 group">
                View All
                <FaPlayCircle className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <TrendingSongs />
          </div>

          {/* Popular Artists */}
          <div className='space-y-6'>
            <div className="flex items-center justify-between">
              <h2 className='text-3xl md:text-4xl font-bold text-white'>Popular Artists</h2>
              <button className="text-[#00f2fe] hover:text-[#4facfe] transition-colors flex items-center gap-2 group">
                View All
                <FaPlayCircle className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <PopularArtists />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full py-20 px-4 bg-gradient-to-r from-[#16213e]/80 to-[#1a1a2e]/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Join thousands of satisfied users who have discovered their perfect music experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#00f2fe]/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#00f2fe]/50"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                    <p className="text-[#00f2fe] text-sm">{testimonial.role}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-[#FFD700] text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/80 text-lg italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full py-20 px-4 bg-gradient-to-r from-[#00f2fe]/10 to-[#4facfe]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
            Join millions of music lovers and creators. Start streaming, uploading, and discovering today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-bold rounded-full text-xl hover:scale-105 transition-all duration-300">
              Get Started Free
            </button>
            <button className="px-8 py-4 border-2 border-[#00f2fe] text-white font-bold rounded-full text-xl hover:bg-[#00f2fe]/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="w-full py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
          <div className="flex justify-center gap-6">
            {[
              { icon: FaSpotify, label: "Spotify" },
              { icon: FaYoutube, label: "YouTube" },
              { icon: FaInstagram, label: "Instagram" },
              { icon: FaTwitter, label: "Twitter" },
              { icon: FaDiscord, label: "Discord" }
            ].map((social, index) => (
              <button key={index} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00f2fe]/20 transition-all duration-300 group">
                <social.icon className="text-xl text-white group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-[#00f2fe]/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-[#4facfe]/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00f2fe]/5 rounded-full blur-2xl -z-10 animate-pulse delay-2000" />
    </div>
  )
}
