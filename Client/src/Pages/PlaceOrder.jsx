import React, { useContext,useEffect,useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const PlaceOrder = () => {
  const token = localStorage.getItem("token");
  const {getTotalAmount,foodList,cartItems,isValidPromocode} = useContext(StoreContext);
  const navigate = useNavigate();

  const [data,setData] = useState({
    fname : "",
    lname : "",
    email : "",
    street : "",
    city : "",
    state : "",
    zipcode : "",
    country : "",
    phone : "",
  })

  const onChangeHandler = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    setData({...data,[name] : value});
  }
  
  const submitHandler = async (e) =>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    let orderItems = [];

    foodList.map((item) =>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })

    const order_data = {
      items : orderItems,
      amount : getTotalAmount()+2,
      address : data,
      promocode : isValidPromocode
    }


    const res = await axios.post("http://localhost:3000/api/order/place",order_data,{headers : {
      Authorization : token
    }})

    if(res.data.success){
      const {sessionUrl} = res.data;
      window.location.replace(sessionUrl)
    }
    else{
      alert("Error");
    }
  }

  useEffect(()=>{
    if(!token){
      navigate('/cart');
      alert('Login First')
    }
    else if(getTotalAmount() === 0){
      navigate('/cart');
      alert('Add items to cart first');   
    }
  },[token])

  return (
    <div className='w-[1400px] m-auto'>
      <form onSubmit={submitHandler} className='flex justify-between mt-6 mb-44'>
        <div className='w-[36%] mb-20 mt-16'>
          <h1 className='font-bold text-3xl py-6'>Delievery Information</h1>
          <div className='flex gap-8'>
            <input type="text" onChange={onChangeHandler} name='fname' required placeholder='First Name' className='border border-gray-400 rounded-sm py-1 px-1 outline-none mb-5 text-xl' />
            <input type="text" onChange={onChangeHandler} name= 'lname' required placeholder='Last Name' className='border border-gray-400 rounded-sm py-1 px-1 outline-none mb-5 text-xl'/>
          </div>
          <div className='flex flex-col'>
            <input type="email" onChange={onChangeHandler} name='email' required placeholder='Email-address' className='border border-gray-400 rounded-sm py-1 px-1 outline-none mb-5 text-xl' />
            <input type="text" onChange={onChangeHandler} name='street' required placeholder='Street' className='border border-gray-400 rounded-sm py-1 px-1 outline-none mb-5 text-xl' />
          </div>
          <div className='flex gap-8'>
            <input type="text" onChange={onChangeHandler} name='city' required placeholder='City' className='border border-gray-400 rounded-sm py-1 px-1 outline-none mb-5 text-xl' />
            <input type="text" onChange={onChangeHandler} name='state' required placeholder='State' className='border border-gray-400 rounded-sm py-1 px-1 outline-none mb-5 text-xl' />
          </div>
          <div className='flex gap-8'>
            <input type="text" onChange={onChangeHandler} name='zipcode' required placeholder='Zip Code' className='border border-gray-400 rounded-sm py-1 px-1 outline-none mb-5 text-xl' />
            <input type="text" onChange={onChangeHandler} name='country' required placeholder='Country' className='border border-gray-400 rounded-sm py-1 px-1 outline-none mb-5 text-xl' />
          </div>
          <div className='flex flex-col'>
            <input type="number" onChange={onChangeHandler} name='phone' required placeholder='Phone' className='border border-gray-400 rounded-sm py-1 px-1 outline-none mb-5 text-xl' />
          </div>  
        </div>
        <div className='w-[35%] mr-28 mb-3'>
          <div className='mb-32 mt-24'>
            <h1 className='font-bold text-3xl pb-6'>Cart Totals</h1>
            <div className='flex justify-between text-lg text-gray-500 py-1'>
              <p>Sub Total</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr className='py-2' />
            <div className='flex justify-between text-lg text-gray-500 py-1'>
              <p>Delievery Fee</p>
              <p>${getTotalAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr className='py-2' />
            {
              isValidPromocode ? <div>
                <div className='flex justify-between text-lg text-gray-500 py-1'>
                  <p>Discount</p>
                  <p>-$1</p>
                </div>
                <hr className='py-2' />
              </div> : <div></div>
            }
            <div className='flex justify-between text-lg font-bold py-1'>
              <p>Total</p>
              <p>${getTotalAmount() + (getTotalAmount() > 0 ? 2 : 0) - (isValidPromocode ? 1 : 0)}</p>
            </div>
            <hr className='py-2' />
            <button type='submit' className='bg-[tomato] text-white py-4 px-3 mt-4 rounded-md text-lg cursor-pointer'>Proceed To Payment</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder