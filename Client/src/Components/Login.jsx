import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';
import '../App.css'
import { StoreContext } from '../context/StoreContext';

const Login = ({setShowLogin}) => {
    const {setIsLoggedIn} = useContext(StoreContext);
    const [currState,setCurrState] = useState('Sign-up');
    const [data,setData] = useState({
        username : "",
        email : "",
        password : ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({...data,[name] : value});
    }

    const fetchForLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("https://eat-street-backend-gg2j.onrender.com/api/user/login",{
                email : data.email,
                password : data.password
            })
            
            if(res.data.success === "true"){
                toast.success(res.data.message);
                localStorage.setItem("token",res.data.token);
                setData({
                    email : "",
                    password : ""
                })

                setShowLogin(false)
                setIsLoggedIn(true);
            }
            else if(res.data.success === "false"){
                alert(res.data.message)
            }
        }catch(err){
            console.log(err);
        }
    }

    const fetchForSignup = async (e) =>{
        e.preventDefault();
        try{

            const res = await axios.post("https://eat-street-backend-gg2j.onrender.com/api/user/signup",{
                username : data.username,
                email : data.email,
                password : data.password    
            })


            if(res.data.success === "true"){
                toast.success(res.data.message);
                localStorage.setItem("token",res.data.token)
                setData({
                    username : "",
                    email : "",
                    password : ""
                })

                setShowLogin(false);
                setIsLoggedIn(true);
            }
            else{
                alert(res.data.message)
            }
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='z-20 absolute w-full h-full bg-[#00000090] flex justify-center items-center'>
        <form className='bg-white rounded-lg px-[25px] py-[30px] flex flex-col gap-4 animate-fadeInLogin' onSubmit={currState==='Login' ? fetchForLogin : fetchForSignup}>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-extrabold font-mono'>{currState}</h2>
                <img src={assets.cross_icon} onClick={() => {setShowLogin(false)}} className='cursor-pointer w-4' />
            </div>
            <div className='flex flex-col gap-6 py-4'>
                {
                    currState === "Sign-up" ?
                    <input onChange={onChangeHandler} name='username' className='border border-gray-400 py-2 text-[16px] px-1 rounded-md' type="text" placeholder='Enter your username' required /> :
                    <></>
                }
                <input type="email" onChange={onChangeHandler} name='email' placeholder='Enter your email' required className='border border-gray-400 py-2 text-[16px] px-1 rounded-md' />
                <input type="password" onChange={onChangeHandler} name='password' placeholder='Enter your password' required className='border border-gray-400 py-2 text-[16px] px-1 rounded-md' />
            </div>
            <button type='submit' className='text-white border bg-[tomato] font-sans py-3 rounded-lg font-semibold text-sm'>{currState === 'Sign-up' ? "Create Account" : "Login"}</button>
            <div className='flex gap-3 items-baseline py-2'>
                <input type="checkbox" size={10} required />
                <p className='text-sm text-gray-500 '>By continuing , I agree to the terms of use and the<br></br> privacy policy.</p>
            </div>
            {
                currState === "Sign-up" ?
                    <p className='text-gray-500 text-sm'>Already have an account? <span className='cursor-pointer text-[tomato] text-lg' onClick={()=>setCurrState("Login")}>Login here</span></p> :
                    <p className='text-gray-500 text-sm'>Create new account? <span className='cursor-pointer text-[tomato] text-lg' onClick={()=>setCurrState("Sign-up")}>Click here</span></p>                
            }
        </form>
    </div>
  )
}

export default Login