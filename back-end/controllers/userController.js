import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// now we will create two async functions

// (1) login user  (This is just the user login API)
const loginUser = async (req,res) => {
    const {email, password} = req.body;

    try {
        // finding the user in the database
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({
                success: false,
                message: "User does not exist"
            })
        }
        
        // checking whether the password entered is correct or not
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.json({
                success: false,
                message: "Password is Incorrect"
            })
        }

        const token = createToken(user._id)
        return res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error"
        })  
    }

}


// creating token with user id and JWT 
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}



// (2) register user (It is just the API to create a new user. To use this API, we have to write /register in url that we have already written in userRoute.js file)
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;   // destructuring 
    try {
        // checking whether the user is already exist
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({
                success: false,
                message: "User already exist"
            })
        }

        // validating the email
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        // validating password
        if(password.length < 8){
            return res.json({
                success: false,
                message: "Password length should be 8 or more"
            })
        }

        // encrypting the user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // creating a new user with its name, email and the hashedPassword if all the above conditions are true
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        return res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error"
        })
    }
}


export {loginUser, registerUser}