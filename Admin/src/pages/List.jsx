import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const List = () => {
  const [list,setList] = useState([]);
  
  const fetchData = async () => {
    try{
      const res = await axios.get('http://localhost:3000/api/food/list')
      if(res.data.success){
        setList(res.data.food);
      }
      else{
        toast.error("Fail")
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  const removeFood = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:3000/api/food/remove/${id}`);
      if(res.data.success === "true"){
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchData();
  },[removeFood])
  
  return (
    <div className='mx-24 my-14 w-[1050px]'>
      <h2 className='text-xl text-[#a9a9a9] pb-5'>All Food List</h2>
      <div className='flex justify-between border-2 border-[#a9a9a9] py-2 px-2 text-lg text-gray-500'>
        <p>Image</p>
        <p className='ml-12'>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      <div>
        {
          list.map((item,index) => {
            return(
              <div key={index} className='w-full flex justify-between items-center border border-[#a9a9a9] py-2 px-2 text-lg'>
                <img src={`http://localhost:3000/images/` + item.image} className='w-20 h-[45px]' />
                <p className='w-32 text-center'>{item.name}</p> 
                <p className='w-40'>{item.category}</p>
                <p className='relative right-16'>{item.price}</p>
                <p className='text-2xl relative right-5 cursor-pointer' onClick={()=>removeFood(item._id)}>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List