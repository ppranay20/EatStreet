import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import PlaceOrder from './Pages/PlaceOrder'
import Footer from './Components/Footer'
import Login from './Components/Login'
import Header from './Components/Header'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { StoreContext } from './context/StoreContext'
import Verify from '../../Client/src/Pages/Verify'
import MyOrders from './Pages/MyOrders'

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  const {setIsLoggedIn} = useContext(StoreContext)

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false)
    }
  },[])

  return (
    <div>
      <ToastContainer />
      {showLogin ? <div><Login setShowLogin={setShowLogin}></Login></div> : <div></div>}
      <div>
          <Navbar setShowLogin = {setShowLogin}></Navbar>
          <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/cart' element={<Cart></Cart>}></Route>
              <Route path='/order' element={<PlaceOrder></PlaceOrder>}></Route>
              <Route path='/verify' element={<Verify></Verify>}></Route>
              <Route path='/myorders' element={<MyOrders></MyOrders>}></Route>
          </Routes>
          <Footer />
      </div>
    </div>
  )
}

export default App