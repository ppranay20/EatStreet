import React from 'react'
import "../App.css"
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-scroll'

const Header = () => {
  return (
    <div className='w-[1480px] m-auto relative px-3 py-2'>
        <img src={assets.header_img} alt="" />
        <div className='header-contents absolute bottom-20 max-w-[50%] flex flex-col items-start gap-4 left-12 px-4 mr-56'>
            <h2 className='text-white text-[3.5vw] font-bold'>Order Your<br></br> Favourite Food Here</h2>
            <p className='text-xl text-white'>Choose from a diverse menu featuring a delectable array of dishes crafted with finest ingredients and culinary expertise.Our mission is to satisfy your cravings and elevate your dinig experience, one delicious meal at a time.</p>
            <Link to='foodDisplay' spy={true} smooth={true} duration={500} className='bg-white rounded-[50px] px-2 py-4 text-xl w-[150px] text-center cursor-pointer mt-2'>View Menu</Link>
        </div>
    </div>
  )
}

export default Header