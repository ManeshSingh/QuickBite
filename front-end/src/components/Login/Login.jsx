import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext'
import {toast} from 'react-toastify'


const Login = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState('Login')


    const [showPassword, setShowPassword] = useState(false);


    // when user is registering or login, all its info will be saved to this 'data' object
     const [data, setData] = useState({
        name : "",
        email : "",
        password : ""
    })
    // this function will be called if there is any changement in input fields and it will set the data to the above 'data' object
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({...data,[name]:value}))
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        let newURL = url;
        if(currState === 'Login'){
            newURL += "/api/user/login"
        }else{
            newURL += "/api/user/register"
        }

        // now hitting the login or register api
        const response = await axios.post(newURL,data)
        if(response.data.success){
            setToken(response.data.token)
            // saving the token to local storage
            localStorage.setItem("token",response.data.token) 
            setShowLogin(false)
            toast.success(`Welcome ${data.name}`)
        }else{
            alert(response.data.message)
        }
    }


  return (
    <div className='login'>
        <form onSubmit={onSubmitHandler} className="login-container">
            <div className="login-title">
                <h2>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-inputs">
                { currState==="Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> }
                <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Your email' required />

                <div className='password-container'>
                    <input name='password' onChange={onChangeHandler} value={data.password} type={showPassword ? "text" : "password"} placeholder='password' required  />
                    <img onClick={() => setShowPassword(prev => !prev)} src={showPassword ? assets.password_show_icon : assets.password_hide_icon} alt="" />  
                </div>

            </div>
            <button type='submit' > {currState==="Sign Up" ? "Create account" : "Login"} </button>

            <div className="login-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use and privacy policy</p>
            </div>

            { currState==='Sign Up' 
            ? <p>Already have an account? <span onClick={()=>setCurrState('Login')} >Login</span> </p>
            : <p>Create a new account?<span onClick={()=>setCurrState('Sign Up')} >Click here</span> </p> 
            }
        </form>
    </div>
  )
}

export default Login