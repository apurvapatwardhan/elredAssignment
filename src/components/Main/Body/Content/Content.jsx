import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import ProductProvider, { ProductContext } from '../../../../context/ProductsContext'
import ProductModal from './ProductModal'
import CartWrapper from "../../CartWrapper"

function Content() {
  return (
    <ProductProvider>
      <Outlet />
      <ProductModal />
    </ProductProvider>
  )
}

export default Content
