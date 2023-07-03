import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import Footer from './Footer/Footer'
import "./Body.css"

function Body() {
  return (
    <div className="body">
      <div className='body-top'>
        <Sidebar />
        <Content />
      </div>
      <div className='body-bottom'>
        <Footer />
      </div>
    </div>
  )
}

export default Body
