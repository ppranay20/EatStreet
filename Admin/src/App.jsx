import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'

const App = () => {
  return (
    <div className='bg-[#fcfcfc] h-screen'>
      <ToastContainer />
      <Navbar></Navbar>
      <hr className='border-gray-950' />
      <div className='w-[1200px] m-auto flex h-[100vh]'>
        <Sidebar></Sidebar>
        <div>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/add' element={<Add></Add>}></Route>
            <Route path='/list' element={<List></List>}></Route>
            <Route path='/order' element={<Order></Order>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App