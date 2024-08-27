import React, { useState } from 'react'
import './AddFood.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios'  // axios is used to get the response from the server
import { toast } from 'react-toastify'

const AddFood = () => {

    const [image, setImage] = useState(false)   // this state is used to display the uploaded image

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
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        const response = await axios.post(`${url}/api/food/add`, formData)
        if(response.data.success){  // if the food item is added to the database, then we have to reset all the items on the web page
            toast.success(response.data.message)
            setData({
                name:"",
                description:"",
                price:"",
                category:""
            })
            setImage(false)
        }else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add-food'>
        <h1><span className='manesh'>Add</span> Food Item</h1>
        <form className="flex-col" onSubmit={onSubmitHandler}>

            <div className="uploading-area">
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={assets.upload_icon} alt="" />
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="food-image">  
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} />
                </div>
            </div>

            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
            </div>

            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Add description of the product' required></textarea>
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" defaultValue="default">
                        <option disabled value="default">select category</option>
                        <option value="Salad">Salad</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Paneer">Paneer</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Momos">Momos</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='₹50' />
                </div>
            </div>

            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default AddFood