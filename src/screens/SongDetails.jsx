import React, { useState, useRef, useEffect } from 'react'
import { BsHeart, BsHeartFill } from "react-icons/bs";
import YouMayLike from '../components/YouMayLike';
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiSpeakerNoneLight, PiSpeakerHighLight, PiSpeakerXLight } from "react-icons/pi";
import { TbPlayerPlayFilled, TbPlayerPauseFilled } from "react-icons/tb";
import Products from '../components/Products';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSongById, updateListenCount, updateSongLike } from '../create-slice/song-slice';
import { FastAverageColor } from 'fast-average-color';
import chroma from 'chroma-js';

export default function SongDetails() {

  const { user, isAuthenticated } = useSelector(state => state.auth)
  const [isLiked, setIsLiked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef(null)
  const { category, songId } = useParams()
  const dispatch = useDispatch()
  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [artistName, setArtistName] = useState("")
  const [artistId, setArtistId] = useState("")
  const [songData, setSongData] = useState({})
  const [loading, setLoading] = useState(false)
  const fileBaseURL = import.meta.env.VITE_FILE_API_URI;
  const listenedTimeRef = useRef(0);
  const hasSentListenRef = useRef(false);
  const [userLike, setUserLike] = useState(false)


  // Audio control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  // Time update
  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  // Volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  // Audio play/pause
  const handlePlayPause = () => {
    setIsPlaying((prev) => {
      const nowPlaying = !prev;
      if (nowPlaying) {
        handleTimeTrack(); // Start tracking only when playing
      } else {
        stopTracking(); // Stop tracking on pause
      }
      return nowPlaying;
    });
  };

  // Mobile volume control
  const handleMobileVolumeChange = () => {
    setVolume(volume + 0.1);
  };
  const [isMobileVolumeOpen, setIsMobileVolumeOpen] = useState(false);
  const volumeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target)) {
        setIsMobileVolumeOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);


  // Get specific song data
  useEffect(() => {
    const getSongHandler = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getSongById({ category, songId }));
        console.log(response)
        if (!response.payload) throw new Error("Song not found");

        setArtistName(response.payload.artistName);
        setArtistId(response.payload.artistId)
        setSongData(response.payload.song);
        const likes = response.payload.song?.like || [];
        const isLiked = likes.some(like => like.user.toString() === user._id.toString());
        setUserLike(isLiked)
      } catch (error) {
        console.error("Failed to fetch song:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (category && songId) getSongHandler();
  }, [category, songId, dispatch]);



  // Set background color from image
  useEffect(() => {
    const fac = new FastAverageColor();
    const img = imgRef.current;

    if (img) {
      fac.getColorAsync(img, { mode: 'speed' })
        .then(color => {
          const rgb = color.rgb;
          setBgColor(rgb);

          // Determine brightness for text contrast
          const brightness = chroma(rgb).luminance();
          setTextColor(brightness > 0.5 ? '#000000' : '#ffffff');
        })
        .catch(e => {
          console.error('Color extraction error:', e);
        });
    }
  }, [songData.imageUrl]);



  // Condition for set listen count
let interval = null; // Global to be shared across

const handleTimeTrack = () => {
  if (interval) return; // prevent duplicate intervals

  console.log("✅ Starting interval...");
  interval = setInterval(async () => {
    listenedTimeRef.current += 1;
    console.log("⏱️ Listening time:", listenedTimeRef.current);

    if (listenedTimeRef.current >= 30 && !hasSentListenRef.current) {
      console.log("🎯 30s reached! Dispatching listen count");
      const res = await dispatch(updateListenCount(songId));

      if (updateListenCount.fulfilled.match(res)) {
        console.log("🎯 Listen count updated successfully", res.payload);
      }

      hasSentListenRef.current = true;
    }
  }, 1000);
};

const stopTracking = () => {
  console.log("⏹️ Stopping interval...");
  clearInterval(interval);
  interval = null;
};

