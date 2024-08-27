import React, { useContext, useEffect, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    // getting the food list item using context api
    const {food_list,search,showSearch} = useContext(StoreContext)

    const [filterItems,setFilterItems] = useState([]);


    const applyFilter = () => {
        let food_listCopy = food_list.slice();  // fake copy of food_list will be generated
        
        if(showSearch && search){
            food_listCopy = food_listCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        setFilterItems(food_listCopy);
    }

    useEffect(() => {
        applyFilter();
    },[search,showSearch])

    

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {
                showSearch ? 
                    filterItems.map((item,index) => {
                            return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
                    })
                    :
                    food_list.map((item,index) => { 
                        if(category==="All" || category===item.category){
                            return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
                        }   
                    })

            }
        </div>
    </div>
  )
}

export default FoodDisplay