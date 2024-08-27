import React, { useContext } from 'react'
import './Search.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'

const Search = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(StoreContext);

  return showSearch ? (
    <div className='search'>
        <div className="search-container">
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search'/>
            <img src={assets.search_icon} alt="" />
        </div>
        <img className='cross' onClick={() => setShowSearch(false)} src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default Search