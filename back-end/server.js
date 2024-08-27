// Here we create the basic express server which is of module type which uses ES6 feature. so, firstly we have to define the type as module in package.json file

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



// app config
const app = express()
const port = process.env.PORT


// middleware
app.use(express.json())
app.use(cors())


// Database connection
connectDB();


// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use('/api/order',orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})


// Now we will run the server
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);  
})