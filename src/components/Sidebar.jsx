import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaUser, FaMusic, FaCompactDisc, FaListUl, FaThLarge, FaHome } from 'react-icons/fa'

export default function Sidebar() {
  const location = useLocation();
  const menu = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Artists', path: '/artists', icon: <FaUser /> },
    { name: 'Generas', path: '/generas', icon: <FaThLarge /> },
    { name: 'Albums', path: '/albums', icon: <FaCompactDisc /> },
    { name: 'Songs', path: '/songs', icon: <FaMusic /> },
    { name: 'Playlists', path: '/playlist', icon: <FaListUl /> },
  ];
  return (
    <aside className="hidden h-full w-3/12 xl:w-[15%] bg-gradient-to-br from-[#181818]/90 via-[#232526]/90 to-[#0f2027]/90 text-white p-0 lg:flex flex-col items-center border-r border-white/10 shadow-2xl relative">
      {/* Logo */}
      <div className="flex flex-col items-center w-full py-8 bg-white/5 border-b border-white/10">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-2 rounded-full shadow-lg" />
        <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent tracking-wide">Musicify</span>
      </div>
      {/* Menu */}
      <div className="flex flex-col gap-4 w-full h-full px-8 py-8">
        <p className="text-[16px] font-semibold text-white/60 font-sans mb-2 tracking-wider">Browse</p>
        <ul className="flex flex-col gap-2">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition-all duration-200
                  ${location.pathname === item.path
                    ? 'bg-gradient-to-r from-[#00f2fe]/30 to-[#4facfe]/30 text-[#00f2fe] shadow-lg scale-105'
                    : 'text-white/80 hover:bg-white/10 hover:text-[#00f2fe]'}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col gap-2 text-xs text-white/40">
          <span>© 2024 Musicify</span>
          <span>All rights reserved.</span>
        </div>
      </div>
      {/* Decorative blurred circle */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00f2fe]/20 rounded-full blur-2xl -z-10 animate-pulse" />
    </aside>
  )
}
