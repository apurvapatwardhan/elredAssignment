import React from 'react'
import "./Sidebar.css"
import {MdDashboard} from "react-icons/md"
import {AiOutlineGift, AiTwotoneCiCircle} from "react-icons/ai"
import {FcLike} from "react-icons/fc"
import {FaCubes} from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function Sidebar() {
  return (
    <div className='sb'>
      <div className='sb-logo'>
        <NavLink tp="/"><img className='sb-logo-image' src="https://th.bing.com/th/id/OIP.d5svhARK7DOCj2jEYRgUSwHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" /></NavLink>
      </div>
      <ul className='sb-list' onClick={(e) => toast('Coming Soon')}>
        <li><MdDashboard /> <span>Dashboard</span></li>
        <li> <FaCubes /> <span>All Products</span></li>
        <li> <AiOutlineGift /> <span>Orders</span></li>
        <li> <FcLike /> <span>Favourites</span></li>
        <li> <AiTwotoneCiCircle /> <span>New Arrival</span></li>
      </ul>
    </div>
  )
}

export default Sidebar
