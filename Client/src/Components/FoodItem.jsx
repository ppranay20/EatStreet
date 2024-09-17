import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { StoreContext } from '../context/StoreContext'

const FoodItem = ({food}) => {
    const {addToCart,removeFromCart,cartItems} = useContext(StoreContext);

  return (
    <div className='shadow-lg rounded-lg relative'>
        <img src={`http://localhost:3000/images/${food.image}`} className='rounded-t-lg' />
         {
            !cartItems[food._id]
                ? <img src={assets.add_icon_white} onClick={() => addToCart(food._id)} className='absolute top-36 right-2 cursor-pointer' />
                : <div className='absolute flex gap-[10px] p-[4px] items-center top-[155px] right-2 bg-white rounded-r-xl rounded-l-xl'>
                    <img src={assets.remove_icon_red} onClick={() => removeFromCart(food._id)} className='cursor-pointer' />
                    <p className='text-lg'>{cartItems[food._id]}</p>
                    <img src={assets.add_icon_green} onClick={() => addToCart(food._id)} className='cursor-pointer' />
                  </div>
        }
        <div className='px-2 py-3'>
            <div className='flex justify-between py-2 px-2'>
                <h2 className='font-bold text-md font-serif'>{food.name}</h2>
                <img src={assets.rating_starts} className='w-[30%]' />
            </div>
            <p className='py-1 px-1 text-sm'>{food.description}</p>
            <h3 className='text-orange-500 text-xl px-2 py-2 font-bold'>${food.price}</h3>
        </div>
    </div>
  )
}

export default FoodItem