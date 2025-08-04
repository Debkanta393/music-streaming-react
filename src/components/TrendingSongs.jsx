import React from 'react'
import songList from "../song.json"
import { TbPlayerPlayFilled } from "react-icons/tb";

export default function TrendingSongs() {

const firstRowSongs = songList;
  const secondRowSongs = songList;

  const scrollRow = (rowId, direction) => {
    const container = document.getElementById(rowId);
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="w-full space-y-8">
      {/* First Row */}
      <div className="relative group">
        {/* Left Arrow for First Row */}
        <button
          className="hidden group-hover:flex justify-center items-center absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg-black/50  hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer"
          onClick={() => scrollRow('trend-first-row-scroll', 'left')}
          aria-label="Scroll Left - Row 1"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        {/* First Row Song List */}
        <div
          id="trend-first-row-scroll"
          className="flex flex-row gap-3 sm:gap-4 overflow-x-auto scroll-smooth no-scrollbar px-2 sm:px-10 w-full sm:w-[95%] mx-auto cursor-pointer"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: "none"
          }}
        >
          {firstRowSongs.map((song) => (
            <div
              key={`first-${song.id}`}
              className="flex flex-col gap-2 min-w-[60vw] max-w-[70vw] sm:min-w-[30vw] sm:max-w-[20vw] md:min-w-[10vw] md:max-w-[13vw] flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative group/image"> {/* local group just for image + icon */}
                <img
                  src={song.image.replace("../public/", "/")}
                  alt={song.title}
                  className="w-full h-[200px] sm:h-[170px] object-cover rounded-md group-hover/image:scale-105 transition-all duration-300
                  bg-black/60 group-hover/image:bg-black/80"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/Songs/placeholder.jpg";
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-black/50
      opacity-0 group-hover/image:opacity-100 z-10 flex justify-center items-center rounded-full
      transition-all duration-300 pointer-events-none">
                  <TbPlayerPlayFilled className="text-white text-2xl" />
                </div>
              </div>
              <p className="text-white text-base sm:text-lg font-semibold truncate">{song.title}</p>
              <p className="text-white text-xs sm:text-sm font-semibold truncate">{song.artist}</p>
            </div>
          ))}
        </div>
        {/* Right Arrow for First Row */}
        <button
          className="hidden group-hover:flex justify-center items-center absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:bg-black/50  hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer"
          onClick={() => scrollRow('trend-first-row-scroll', 'right')}
          aria-label="Scroll Right - Row 1"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>

      {/* Second Row */}
      <div className="relative group">
        {/* Left Arrow for Second Row */}
        <button
          className="hidden group-hover:flex justify-center items-center absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg-black/50  hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer"
          onClick={() => scrollRow('trend-second-row-scroll', 'left')}
          aria-label="Scroll Left - Row 2"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        {/* Second Row Song List */}
        <div
          id="trend-second-row-scroll"
          className="flex flex-row gap-3 sm:gap-4 overflow-x-auto scroll-smooth no-scrollbar px-2 sm:px-10 w-full sm:w-[95%] mx-auto cursor-pointer"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: "none"
          }}
        >
          {secondRowSongs.map((song) => (
            <div
              key={`second-${song.id}`}
              className="flex flex-col gap-2 min-w-[60vw] max-w-[70vw] sm:min-w-[30vw] sm:max-w-[20vw] md:min-w-[10vw] md:max-w-[13vw] flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative group/image"> {/* local group just for image + icon */}
                <img
                  src={song.image.replace("../public/", "/")}
                  alt={song.title}
                  className="w-full h-[200px] sm:h-[170px] object-cover rounded-md group-hover/image:scale-105 transition-all duration-300
                  bg-black/60 group-hover/image:bg-black/80"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/Songs/placeholder.jpg";
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-black/50
      opacity-0 group-hover/image:opacity-100 z-10 flex justify-center items-center rounded-full
      transition-all duration-300 pointer-events-none">
                  <TbPlayerPlayFilled className="text-white text-2xl" />
                </div>
              </div>
              <p className="text-white text-base sm:text-lg font-semibold truncate">{song.title}</p>
              <p className="text-white text-xs sm:text-sm font-semibold truncate">{song.artist}</p>
            </div>
          ))}
        </div>
        {/* Right Arrow for Second Row */}
        <button
          className="hidden group-hover:flex justify-center items-center absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:bg-black/50  hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer"
          onClick={() => scrollRow('trend-second-row-scroll', 'right')}
          aria-label="Scroll Right - Row 2"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
  )
}
