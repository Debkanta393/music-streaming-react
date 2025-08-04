import React from "react";

export default function Home2() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#232526] text-white font-sans">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#181818]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Spotify for Artists" className="h-10 w-10 rounded-full bg-white" />
          <span className="text-2xl font-bold tracking-tight">Spotify for Artists</span>
        </div>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          <li className="hover:text-green-400 cursor-pointer transition">Home</li>
          <li className="hover:text-green-400 cursor-pointer transition">Music</li>
          <li className="hover:text-green-400 cursor-pointer transition">Audience</li>
          <li className="hover:text-green-400 cursor-pointer transition">Profile</li>
          <li className="hover:text-green-400 cursor-pointer transition">Team</li>
          <li className="hover:text-green-400 cursor-pointer transition">Resources</li>
        </ul>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-green-400 hover:text-white transition">Log in</button>
          <button className="px-5 py-2 rounded-full bg-green-400 text-white font-semibold hover:bg-green-500 transition">Sign up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16 md:py-32 gap-12">
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Welcome to <span className="text-green-400">Spotify for Artists</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-xl mb-6">
            Get the tools and insights you need to grow your audience and connect with fans. Manage your artist profile, track your music's performance, and unlock new opportunities—all in one place.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-full bg-green-400 text-white font-bold text-lg shadow-lg hover:bg-green-500 transition">Get Access</button>
            <button className="px-8 py-3 rounded-full border border-white/30 text-white font-bold text-lg hover:bg-white hover:text-black transition">Learn More</button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/public/Singer/singer1.webp" alt="Artist dashboard preview" className="rounded-3xl shadow-2xl w-[350px] md:w-[450px] h-auto object-cover border-4 border-white/10" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 md:px-24 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-[#232526] rounded-2xl p-8 shadow-lg border border-white/10 flex flex-col items-center text-center gap-4">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mx-auto text-green-400"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="text-xl font-bold">Track Your Music</h3>
          <p className="text-white/80">See real-time stats and understand how your songs are performing across the world.</p>
        </div>
        <div className="bg-[#232526] rounded-2xl p-8 shadow-lg border border-white/10 flex flex-col items-center text-center gap-4">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mx-auto text-green-400"><rect x="4" y="4" width="16" height="16" rx="8" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="text-xl font-bold">Grow Your Audience</h3>
          <p className="text-white/80">Discover insights about your listeners and learn how to reach more fans.</p>
        </div>
        <div className="bg-[#232526] rounded-2xl p-8 shadow-lg border border-white/10 flex flex-col items-center text-center gap-4">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mx-auto text-green-400"><rect x="2" y="7" width="20" height="10" rx="5" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="text-xl font-bold">Manage Your Profile</h3>
          <p className="text-white/80">Update your artist image, bio, and playlists to showcase your brand.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-8 px-8 md:px-24 border-t border-white/10 text-white/60 text-sm flex flex-col md:flex-row justify-between items-center gap-4 bg-[#181818]">
        <div>&copy; {new Date().getFullYear()} Spotify for Artists (Demo)</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-green-400">Privacy Policy</a>
          <a href="#" className="hover:text-green-400">Terms of Service</a>
          <a href="#" className="hover:text-green-400">Help</a>
        </div>
      </footer>
    </div>
  );
}
