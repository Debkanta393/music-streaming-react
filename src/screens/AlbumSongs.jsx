import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAlbumSongs } from "../create-slice/album-slice";
import { FastAverageColor } from "fast-average-color";

export default function AlbumSongs() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fileBaseURL = import.meta.env.VITE_FILE_API_URI;
  const imgRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [album, setAlbum] = useState({});
  const [currentPreview, setCurrentPreview] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  const cacheKey = useMemo(() => `album_songs_${id}`, [id]);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchAlbumSongs = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         // Try cache first (sessionStorage for per-session freshness)
//         const cached = sessionStorage.getItem(cacheKey);
//         console.log("cached", cached)
//         if (cached) {
//           const parsed = JSON.parse(cached);
//           if (isMounted) {
//             setAlbum(parsed);
//             setIsLoading(false);
//           }
//           return;
//         }

//         const response = await dispatch(getAlbumSongs(id));
//         console.log(response)
//         const payload = response?.payload;

//         const albumDoc = payload?.album;
//         if (!albumDoc || !albumDoc.albums) {
//           throw new Error(payload?.message || "Album not found");
//         }

//         if (isMounted) {
//           setAlbum(albumDoc);
//           setIsLoading(false);
//         }
//         // Cache
//         sessionStorage.setItem(cacheKey, JSON.stringify(albumDoc));
//       } catch (err) {
//         if (isMounted) {
//           setError(err?.message || "Failed to load album");
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchAlbumSongs();
//     return () => {
//       isMounted = false;
//     };
//   }, [dispatch, id, cacheKey]);

  const handlePreview = (audioPath) => {
    if (!audioPath) return;
    setCurrentPreview((prev) => (prev === audioPath ? null : audioPath));
  };

  


  // Get all songs from album
  useEffect(()=>{
    const handleAllSongs=async()=>{
        const response=await dispatch(getAlbumSongs(id))
        if(response.payload){
            setAlbum(response.payload.album)
            setIsLoading(false)
        }
        console.log(response)
    }
    handleAllSongs()
  }, [])

  const songs = album?.albums || [];


  // Set background color from album
  useEffect(() => {
    const fac = new FastAverageColor();
    const img = imgRef.current;

    if (img) {
      fac
        .getColorAsync(img, { mode: "speed" })
        .then((color) => {
          const rgb = color.rgb;
          setBgColor(rgb);

          // Determine brightness for text contrast
          const brightness = chroma(rgb).luminance();
          setTextColor(brightness > 0.5 ? "#000000" : "#ffffff");
        })
        .catch((e) => {
          console.error("Color extraction error:", e);
        });
    }
  }, [album.albumImage]);
  console.log(album)
  console.log(album.artist?.name)


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="max-w-full mx-auto">
        {/* Hero section */}
        <div className="w-full flex flex-row gap-10 items-center p-20" style={{ transition: '0.5s ease', backgroundImage: `linear-gradient(to bottom, ${bgColor} 0%, transparent 100%)` }}>
          <div className="w-56 h-56 rounded">
            <img
              ref={imgRef}
              src={`${fileBaseURL}/${String(album?.albumImage).replace(/\\/g, "/")}`}
              alt="Poster"
              crossOrigin="anonymous"
              style={{ display: "none" }}
            />
            <img src={`${fileBaseURL}/${String(album?.albumImage).replace(/\\/g, "/")}`} alt="" className="w-full h-full rounded" />
          </div>
          <div className="flex flex-col gap-6 text-2xl">
            <h2 className="text-2xl md:text-6xl font-extrabold">{album?.albumName}</h2>
            <p className="text-2xl font-bold">By <span className=" text-gradient-primary">{album.artist?.name}</span></p>
          </div>
        </div>
        <div className="px-20">
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="card-glass rounded-xl p-4 flex items-center gap-4 animate-pulse"
              >
                <div className="w-16 h-16 rounded-lg bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-1/3" />
                  <div className="h-3 bg-white/10 rounded w-1/4" />
                </div>
                <div className="w-24 h-8 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="card-glass rounded-xl p-6 text-red-300 font-semibold">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <div className="space-y-4">
            {songs.length === 0 && (
              <div className="card-glass rounded-xl p-6 text-white/80">
                No songs in this album yet.
              </div>
            )}

            {songs.map((song, index) => {
              const imageSrc = song?.image
                ? `${fileBaseURL}/${String(song.image).replace(/\\/g, "/")}`
                : null;
              const audioSrc = song?.audio
                ? `${fileBaseURL}/${String(song.audio).replace(/\\/g, "/")}`
                : null;
              const isPlaying = currentPreview === song?.audio;
              return (
                <div
                  key={index}
                  className="card-glass rounded-xl p-4 flex items-center gap-4 hover-lift"
                >
                  <img
                    src={imageSrc}
                    alt={song?.title || "Song"}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold truncate text-gradient-secondary">
                      {song?.title || "Untitled"}
                    </p>
                    <p className="text-white/70 text-sm truncate">
                      {song?.genre || "Unknown"} •{" "}
                      {Math.round(Number(song?.duration || 0))}s
                    </p>
                  </div>
                  <button
                    className="btn-primary px-4 py-2 rounded-full text-sm font-semibold"
                    onClick={() => handlePreview(song?.audio)}
                    disabled={!audioSrc}
                  >
                    {isPlaying ? "Pause" : "Preview"}
                  </button>
                  {isPlaying && audioSrc && (
                    <audio
                      autoPlay
                      controls
                      className="hidden"
                      src={audioSrc}
                      onEnded={() => setCurrentPreview(null)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
