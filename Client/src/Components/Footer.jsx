import React from 'react'
import {assets} from '../assets/frontend_assets/assets'
import mainlogo from '../assets/frontend_assets/mainlogo.png'

const Footer = () => {
  return (<div className='bg-[#323232]' id='about'>
  <div className='w-full px-36 py-20 bg-[#323232] text-white flex items-center justify-between'>
      <div className='w-[540px] flex flex-col gap-9'>
        <img src={mainlogo} className='w-36' />
        <p className='text-lg text-gray-200'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex eveniet porro corrupti. Ducimus dolorem temporibus nobis modi ratione facere incidunt eligendi, aut omnis voluptatem illum!</p>
        <div className='flex gap-5 cursor-pointer'>
          <img src={assets.facebook_icon} />
          <img src={assets.twitter_icon} />
          <img src={assets.linkedin_icon} />
        </div>
      </div>
      <div className='flex flex-col gap-5 w-[350px] pb-16 mt-2 pl-16'>
        <h1 className='text-3xl font-bold'>COMPANY</h1>
        <ul className='flex flex-col gap-3 font-lg text-gray-300'>
          <li>Home</li>
          <li>About Us</li>
          <li>Delievery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className='flex flex-col gap-6 pb-28 pr-7'>
        <h1 className='text-3xl font-bold'>GET IN TOUCH</h1>
        <h5>+1-212-456-7890</h5>
        <h5>contact@tomato.com</h5>
      </div>
    </div>
    <hr className='p-6 w-[1450px] m-auto' />
    <p className='w-[550px] m-auto text-white text-lg py-2'>Copyright 2024 © Tomato.com - All Rights Reserved.</p>
  </div>
    
  )
}

export default Footer