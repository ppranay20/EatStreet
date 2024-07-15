import React, { useState } from 'react'
import Header from '../Components/Header'
import ExploreMenu from '../Components/ExploreMenu'
import FoodDisplay from '../Components/FoodDisplay'

const Home = () => {
  const [category,setCategory] = useState("ALL")

  return (
    <div>
        <Header></Header>
        <ExploreMenu category={category} setCategory={setCategory} ></ExploreMenu>
        <FoodDisplay category={category}></FoodDisplay>
    </div>
  )
}

export default Home