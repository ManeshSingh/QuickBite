import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const Cart = () => {

  const {cartItems, food_list, removeFromCart,getTotalCartAmount,url,currency,deliveryCharge,promo,setPromo,promoDone,setPromoDone} = useContext(StoreContext);

  const navigate = useNavigate();

  

  const promoHandler = (e) => {
    e.preventDefault();
    setPromoDone(true);
    if(promo === 'QUICKBITE10'){
      toast.success("Promocode applied")
    }
  }

  useEffect(() => {
    if(getTotalCartAmount() == 0){
      setPromo('');
    }
  },[cartItems])
  

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id]>0) {
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>{currency}{item.price}</p>
                <div>{cartItems[item._id]}</div>
                <p>{currency}{item.price*cartItems[item._id]}</p>
                <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item._id)}>x</p>
              </div>
              <hr />
            </div>)
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{currency}{getTotalCartAmount()===0?0:deliveryCharge}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>{currency}{getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryCharge}</b>
            </div>
            <hr />

            <div className="cart-total-details">
              <h3 className='bill'>{promoDone && promo==='QUICKBITE10' ? 'Bill after discount' : ''}</h3>
              <h3>{promoDone && promo==='QUICKBITE10' ? (getTotalCartAmount()>0 ? <b>{currency}{getTotalCartAmount()+deliveryCharge - ((getTotalCartAmount()+deliveryCharge)*10)/100}</b> : 0) : <></>}</h3>
            </div>

          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <form>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input value={promo} onChange={(e) => setPromo(e.target.value)} type="text" placeholder='promo code'/>
              <button onClick={promoHandler}>APPLY</button>
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Cart
