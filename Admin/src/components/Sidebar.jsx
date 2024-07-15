import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div>
        <div className='border border-gray-950 h-full border-t-0 border-l-0 border-b-0 flex flex-col py-16 items-end gap-y-5'>
            <NavLink to='/add' className='flex pr-[92px] gap-6 border border-gray-400 py-3 items-center border-r-0 px-3 focus:border-[tomato] focus:bg-[#fff0ed]'>
                <img src={assets.add_icon} className='w-8' />
                <p className='text-xl'>Add Item</p>
            </NavLink>
            <NavLink to='/list' className='flex pr-24 gap-6 border border-gray-400 py-3 items-center border-r-0 px-3 focus:border-[tomato] focus:bg-[#fff0ed]'>
                <img src={assets.order_icon} className='w-8' />
                <p className='text-xl'>List Item</p>
            </NavLink>
            <NavLink to='/order' className='flex pr-16 gap-6 border border-gray-400 py-3 items-center border-r-0 px-3 focus:border-[tomato] focus:bg-[#fff0ed]'>
                <img src={assets.order_icon} className='w-8' />
                <p className='text-xl'>Order Items</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar