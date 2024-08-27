import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddFood from './pages/AddFood/AddFood'
import ListOfFood from './pages/ListOfFood/ListOfFood'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditFood from './components/EditFood/EditFood'

const App = () => {

  const [showEditOption, setShowEditOption] = useState(false)

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<AddFood/>}/>
          <Route path='/list' element={<ListOfFood showEditOption={showEditOption} setShowEditOption={setShowEditOption} />} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/edit' element={<EditFood/>}  />
        </Routes>
      </div>
    </div>
  )
}

export default App