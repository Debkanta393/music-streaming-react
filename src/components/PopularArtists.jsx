import React from 'react'
import artist from "../artist.json"

export default function PopularArtists() {

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
            <div className="relative">
                <button
                    className="hidden group-hover:flex justify-center items-center absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg-black/50  hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer"
                    onClick={() => scrollRow('artist-first-row-scroll', 'left')}
                    aria-label="Scroll Left - Row 1"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <div
                    id="artist-first-row-scroll"
                    className="flex flex-row gap-6 sm:gap-10 overflow-x-auto scroll-smooth no-scrollbar px-2 sm:px-10 w-full sm:w-[95%] mx-auto cursor-pointer"
                    style={{
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: "none"
                    }}
                >
                    {artist.map(artist =>
                        <div key={artist.id} className='flex justify-center items-center h-40 w-40 sm:h-48 sm:w-48 flex-shrink-0 relative group' style={{ scrollSnapAlign: 'start' }}>
                            <img src={artist.image.replace("../public/", "/")} alt="" className='w-full h-full object-center rounded-full hover:scale-105 transition-all duration-300' />
                        </div>
                    )}
                </div>
                <button
                    className="hidden group-hover:flex justify-center items-center absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:bg-black/50  hover:text-white rounded-full p-2 disabled:opacity-30 cursor-pointer"
                    onClick={() => scrollRow('artist-first-row-scroll', 'right')}
                    aria-label="Scroll Right - Row 1"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                </button>
            </div>
        </div>
    )
}