useEffect(() => {
  const audio = audioRef.current;

  if (audio) {
    audio.addEventListener("play", handleTimeTrack);
    audio.addEventListener("pause", stopTracking);
    audio.addEventListener("ended", stopTracking);
  }

  return () => {
    if (audio) {
      audio.removeEventListener("play", handleTimeTrack);
      audio.removeEventListener("pause", stopTracking);
      audio.removeEventListener("ended", stopTracking);
    }
    stopTracking(); // clear interval
  };
}, [dispatch, songId]);





  // Song like dislike
  const handleSongLike = async () => {
    try {
      const response = await dispatch(updateSongLike(songId));

      if (response.payload) {
        const { songStatus, message } = response.payload;

        if (songStatus === "unliked") {
          setUserLike(false);
        } else if (songStatus === "liked") {
          setUserLike(true);
        }
      } else {
        console.log("No payload received", response);
      }
    } catch (error) {
      console.log("Error liking song", error);
    }
  };
  console.log(userLike)


  return (
    <div className='w-full h-full'>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 animate-pulse">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />
            <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">♪</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-10 pb-18 w-[100%] mx-auto px-12 py-10'
          style={{ transition: '0.5s ease', backgroundImage: `linear-gradient(to bottom, ${bgColor} 0%, transparent 100%)` }}>
          {/* Music details left side */}
          {/* <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-10 border-b border-gray-500 pb-18 w-[95%] mx-auto  '> */}
          <div className='flex flex-col gap-2 items-center'>
            <div className='w-56 h-56 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-2xl overflow-hidden'>
              <img
                ref={imgRef}
                src={`${fileBaseURL}${songData.imageUrl}`}
                alt="Poster"
                crossOrigin="anonymous"
                style={{ display: 'none' }}
              />
              <img src={`${fileBaseURL}${songData.imageUrl}`} alt="" className="w-full h-full object-cover" />
            </div>
            <h3 className='text-lg sm:text-2xl font-bold text-center text-white'>{`By: ${artistName}`}</h3>
          </div>
          {/* Music details right side */}
          <div className='flex flex-col w-full max-w-xl lg:items-start items-center justify-start gap-2'>
            <div className='flex items-center justify-between w-full'>
              <h3 className='text-xl sm:text-3xl font-bold text-white'>{songData.title}</h3>
            </div>
            <p className='text-sm sm:text-lg text-white w-full sm:w-[90%] lg:w-[600px] text-left'>{songData.description}</p>
            <div className='flex flex-row gap-2  bg-gray-200 rounded-full border-3 border-gray-100 shadow-2xl justify-center w-full sm:w-auto items-center relative'>
              {/* Audio element */}
              <audio
                ref={audioRef}
                className='p-2'
                src={`${fileBaseURL}${songData.audioUrl}`}
                controls
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => {
                  setIsPlaying(false);
                  stopTracking();
                }}
                // style={{ display: 'none' }}
                controlsList="nodownload noplaybackrate"
                onContextMenu={(e) => e.preventDefault()}
              />

            </div>
            {/* Like and share section */}
            <div className='flex flex-row gap-3 items-center'>
              <div className='flex flex-row p-3 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer w-fit'
                onClick={handleSongLike}>
                {userLike ?
                  <BsHeartFill className='text-xl cursor-pointer text-red-600' />
                  :
                  <BsHeart className='text-xl cursor-pointer' />
                }
              </div>
              <div className='flex flex-row p-3 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer w-fit'>
                <BsThreeDotsVertical className='text-xl cursor-pointer' />
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      )
      }
      <div className='h-[1px] w-[95%] bg-gray-200 mx-auto'></div>
      {/* Product */}
      <div className='mt-6 flex flex-col gap-4'>
        <div className='flex flex-col gap-6'>
          <Products artistId={artistId} />
        </div>
      </div>
      {/* You may like section */}
      <div className='pt-10 sm:pt-14 flex flex-col gap-4'>
        <h2 className='text-xl sm:text-2xl font-semibold font-sans ml-4 sm:ml-10 text-white'>{`Another Songs Of ${artistName}`}</h2>
        <div className='flex flex-col gap-6 mb-28'>
          <YouMayLike artistId={artistId} />
        </div>
      </div>
    </div >
  )
}
