import React from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className='flex flex-col h-screen'>
        <Header />
        <div className='flex flex-row flex-1 overflow-hidden'>
            <Sidebar />
            <div className='flex-1 overflow-auto bg-[#000]/90'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}
