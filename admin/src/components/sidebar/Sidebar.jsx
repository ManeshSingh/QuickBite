import React, { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(null)
  return (
    <div className='sidebar'>
      
        <div className="sidebar-options">

            <NavLink onClick={()=>setSidebar('add')} id={sidebar==='add' ? "curr" : ""} to='/add' className="sidebar-option">
              <img src={assets.add_icon} alt="" />
              <p>Add Items</p>
            </NavLink>
            <NavLink onClick={()=>setSidebar('list')} id={sidebar==='list' ? "curr" : ""} to='/list' className="sidebar-option">
              <img src={assets.order_icon} alt="" />
              <p>List Items</p>
            </NavLink>
            <NavLink onClick={()=>setSidebar('orders')} id={sidebar==='orders' ? "curr" : ""} to='/orders' className="sidebar-option">
              <img src={assets.order_icon} alt="" />
              <p>Orders</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar