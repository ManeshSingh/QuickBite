import React, { useEffect, useState } from 'react'
import './ListOfFood.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { assets,url, currency } from '../../assets/assets'
import EditFood from '../../components/EditFood/EditFood'
import { useNavigate } from 'react-router-dom'

const ListOfFood = ( {showEditOption,setShowEditOption} ) => {

  const [image, setImage] = useState(false)

  const [list, setList] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setList(response.data.data.reverse())
    }else{
      toast.error("Error")
    }
  }

  useEffect(() => {   // we are fetching the list whenever the web page is loaded
    fetchList();
  },[])


  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList()
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error("Error")
    }
  }



  // const [foodData,setFoodData] = useState([])
  const navigate = useNavigate();
  let editFoodId
  const editFood = async (foodId) => {
    editFoodId = foodId
    navigate("/edit", {state: {id : editFoodId}})
  }


  



  return (
    <>
      <div className='list add flex-col'>
        <h1><span className='manesh'>All</span> Foods List</h1>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Remove</b>
            <b>Edit</b>
          </div>
          {list.map((item,index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/`+item.image} alt="" />
                <p> {item.name} </p>
                <p> {item.category} </p>
                <p> {currency}{item.price} </p>
                <img onClick={() => removeFood(item._id)} className='remove' src={assets.remove_icon} alt="" />
                <div onClick={() => editFood(item._id)} >
                  <img className='edit_icon' src={assets.edit_icon} alt="" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ListOfFood