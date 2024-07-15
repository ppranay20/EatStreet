import React, { useContext, useRef } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-scroll'
import { Route, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import '../App.css'

const Navbar = ({setShowLogin}) => {
  const {isLoggedIn,setIsLoggedIn} = useContext(StoreContext);
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <div className='flex justify-between items-center px-10 py-7 w-[1500px] m-auto' id='home'>
        <img src={assets.mainlogo} alt="" onClick={()=>navigate("/")} className='cursor-pointer w-[60px]' />
        <div>
            <ul className='flex gap-8 text-[20px]'>
                <li className='hover:underline py-2 cursor-pointer' onClick={()=>navigate("/")}>Home</li>
                <Link to='menu' duration={500} smooth={true} className='hover:underline py-2 cursor-pointer'>Menu</Link>
                <Link to='about' duration={1500} smooth={true} className='hover:underline py-2 cursor-pointer'>Contact Us</Link>
            </ul>
        </div>
        <div className='flex gap-10 mr-10'>
            <img src={assets.basket_icon} alt="" onClick={()=>navigate("/cart")} className='cursor-pointer relative' />
            {
              !isLoggedIn 
              ? 
                <button className='border border-gray-600 text-xl rounded-3xl px-3 py-2' onClick={() => setShowLogin(true)}>Sign In</button>
              : 
                <div className='nav-profile'>
                  <img src={assets.profile_icon} />
                  <ul className='nav-profile-hover'>
                    <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} className='w-[20px]' /><p className='text-md hover:text-[tomato]'>Orders</p></li>
                    <hr />
                    <li onClick={Logout}><img src={assets.bag_icon} className='w-[20px]' /><p className='text-md hover:text-[tomato]'>Logout</p></li>
                  </ul>
                </div>
            }
        </div>
    </div>
  )
}

export default Navbar