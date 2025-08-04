import React, { useEffect, useState } from 'react'
import songList from "../song.json"
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useDispatch } from "react-redux"
import { getAllSong } from "../create-slice/song-slice"
import { useNavigate } from "react-router-dom"

export default function RecomendedSongs() {
  // Create two separate song lists for the two rows
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

  // Getting songs
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (hasFetched || songs.length > 0) return;
  
    const fetchSongs = async () => {
      try {
        const action = await dispatch(getAllSong());
        if (action.payload && action.payload.songs) {
          setSongs(action.payload.songs);
          setHasFetched(true); // ✅ prevent re-fetch
        }
      } catch (error) {
        console.log("Error fetching songs:", error);
      }
    };
  
    fetchSongs();
  }, [dispatch, hasFetched, songs.length]);


  // Fetch song details page
  const navigate=useNavigate()

  return (
    <div className="w-full space-y-8">
      {/* First Row */}
      <div className="relative">
        {/* Left Arrow for First Row */}
        <div className='flex flex-row gap-6 items-center mx-auto absolute -top-10 right-10'>
          <button
            className="hover:bg-black/50  hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer text-white"
            onClick={() => scrollRow('rec-first-row-scroll', 'left')}
            aria-label="Scroll Left - Row 1"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            className="hover:bg-black/50 hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer text-white"
            onClick={() => scrollRow('rec-first-row-scroll', 'right')}
            aria-label="Scroll Right - Row 1"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
        {/* First Row Song List */}
        <div
          id="rec-first-row-scroll"
          className="flex flex-row gap-3 sm:gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full sm:w-[95%] mx-auto cursor-pointer min-w-0 h-fit"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: "none"
          }}
        >
          {songs
            ?.flatMap(songArray => songArray?.songs || [])
            ?.map((songItem, index) => (
              <div
                key={`first-${index}`}
                className="flex flex-col gap-2 min-w-[60vw] max-w-[70vw] sm:min-w-[30vw] sm:max-w-[20vw] md:min-w-[8.9vw] md:max-w-[13vw] flex-shrink-0 relative pt-2"
                style={{ scrollSnapAlign: 'start' }}
                onClick={()=> navigate(`${songItem.genre}/${songItem._id}`)}
              >
                <div className="relative group/image"> {/* local group just for image + icon */}
                  <img
                    src={`http://localhost:5000/${(songItem.image || '').replace(/\\/g, '/')}`}
                    alt={songItem.title}
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
                <p className="text-white text-base sm:text-md font-semibold truncate">
                  {songItem.title && songItem.title.length > 10
                    ? songItem.title.substring(0, 10) + "..."
                    : songItem.title || ""}
                </p>
                <p className="text-whiet text-xs sm:text-sm font-semibold truncate">{songItem.artist}</p>
              </div>
            ))}
        </div>
        {/* Right Arrow for First Row */}

      </div>

      {/* Second Row */}
      {/* <div className="relative group">
        
        <button
          className="hidden group-hover:flex justify-center items-center absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg-black/50  hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer"
          onClick={() => scrollRow('rec-second-row-scroll', 'left')}
          aria-label="Scroll Left - Row 2"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        
        <div
          id="rec-second-row-scroll"
          className="flex flex-row gap-3 sm:gap-4 overflow-x-auto scroll-smooth no-scrollbar px-2 sm:px-10 w-full sm:w-[95%] mx-auto cursor-pointer min-w-0"
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
              <div className="relative group/image"> 
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
              <p className="text-black text-base sm:text-lg font-semibold truncate">{song.title}</p>
              <p className="text-black text-xs sm:text-sm font-semibold truncate">{song.artist}</p>
            </div>
          ))}
        </div>
       
        <button
          className="hidden group-hover:flex justify-center items-center absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:bg-black/50  hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer"
          onClick={() => scrollRow('rec-second-row-scroll', 'right')}
          aria-label="Scroll Right - Row 2"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div> */}
    </div >
  )
}
