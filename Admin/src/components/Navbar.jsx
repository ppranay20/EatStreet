import React from 'react'
import {assets} from '../assets/assets'
import mainlogo from '../assets/mainlogo.png'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-16'>
        <img src={mainlogo} className='w-24 h-20' />
        <h2 className='text-2xl font-semibold'>ADMIN PANEL</h2>
        <img src={assets.profile_image} className='w-18 py-5' />
    </div>
  )
}

export default Navbar