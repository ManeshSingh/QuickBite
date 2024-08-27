import foodModel from "../models/foodModel.js";
import fs from 'fs'



// add food item
const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save();
        return res.json({
            success: true,
            message: "Food Added Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error"
        })
    }
}



// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({})
        return res.json({
            success: true,
            data: foods
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error"
        })
    }
}



// remove food item
const removeFood = async (req,res) => {
    try {
        // firstly we want to find the food item that we want to delete
        const food = await foodModel.findById(req.body.id)

        // now we have to delete that food item image from uploads folder as well
        fs.unlink(`uploads/${food.image}`, ()=>{})

        // we also have to delete the food item from database
        await foodModel.findByIdAndDelete(req.body.id)

        return res.json({
            success: true,
            message: "Food Removed Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error"
        })
    }
}




// edit or update food item
const editFood = async (req,res) => {
    
    try {
        // firstly we will find the food item that we want to edit
        const food = await foodModel.findById(req.body.id)

        return res.json({
            success: true,
            data: food
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error in fetching the food item"
        })
    }
}



export { addFood,listFood,removeFood,editFood }