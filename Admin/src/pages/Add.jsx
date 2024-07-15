import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';


const Add = () => {
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name : "",
    description : "",
    price : "",
    category : "Salad" 
  })

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData(data =>({...data,[name] : value}));
  } 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("price",data.price);
    formData.append("description",data.description);
    formData.append("category",data.category);
    formData.append("image",image);
    console.log(formData)

    try{
      const res = await axios.post("http://localhost:3000/api/food/add",formData)
      console.log(res)
      if(res.data.success){
        setData({
          name : "",
          description : "",
          price : "",
          category : "Salad" 
        })
        setImage(false);
        toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='mx-20 mt-10 h-[100vh]'>
      <form className='flex flex-col gap-4'>
        <div className='w-36'>
          <p className='text-xl text-[#a9a9a9] py-3'>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-36 cursor-pointer ' />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' required hidden />
        </div>
        <div>
          <h2 className='text-xl text-[#a9a9a9] pb-2'>Product name</h2>
          <input type="text" value={data.name} onChange={onChangeHandler} className='outline-none border-2 rounded-sm text-lg py-2 px-2 bg-white mt-1' placeholder='Type here' size={35} name='name' />
        </div>
        <div>
          <p className='text-xl text-[#a9a9a9] py-3'>Product description</p>
          <textarea value={data.description} onChange={onChangeHandler} className='outline-none border-2 rounded-sm text-lg py-2 px-2 bg-white w-[400px] h-28' placeholder='Write content here' name='description'></textarea>
        </div>
        <div className='flex gap-20'>
          <div>
            <h4 className='text-xl text-[#a9a9a9]'>Product category</h4>
            <select onChange={onChangeHandler} name="category" className='outline-none border-2 rounded-sm text-lg py-2 px-2 bg-white mt-1'>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div>
            <h4  className='text-xl text-[#a9a9a9]'>Product Price</h4>
            <input value={data.price} onChange={onChangeHandler} type="number" placeholder='20$' className='outline-none border-2 rounded-sm text-lg py-2 px-2 bg-white mt-1' size={5} name='price' />
          </div>
        </div>
        <button type='buton' onClick={onSubmitHandler} className='bg-black text-white cursor-pointer max-w-[120px] border-none p-[10px] rounded-md mt-4'>Add</button>
      </form>
    </div>
  )
}

export default Add