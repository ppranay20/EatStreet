import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {assets} from '../assets/frontend_assets/assets'

const MyOrders = () => {
    const [data,setData] = useState([]);
    const token = localStorage.getItem("token")

    const fetchData =async (token) => {
        const res = await axios.post("http://localhost:3000/api/order/myorder",{},{
            headers : {
                Authorization : token
            }
        })

        if(res.data.success){
            setData(res.data.order)
        }
        else{
            alert(res.data.message);
        }
    }

    useEffect(()=>{
        if(token){
            fetchData(token)
        }
    },[token]);

  return (
    <div className='w-[1100px] m-auto'>
        <h1 className='text-3xl font-bold'>My Orders</h1>
        <div className='mb-20 mt-12'>
            {
                data.map((order,index) => {
                    return(
                        <div key={index} className='border border-black my-6 flex px-4 py-5 items-center justify-between text-md'>
                            <img src={assets.parcel_icon} />
                            <div className='w-48'>
                                <p>{order.items.map((item,index) => {
                                    if(index === order.items.length-1){
                                        return item.name + " x " + item.quantity;
                                    }else{
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}</p>
                            </div>
                            <div>
                                <p>${order.amount}.00</p>
                            </div>
                            <div>
                                <p>Items : {order.items.length}</p>
                            </div>
                            <div>
                                <p>{(order.status === "Food Processing") ?<span className='text-[tomato] text-xl px-1'>&#x25cf;</span>:<span className='text-[#75ff47] text-xl px-1'>&#x25cf;</span> }{order.status}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MyOrders