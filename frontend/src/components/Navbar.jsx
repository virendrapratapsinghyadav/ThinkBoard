import React from 'react'
import { BadgePlus } from 'lucide-react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div className='flex justify-between mx-5 p-3 items-center'>
      <div>
        <h1 className='cursor-pointer text-3xl text-green-500 font-bold tracking-tight'>ThinkBoard</h1>
      </div>
      <div className='flex gap-1 rounded-2xl px-2 p-1 bg-green-600 text-white'>
        <div><BadgePlus/></div>
        <div><Link to= "/create"><button className='cursor-pointer font-semibold'>New Note</button></Link></div>
      </div>
    </div>
  )
}

export default Navbar
