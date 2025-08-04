import React, { useEffect, useState } from 'react'
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux"
import { getAllSongOfArtist } from "../create-slice/song-slice"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function YouMayLike({ artistId }) {

  const dispatch = useDispatch()
  const { songId } = useParams()
  const [songs, setSongs] = useState([])
  const navigate=useNavigate()
  // const artistId = useSelector((state) => state.song.song.artistId)
  const [hasFetched, setHasFetched] = useState(false);

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


  console.log(artistId)
  useEffect(() => {
    //if (!artistId || hasFetched || songs.length > 0) return;

    const handleGetSongs = async () => {
      console.log("Function called");
      try {
        console.log("Artist ID:", artistId);

        const action = await dispatch(getAllSongOfArtist(artistId));
        console.log("Dispatched action result:", action);

        if (action.payload?.songs) {
          console.log(action.payload.songs[0].songs)
          const filteredSongs = action.payload.songs[0].songs.filter((id) => id._id != songId)
          console.log(filteredSongs)
          setSongs(filteredSongs);
          setHasFetched(true);
        } else {
          console.warn("No songs found in payload");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    handleGetSongs();
  }, [dispatch, artistId, hasFetched, songId]);
  console.log(songs)




  console.log(songs)
  return (
    <div className="w-full space-y-8">
      {/* First Row */}
      <div className="relative group">
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
          id="like-first-row-scroll"
          className="flex flex-row gap-3 sm:gap-4 overflow-x-auto scroll-smooth no-scrollbar px-2 w-full sm:w-[95%] mx-auto cursor-pointer"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: "none"
          }}
        >
          {songs?.map((song, index) => (
            <div
              key={`first-${index}`}
              className="flex flex-col gap-2 min-w-[60vw] max-w-[70vw] sm:min-w-[30vw] sm:max-w-[20vw] md:min-w-[8.9vw] md:max-w-[13vw] flex-shrink-0 relative pt-2"
              style={{ scrollSnapAlign: 'start' }}
              onClick={()=> navigate(`/${song.genre}/${song._id}`, { replace: true })}
            >
              <div className="relative group/image"> {/* local group just for image + icon */}
                <img
                  src={`http://localhost:5000/${(song.image || '').replace(/\\/g, '/')}`}
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
              <p className="text-white text-base sm:text-md font-semibold truncate">
                {song.title && song.title.length > 10
                  ? song.title.substring(0, 10) + "..."
                  : song.title || ""}
              </p>
              <p className="text-whiet text-xs sm:text-sm font-semibold truncate">{song.artist}</p>
            </div>
          ))}
        </div>
        {/* Right Arrow for First Row */}
      </div>
    </div>
  )
}
