import React from 'react'
import Body from './Body/Body'
import Cart from './Cart/Cart'
import "./Main.css"
import CartWrapper from './CartWrapper'

function Main() {
  return (
    <section className="main">
      <Body />
      <Cart />
    </section>
  )
}

export default Main
