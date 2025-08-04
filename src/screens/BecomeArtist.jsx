import React, { useState, useRef, useEffect } from "react";
import { FaLock, FaGlobe, FaChartLine, FaMoneyBillWave, FaUserEdit, FaMusic, FaRocket, FaImage, FaClock, FaUsers, FaTools, FaUpload, FaPlay, FaPause, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { MdCloudUpload, MdMusicNote, MdPerson, MdDescription } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import { UPLOAD_SONG } from '../apis/apis';
import { useDispatch } from "react-redux";
import { uploadSong } from "../create-slice/song-slice";


const dummyHero = "/public/Singer/singer1.webp";
const dummyFeature1 = "/public/Songs/songs1.jpg";
const dummyFeature2 = "/public/Songs/songs2.png";
const dummyFeature3 = "/public/Songs/songs3.jpg";
const dummyAvatar1 = "/public/Singer/singer2.jpg";
const dummyAvatar2 = "/public/Singer/singer3.jpg";

export default function BecomeArtist() {
    const [uploadedSongs, setUploadedSongs] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [songForm, setSongForm] = useState({
        title: '',
        artist: '',
        duration: null,
        genre: '',
        description: '',
        audioFile: null,
        coverImage: null
    });

    const fileInputRef = useRef(null);
    const audioRef = useRef(null);
    const dispatch = useDispatch()

    // Handle drag and drop
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (file) => {
        if (file.type.startsWith('audio/')) {
            setSongForm(prev => ({
                ...prev,
                audioFile: file
            }));
            toast.success('Audio file selected successfully!');
        } else {
            toast.error('Please select a valid audio file');
        }
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSongForm(prev => ({
                ...prev,
                coverImage: file
            }));
            toast.success('Cover image selected!');
        }
    };

    const handleUpload = async () => {
        if (!songForm.title || !songForm.artist || !songForm.audioFile) {
            toast.error('Please fill in all required fields and select an audio file');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('title', songForm.title);
        formData.append('artist', songForm.artist);
        formData.append('duration', songForm.duration);
        formData.append('genre', songForm.genre);
        formData.append('description', songForm.description);
        formData.append('audio', songForm.audioFile);
        if (songForm.coverImage) {
            formData.append('image', songForm.coverImage);
        }

        console.log(songForm)
        try {
            // const response = await axios.post(`http://localhost:5000/api/${UPLOAD_SONG}`, formData, {
            //     withCredentials: true,
            //     onUploadProgress: (progressEvent) => {
            //         const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //         setUploadProgress(progress);
            //     }
            // });


            // const response = await dispatch(uploadSong(songForm))
            // console.log(response)

            // toast.success('Song uploaded successfully!');
            // setUploadedSongs(prev => [...prev, response?.data?.song]);
            // setSongForm({
            //     title: '',
            //     artist: '',
            //     duration: '',
            //     genre: '',
            //     description: '',
            //     audioFile: null,
            //     coverImage: null
            // });
            setUploadProgress(0);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const playSong = (song) => {
        if (currentSong && currentSong._id === song._id) {
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play();
                setIsPlaying(true);
            }
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
            setTimeout(() => {
                audioRef.current?.play();
            }, 100);
        }
    };

    const deleteSong = async (songId) => {
        try {
            await axios.delete(`http://localhost:5000/api/song/deleteSong/${songId}`, {
                withCredentials: true
            });
            setUploadedSongs(prev => prev.filter(song => song._id !== songId));
            toast.success('Song deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete song');
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#1a1a2e] via-[#232526] to-[#0f2027] text-white font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-[#00f2fe]/40 to-[#4facfe]/10 rounded-full blur-3xl z-0" />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#4facfe]/30 to-[#00f2fe]/0 rounded-full blur-2xl z-0" />

            {/* Audio Player */}
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

            {/* Hero Section */}
            <section className="relative z-10 py-20 px-4 md:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg leading-tight">
                        <span role="img" aria-label="mic">🎤</span> Share Your Music with the World
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                        Upload your tracks, build your audience, and connect with music lovers worldwide.
                        Your journey to stardom starts here.
                    </p>
                </div>
            </section>

            {/* Upload Section */}
            <section className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
                <div className="bg-[#232526]/80 rounded-3xl p-8 shadow-2xl border border-white/10">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gradient-primary">
                        Upload Your Music
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Upload Area */}
                        <div className="space-y-6">
                            {/* Drag & Drop Area */}
                            <div
                                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${dragActive
                                    ? 'border-[#00f2fe] bg-[#00f2fe]/10'
                                    : 'border-white/30 hover:border-[#00f2fe]/50'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <MdCloudUpload className="text-6xl mx-auto mb-4 text-[#00f2fe]" />
                                <h3 className="text-xl font-semibold mb-2">Drop your audio file here</h3>
                                <p className="text-white/60 mb-4">or click to browse</p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="btn-primary"
                                >
                                    Choose Audio File
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => handleFileSelect(e.target.files[0])}
                                    className="hidden"
                                />
                            </div>

                            {/* Cover Image Upload */}
                            <div className="space-y-4">
                                <label className="block text-lg font-semibold">Cover Image (Optional)</label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        className="hidden"
                                        id="cover-image"
                                    />
                                    <label
                                        htmlFor="cover-image"
                                        className="btn-secondary cursor-pointer"
                                    >
                                        <FaImage className="mr-2" />
                                        Choose Cover Image
                                    </label>
                                    {songForm.coverImage && (
                                        <span className="text-green-400 text-sm">
                                            ✓ {songForm.coverImage.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Song Details Form */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-lg font-semibold mb-2">Song Title *</label>
                                    <input
                                        type="text"
                                        value={songForm.title}
                                        onChange={(e) => setSongForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00f2fe]"
                                        placeholder="Enter song title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-semibold mb-2">Artist Name *</label>
                                    <input
                                        type="text"
                                        value={songForm.artist}
                                        onChange={(e) => setSongForm(prev => ({ ...prev, artist: e.target.value }))}
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00f2fe]"
                                        placeholder="Enter artist name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-semibold mb-2">Duration *</label>
                                    <input
                                        type="number"
                                        value={songForm.duration}
                                        onChange={(e) => setSongForm(prev => ({ ...prev, duration: e.target.value }))}
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00f2fe]"
                                        placeholder="Enter duration of the song"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-semibold mb-2 text-white">Genre</label>
                                    <select
                                        value={songForm.genreOption || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === "Other") {
                                                setSongForm(prev => ({ ...prev, genreOption: value, genre: "" }));
                                            } else {
                                                setSongForm(prev => ({ ...prev, genreOption: value, genre: value }));
                                            }
                                        }}
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#00f2fe]"
                                    >
                                        <option value="" className="bg-black/50 text-white">Select Genre</option>
                                        <option value="Pop" className="bg-black/50 text-white">Pop</option>
                                        <option value="Rock" className="bg-black/50 text-white">Rock</option>
                                        <option value="Hip-Hop" className="bg-black/50 text-white">Hip-Hop</option>
                                        <option value="Electronic" className="bg-black/50 text-white">Electronic</option>
                                        <option value="Jazz" className="bg-black/50 text-white">Jazz</option>
                                        <option value="Classical" className="bg-black/50 text-white">Classical</option>
                                        <option value="Country" className="bg-black/50 text-white">Country</option>
                                        <option value="R&B" className="bg-black/50 text-white">R&B</option>
                                        <option value="Indie" className="bg-black/50 text-white">Indie</option>
                                        <option value="Other" className="bg-black/50 text-white">Other</option>
                                    </select>

                                    {songForm.genreOption === "Other" && (
                                        <input
                                            type="text"
                                            className="w-full p-3 mt-5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00f2fe]"
                                            value={songForm.genre}
                                            placeholder="Enter custom genre"
                                            onChange={(e) =>
                                                setSongForm(prev => ({ ...prev, genre: e.target.value }))
                                            }
                                        />
                                    )}
                                </div>


                                <div>
                                    <label className="block text-lg font-semibold mb-2">Description</label>
                                    <textarea
                                        value={songForm.description}
                                        onChange={(e) => setSongForm(prev => ({ ...prev, description: e.target.value }))}
                                        rows="4"
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00f2fe] resize-none"
                                        placeholder="Tell us about your song..."
                                    />
                                </div>
                            </div>

                            {/* Upload Progress */}
                            {isUploading && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Uploading...</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleUpload}
                                disabled={isUploading || !songForm.title || !songForm.artist || !songForm.audioFile}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                                        Uploading...
                                    </div>
                                ) : (
                                    <>
                                        <FaUpload className="mr-2" />
                                        Upload Song
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Uploaded Songs */}
            {/* {uploadedSongs.length > 0 && (
                <section className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gradient-primary">
                        Your Uploaded Songs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {uploadedSongs.map((song, index) => (
                            <div key={index} className="bg-[#232526]/80 rounded-2xl p-6 shadow-lg border border-white/10 hover:border-[#00f2fe]/30 transition-all duration-300">
                                <div className="relative mb-4">
                                    <img 
                                        src={song.coverImage || dummyFeature1} 
                                        alt={song.title}
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                    <button 
                                        onClick={() => playSong(song)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"
                                    >
                                        {currentSong?._id === song._id && isPlaying ? (
                                            <FaPause className="text-3xl text-white" />
                                        ) : (
                                            <FaPlay className="text-3xl text-white" />
                                        )}
                                    </button>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg truncate">{song.title}</h3>
                                    <p className="text-white/70 text-sm">{song.artist}</p>
                                    {song.genre && (
                                        <span className="inline-block px-2 py-1 bg-[#00f2fe]/20 text-[#00f2fe] text-xs rounded-full">
                                            {song.genre}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex justify-between items-center mt-4">
                                    <button 
                                        onClick={() => deleteSong(song._id)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                    <span className="text-white/50 text-sm">
                                        {new Date(song.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )} */}

            {/* Features Section */}
            <section className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary">
                    Why Choose Our Platform?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full flex items-center justify-center mx-auto">
                            <FaLock className="text-2xl text-black" />
                        </div>
                        <h3 className="font-semibold text-lg">Secure Uploads</h3>
                        <p className="text-white/70 text-sm">Your music is protected with industry-standard security</p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full flex items-center justify-center mx-auto">
                            <FaGlobe className="text-2xl text-black" />
                        </div>
                        <h3 className="font-semibold text-lg">Global Reach</h3>
                        <p className="text-white/70 text-sm">Connect with listeners worldwide instantly</p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full flex items-center justify-center mx-auto">
                            <FaChartLine className="text-2xl text-black" />
                        </div>
                        <h3 className="font-semibold text-lg">Analytics</h3>
                        <p className="text-white/70 text-sm">Track your music performance and growth</p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full flex items-center justify-center mx-auto">
                            <FaMoneyBillWave className="text-2xl text-black" />
                        </div>
                        <h3 className="font-semibold text-lg">Earnings</h3>
                        <p className="text-white/70 text-sm">Earn from your streams and downloads</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
