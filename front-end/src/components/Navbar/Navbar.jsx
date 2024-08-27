import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'


function Navbar({setShowLogin}) {

  const [profileImage, setProfileImage] = useState(false)

  const [menu, setMenu] = useState('home')
  const {getTotalCartAmount, token, setToken, setShowSearch} = useContext(StoreContext)

  const [showSearchCart,setShowSearchCart] = useState(true)


  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate('/')   // here '/' endpoint is to navigate the user to the home page
  }

  return (
    <div className='navbar'>

      <Link to='/'><img onClick={()=>setShowSearchCart(true)} src={assets.logo} alt="" className="logo" /></Link>

      <ul className="navbar-menu">
        <a href='/' onClick={() => setMenu('home')} className={menu==="home" ? "active" : ""} >Home</a>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu==="menu" ? "active" : ""} >Menu</a>
        <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu==="mobile-app" ? "active" : ""} >Mobile-app</a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu==="contact-us" ? "active" : ""} >Contact Us</a>
      </ul>

      <div className="navbar-right">
        {showSearchCart ? <img className='hello' onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" /> : null}
        <div className="navbar-search-icon">
          <Link to='/cart' ><img onClick={() => setShowSearchCart(false)} className='hello' src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0 ? "" : "dot"}></div>
        </div>
        { !token ? <button onClick={() => setShowLogin(true) } >Sign In</button> : 
        <div className="navbar-profile">
          <div className="menu-icon">
            <img src={assets.menu_icon_top} alt="" />
          </div>
          
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div> }
        
      </div>

    </div>
  )
}

export default Navbar