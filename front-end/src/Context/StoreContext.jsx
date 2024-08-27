import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from 'axios'
import {toast} from 'react-toastify'

export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    const url = "https://quick-bite-backend-seven.vercel.app"     // backend url
    const currency = "₹";
    const deliveryCharge = 30;
    const [token, setToken] = useState("")

    const [cartItems, setCartItems] = useState({});



    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);


    const [promo,setPromo] = useState('');
    const [promoDone, setPromoDone] = useState(false)


    // this below state is used to display all the food items in frontend from database not from assets folder
    const [food_list, setFoodList] = useState([])

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.data)
    }

    // this function loads the cartItems from the database
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    useEffect( () => {
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[] )   // [] means for every operation in our webpage, this useEffect hook will execute




    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }else{
            setCartItems((prev) => ({...prev,[itemId] : prev[itemId]+1}))
        }
        // if the token is available, then we are doing an api call(that we have created in the backend folder) to add the cart items to the database as well
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            toast.success("Item added to cart")
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev,[itemId] : prev[itemId]-1}))

        // similarly as above, when the user is removing an item from its cart. so it will update in the database as well
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            toast.success("Item removed from cart")
        }
    }


    // this below function is used to find the total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id===item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount
    }



    const contextValue = {
        food_list,   // using this context we can access the food_list anywhere
        menu_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        currency,
        deliveryCharge,
        promo,setPromo,promoDone,setPromoDone,
        search,setSearch,showSearch,setShowSearch
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;