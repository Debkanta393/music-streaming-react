import React, { useState, useRef, useEffect } from 'react'
import { BsHeart, BsHeartFill } from "react-icons/bs";
import YouMayLike from '../components/YouMayLike';
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiSpeakerNoneLight, PiSpeakerHighLight, PiSpeakerXLight } from "react-icons/pi";
import { TbPlayerPlayFilled, TbPlayerPauseFilled } from "react-icons/tb";
import Products from '../components/Products';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSongById } from '../create-slice/song-slice';
import { FastAverageColor } from 'fast-average-color';
import chroma from 'chroma-js';

export default function SongDetails() {

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
    setIsPlaying((prev) => !prev);
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
  
        if (!response.payload) throw new Error("Song not found");
  
        setArtistName(response.payload.artistName);
        setArtistId(response.payload.artistId)
        setSongData(response.payload.song);
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
                src={`http://localhost:5000${songData.imageUrl}`}
                alt="Poster"
                crossOrigin="anonymous"
                style={{ display: 'none' }}
              />
              <img src={`http://localhost:5000${songData.imageUrl}`} alt="" className="w-full h-full object-cover" />
            </div>
            <h3 className='text-lg sm:text-2xl font-bold text-center text-white'>{`By: ${artistName}`}</h3>
          </div>
          {/* Music details right side */}
          <div className='flex flex-col w-full max-w-xl lg:items-start items-center justify-start gap-2'>
            <div className='flex items-center justify-between w-full'>
              <h3 className='text-xl sm:text-3xl font-bold text-white'>{songData.title}</h3>
            </div>
            <p className='text-sm sm:text-lg text-white w-full sm:w-[90%] lg:w-[600px] text-left'>{songData.description}</p>
            <div className='flex flex-row gap-2 px-3 sm:px-4 py-2 bg-gray-200 rounded-full border-4 border-gray-100 shadow-2xl justify-center w-full sm:w-auto items-center relative'>
              {/* Audio element */}
              <audio
                ref={audioRef}
                src={`http://localhost:5000${songData.audioUrl}`}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                style={{ display: 'none' }}
                controls
                controlsList="nodownload noplaybackrate"
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className='flex flex-row items-center gap-2 flex-1 min-w-0'>
                {/* Play/Pause control */}
                {isPlaying ?
                  <TbPlayerPauseFilled className='text-2xl cursor-pointer' onClick={handlePlayPause} />
                  :
                  <TbPlayerPlayFilled className='text-2xl cursor-pointer' onClick={handlePlayPause} />
                }
                {/* Progress bar control*/}
                <input
                  type='range'
                  min={0}
                  max={duration}
                  value={progress}
                  step='0.1'
                  onChange={handleProgressChange}
                  className=' min-w-0'
                  style={{ accentColor: '#093FB4' }}
                />
                {/* Time duration */}
                <span className='text-xs text-right text-blue-600 text-md w-auto min-w-fit'>
                  {`${Math.floor(progress / 60)}:${('0' + Math.floor(progress % 60)).slice(-2)} / ${Math.floor(duration / 60)}:${('0' + Math.floor(duration % 60)).slice(-2)}`}
                </span>
              </div>
              {/* Volume bar control*/}
              {/* Value bar control in mobile */}
              <div ref={volumeRef} className="relative">
                <PiSpeakerHighLight
                  className="sm:hidden"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling to window
                    setIsMobileVolumeOpen(!isMobileVolumeOpen);
                  }}
                />

                {isMobileVolumeOpen && (
                  <div className="flex flex-row items-center gap-2 absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 px-3 sm:px-4 py-2 bg-gray-200 rounded-full border-4 border-gray-100 shadow-2xl">
                    {volume > 0.1 ? (
                      <PiSpeakerNoneLight
                        className="text-xl cursor-pointer"
                        onClick={() => volume > 0.1 && setVolume(volume - 0.1)}
                      />
                    ) : (
                      <PiSpeakerXLight className="text-xl cursor-pointer" />
                    )}

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleVolumeChange}
                      className=""
                      orientation="vertical"
                      style={{ accentColor: '#093FB4' }}
                    />

                    <PiSpeakerHighLight
                      className="text-xl cursor-pointer"
                      onClick={() => volume < 1 && setVolume(volume + 0.1)}
                    />
                  </div>
                )}
              </div>
              {/* Value bar control in desktop */}
              <div className='flex-row items-center gap-2 hidden sm:flex'>
                {
                  volume > 0.1 ?
                    <PiSpeakerNoneLight className='text-xl cursor-pointer' onClick={() => volume > 0.1 && setVolume(volume - 0.1)} />
                    :
                    <PiSpeakerXLight className='text-xl cursor-pointer' />
                }
                <input
                  type='range'
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className='w-16 sm:w-24'
                  style={{ accentColor: '#093FB4' }}
                />
                <PiSpeakerHighLight className='text-xl cursor-pointer' onClick={() => volume < 1 && setVolume(volume + 0.1)} />
              </div>
            </div>
            {/* Like and share section */}
            <div className='flex flex-row gap-3 items-center'>
              <div className='flex flex-row p-3 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer w-fit'
                onClick={() => setIsLiked(!isLiked)}>
                {isLiked ?
                  <BsHeartFill className='text-xl cursor-pointer' />
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
          <Products artistId={artistId}/>
        </div>
      </div>
      {/* You may like section */}
      <div className='pt-10 sm:pt-14 flex flex-col gap-4'>
        <h2 className='text-xl sm:text-2xl font-semibold font-sans ml-4 sm:ml-10 text-white'>{`Another Songs Of ${artistName}`}</h2>
        <div className='flex flex-col gap-6 mb-28'>
          <YouMayLike artistId={artistId}/>
        </div>
      </div>
    </div >
  )
}
