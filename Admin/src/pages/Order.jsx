import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import {assets} from '../assets/assets'

const Order = () => {
  const [data,setData] = useState([]);

  const statusHandler = async (e,orderId) =>{
    const res = await axios.post("http://localhost:3000/api/order/status",{
      orderId : orderId,
      status : e.target.value
    })

    if(res.data.success){
      fetchData();
    }
  }

  const fetchData =  async () => {
    try{
      const res = await axios.get("http://localhost:3000/api/order/list");
      if(res.data.success){
        setData(res.data.orders);
      }
    }catch(err){
      toast.error("Error");
      console.log(err)
    }
  }
  
  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className='mx-24 mt-16'>
      <h1 className='text-2xl text-[#717070] font-semibold py-2'>Order Page</h1>
      <div>
        {
          data.map((order,index) =>{
            return (
              <div key={index} className='border border-[tomato] flex w-[1100px] my-6 justify-between items-start py-5'>
                <img src={assets.parcel_icon} className='my-2 mx-3 w-[40]' />
                <div className='flex flex-col gap-10'>
                  <p className='font-semibold text-md w-[350px]'>
                    {
                      order.items.map((item,index) => {
                          if(order.items.length-1 === index){
                            return item.name + " x " + item.quantity
                          }
                          else{
                            return item.name + " x " + item.quantity + "," 
                          }
                      })
                    }
                  </p>
                  <div>
                    <h4 className='text-lg font-semibold text-[#717070] pb-4'>{order.address.fname + " " + order.address.lname}</h4>
                    <div className='pb-4'>
                      <p>{order.address.street + ","}<br></br>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                    </div>
                    <p>{order.address.phone}</p>
                  </div>
                </div>
                <p className='px-3'>Items : {order.items.length}</p>
                <p className='px-3'>${order.amount}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='px-2 border outline-none border-[tomato] mx-3 py-2 bg-[#ffe8e4]'>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Delievered">Delievered</option>
                  <option value="Out for delievery">Out for delievery</option>
                </select>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order