import React from 'react'
import { menu_list } from '../assets/frontend_assets/assets'

const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='w-[1100px] m-auto py-2 px-2' id='menu'>
        <h1 className='text-2xl font-bold py-2'>Explore Menu</h1>
        <p className='text-lg py-7 font-semibold'>Choose from a diverse menu featuring a deletable array of dishes.Our mission is the satisfy your<br></br> cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className='flex items-center gap-7'>
          {
            menu_list.map((menu,index) => {
              return(
                <div key={index} onClick={() =>{setCategory(prev => prev === menu.menu_name ? "ALL" : menu.menu_name)}}>
                  <img src={menu.menu_image} className=  {`${category === menu.menu_name ? "border-[4px] p-[2px] border-solid border-[tomato]" : ""} w-28 cursor-pointer rounded-[50%]`} />
                  <h4 className='text-center py-2 text-lg font-semibold text-gray-600'>{menu.menu_name}</h4>
                </div>
              )
            })
          }
        </div>
        <hr className='my-10 font-bold bg-[#e2e2e2]'/>
    </div>
  )
}

export default ExploreMenu