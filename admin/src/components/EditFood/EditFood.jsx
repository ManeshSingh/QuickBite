import React, { useEffect, useState } from 'react'
import './EditFood.css'
import { assets, url } from '../../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


const EditFood = () => {

  const [foodImage,setFoodImage] = useState(false)

  const location = useLocation() //this hook is used to collect data coming from useNavigate hook
  console.log(location.state.id);  // it gives the id of the food item that we want to edit

  const navigate = useNavigate()

  
  let [editFoodData,setEditFoodData] = useState([])
  const fetchFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/edit`,{id:foodId}) // calling the api
    if(response.data.success){
      setEditFoodData(response.data.data)
    }else{
      toast.error("Error! please try again")
    }
  }
  



  const [data, setData] = useState({
    name:"",
    description:"",
    price:"",
    category:""
  })


  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data,[name]:value}))
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name",data.name || editFoodData.name)
    formData.append("description",data.description || editFoodData.description)
    formData.append("price",Number(data.price || editFoodData.price))
    formData.append("category",data.category || editFoodData.category)
    formData.append("image",foodImage || editFoodData.image)

    const response = await axios.post(`${url}/api/food/add`, formData)
    if(response.data.success){  // if the food item is added to the database, then we have to reset all the items on the web page
        toast.success("Food updated successfully")
        setData({
            name:"",
            description:"",
            price:"",
            category:""
        })
        setFoodImage(false)
    }else{
        toast.error(response.data.message)
    }
    removePreviousFood(location.state.id)
  }



  const removePreviousFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    navigate('/list')
  }




  useEffect(() => {
    fetchFood(location.state.id)
  },[])

  return (
    <div className='add-food'>
        <form onSubmit={onSubmitHandler} className='flex-col'>
          <h1><span className='manesh'>Edit/Update</span> Food Item</h1>
          <div className="uploading-area">
              <div className="add-img-upload flex-col">
                  <p>Upload Image</p>
                  <label htmlFor="image">
                      <img src={assets.upload_icon} alt="" />
                  </label>
                  <input onChange={(e)=>setFoodImage(e.target.files[0])} type="file" id="image" hidden required />
                  <p className='hell'><span>Note: </span>Don't forget to Upload image here</p>
              </div>
              <div className="food-image">  
                  <img src={foodImage ? URL.createObjectURL(foodImage) : assets.upload_area } required/>
              </div>
            </div>

            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input type="text" onChange={onChangeHandler} name="name" placeholder='Type here' defaultValue={editFoodData.name} required/>
            </div>

            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea name="description" rows='5' placeholder='Add description of the product' onChange={onChangeHandler} defaultValue={editFoodData.description} required></textarea>
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} defaultValue={editFoodData.category} name="category" required>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input defaultValue={editFoodData.price} onChange={onChangeHandler} type="number" name='price' placeholder='₹50' required/>
                </div>
            </div>

            <button type='submit' className='add-btn'>Update</button>
        </form>
    </div>
  )
}

export default EditFood