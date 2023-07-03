import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { AiFillCaretDown } from 'react-icons/ai'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function Header() {
  return (
    <div className="header">
      <div className="head-left">
        <div>
          <NavLink to="/"><img
            className="logo-left"
            src="https://th.bing.com/th/id/OIP.d5svhARK7DOCj2jEYRgUSwHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt=""
          /></NavLink>
        </div>
        <div className='head-left-two'>
          <BsSearch />
          <input type="text" name="" id="" placeholder="Searchs" />
        </div>
      </div>
      <nav className="head-right">
        <div><NavLink to="/"><img
          className="logo-right"
          src="https://th.bing.com/th/id/OIP.d5svhARK7DOCj2jEYRgUSwHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt=""
        /></NavLink></div>
        <div className='user-details'>
          <img
            className="avatar-right"
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.2.1128430264.1637010767&semt=ais"
            alt=""
          />
          <div className='user-details-content'>
          <div className=''>
          <p>User Admin</p>
              <p>user1234asdf@abd.com</p>
          </div>
              <div onClick={() => toast('Coming soon!!')}>
              <button>
                <AiFillCaretDown />
              </button>
            </div>
            
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
