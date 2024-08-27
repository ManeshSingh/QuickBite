import foodModel from "../models/foodModel.js";
import userModel from '../models/userModel.js'


// add items to cart in databse
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){   // if any particular item is not present in cart, then we create one
            cartData[req.body.itemId] = 1;
        }else{  // else we increase the quantity of that item in the cart
            cartData[req.body.itemId] += 1;
        }

        // it will update the cartData object in the database
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        return res.json({
            success: true,
            message: "Item is added to cart"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error"
        })
        
    }
}


// remove items from user cart from database
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.userId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        return res.json({
            success: true,
            message: "Item is removed from cart"
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error"
        })
    }
}


// fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        return res.json({
            success: true,
            cartData
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error"
        })
    }
}


export {addToCart,removeFromCart,getCart}