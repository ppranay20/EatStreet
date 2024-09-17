import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({category}) => {
    const {foodList} = useContext(StoreContext);

  return (
    <div className='w-[1100px] m-auto px-2 pb-4' id='foodDisplay'>
        <h1 className='text-3xl font-bold py-2 pb-10 px-1'>Top Dishes Near You</h1>
        <div className='grid grid-cols-4 gap-x-3 gap-y-8 animate-fadeIn'>
            {
                foodList.map((food) => {
                    if(category === "ALL" || category === food.category){
                        return (
                            <FoodItem key={food._id} food={food}></FoodItem>
                        )
                    }
                })
            }
        </div>
    </div>
  )
}

export default FoodDisplay;