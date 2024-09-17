import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const {cartItems,removeFromCart,addToCart,getTotalAmount,foodList,isValidPromocode,setIsValidPromocode} = useContext(StoreContext);
  const navigate = useNavigate();
  const [promocode,setPromocode] = useState("");
  
  const promocodeHandler = () => {
    if(promocode === "EATSTREET" || promocode === "DELICIOUS" || promocode === "TASTY"){
      toast.success("Promocode Applied",{
        position : 'top-center'
      })
      setIsValidPromocode(true);
    }
  }

  const totalBill = (getTotalAmount() + (getTotalAmount() > 0 ? 2 : 0) - (isValidPromocode ? 1 : 0));
  const cartTotal = totalBill >= 0 ? `$${totalBill}` : `-$1`

  return (
    <div className='max-w-[1100px] m-auto pt-16'>
      <div className='flex justify-between text-gray-500 text-[15px] pb-6 px-2'>
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className='py-1' />
      <div>
        {
          foodList.map((item,index) => {
            if(cartItems[item._id] > 0){
              return (
                <div key={index}>
                  <div className='grid grid-cols-6 gap-40 text-center py-3 font-semibold text-[16px]'>
                    <img src={`http://localhost:3000/images/${item.image}`} className='w-14' />
                    <p className='relative right-12 top-1 w-40'>{item.name}</p>
                    <p className='relative right-7 top-1'>${item.price}</p>
                    <p className='relative top-1'>{cartItems[item._id]}</p>
                    <p className='mt-1'>${item.price*cartItems[item._id]}</p>
                    <p className='cursor-pointer text-xl' onClick={()=>removeFromCart(item._id)}>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className='w-full flex justify-between'>
        <div className='w-[25%] mb-32 mt-24'>
          <h1 className='font-bold text-xl pb-6'>Cart Totals</h1>
          <div className='flex justify-between text-sm text-gray-500 py-1'>
            <p>Sub Total</p>
            <p>${getTotalAmount()}</p>
          </div>
          <hr className='py-2' />
          <div className='flex justify-between text-sm text-gray-500 py-1'>
            <p>Delievery Fee</p>
            <p>${getTotalAmount() > 0 ? 2 : 0}</p>
          </div>
          <hr className='py-2' />
          {
            isValidPromocode ? 
            <div>
                <div className='flex justify-between text-sm text-gray-500 py-1'>
                  <p>Discount</p>
                  <p>-$1</p>
              </div>
              <hr className='py-2' />
            </div> : <div></div>
          }
          <div className='flex justify-between text-sm  font-bold py-1'>
            <p>Total</p>
            <p>{cartTotal}</p>
          </div>
          <hr className='py-2' />
          <button className='bg-[tomato] text-white py-3 px-2 mt-4 rounded-md text-sm cursor-pointer' onClick={()=>navigate("/order")}>Proceed To Checkout</button>
        </div>
        <div className='my-24'>
          <p className='text-gray-500 py-4 px-1 text-sm'>If you have any promocode, Enter it here</p>
          <div className='py-1'>
            <input type="text" onChange={(e) => setPromocode(e.target.value)} placeholder='promocode' className='bg-gray-200 text-sm py-2 px-2 outline-none' size={35} />
            <button type='submit' onClick={promocodeHandler} className='bg-black text-white px-14 py-2 text-sm rounded-md'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart