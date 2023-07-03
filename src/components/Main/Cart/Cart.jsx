import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Cart.css"
import {CiEdit} from "react-icons/ci"
import { clear } from '../../../redux/Slice/CartSlice';
import { toast } from 'react-toastify';
import {ImBin} from "react-icons/im"
import { ProductContext } from '../../../context/ProductsContext';
import { showProductModalAction } from '../../../redux/Slice/ProductModalSlice';

function SeeAllModal() {

}

function Cart() {
  const [seeall, setSeeAll] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const showProductModal = useSelector(state => state.pm);
  const dispatch = useDispatch();
  if(Object.keys(cartItems).length === 0) {
    return <div className="cart">
      <ImBin></ImBin>
      <div className='mt-cart'>No items in cart</div>
    </div>
  }

  const itemsTotal = Object.values(cartItems).reduce((p, c) => {
    p += Number(c.totalPrice);
    return p;
  }, 0)
  const SGST = Number((itemsTotal * 9) / 100 );
  const orderTotal = itemsTotal + 1000 + (3 * SGST);
  const cartLength = Object.keys(cartItems);
  let ccEle, mapArr;
  if(cartLength > 4 && !seeall) {
     mapArr = Object.values(cartItems).slice(0, 4);
  }
  else {
    mapArr = Object.values(cartItems)
  }
  ccEle = mapArr.map(cto => {
    
    return (<div className="cart-item">
    <div>
      {
        cto.pImage ? <img src={cto.pImage} alt="" /> : <p className='img-alternate-order-cart'></p>
      }
    </div>
    <div>
      <p>{cto.itemDescription}</p>
      <div>
        <p>{cto.color}</p>
        <p>{cto.label}</p>
      </div>
    </div>
    <div>
      {cto.qty}
    </div>
    <div>
      {cto.totalPrice}
    </div>
  </div>)
  })

  const seeAllDiv = (<div className='overlay' onClick={(e) => {
    console.log('hi')
    setSeeAll(false);
    //e.stopPropagation();
  }}>
    <div className="cart see-all">
  <div className="cart-head">
    <div>Products</div>
    <div>Quantity</div>
    <div>Price</div>

  </div>
  <div className="cart-container">
    {ccEle}
  </div>

  <div className="unused">
    <p>Other Instructions</p>
    <p>Purchase Order Number:</p>
    <p>1011564321</p>
    <p>Addresses:</p>
    <p>Office : 28 Rajasthani Udyog Nagar, G.T.Karnal..</p>
  </div>
  <div className="pricing-cart">
    <div className="p-cart">
      <p>Items Total</p>
      <p>{itemsTotal}</p>
    </div>
    <div className="p-cart">
      <p>{`SGST(9%)`}</p>
      <p>{SGST}</p>
    </div>
    <div className="p-cart">
      <p>{`CGST(9%)`}</p>
      <p>{SGST}</p>
    </div>
    <div className="p-cart">
      <p>{`IGST(9%)`}</p>
      <p>{SGST}</p>
    </div>
    <div className="p-cart">
      <p>Taxable Amount</p>
      <p>1000</p>
    </div>
  </div>
  <div className="p-cart od-total">
    <p>Order total</p>
    <p>{orderTotal}</p>
  </div>
  <div className="btns ">
    <button className='bg-white-f-b' onClick={() => dispatch(clear())}>Clear Cart</button>
    <button className='bg-red-f-w' onClick={() => {
      dispatch(clear());
      toast('Order Placed')
    }}>Place Order</button>
  </div>
</div>
  </div>);
  return (<div className={`cart ${showProductModal ? 'invisible' : null}`}>
      <div className="cart-head">
        <div>Products</div>
        <div>Quantity</div>
        <div>Price</div>
        <div className='cart-head-edit' onClick={() => {
          dispatch(showProductModalAction(true))
        }}>
          <CiEdit /> <span>Edit</span></div>
      </div>
      <div className="cart-container">
        {ccEle}
      </div>
      <div className="cart-more" onClick={() => setSeeAll(true)}>
        <p>See all</p> <span>{'>'}</span>
      </div>
      <div className="unused">
        <p>Other Instructions</p>
        <p>Purchase Order Number:</p>
        <p>1011564321</p>
        <p>Addresses:</p>
        <p>Office : 28 Rajasthani Udyog Nagar, G.T.Karnal..</p>
      </div>
      <div className="pricing-cart">
        <div className="p-cart">
          <p>Items Total</p>
          <p>{itemsTotal}</p>
        </div>
        <div className="p-cart">
          <p>{`SGST(9%)`}</p>
          <p>{SGST}</p>
        </div>
        <div className="p-cart">
          <p>{`CGST(9%)`}</p>
          <p>{SGST}</p>
        </div>
        <div className="p-cart">
          <p>{`IGST(9%)`}</p>
          <p>{SGST}</p>
        </div>
        <div className="p-cart">
          <p>Taxable Amount</p>
          <p>1000</p>
        </div>
      </div>
      <div className="p-cart od-total">
        <p>Order total</p>
        <p>{orderTotal}</p>
      </div>
      <div className="btns ">
        <button className='bg-white-f-b' onClick={() => dispatch(clear())}>Clear Cart</button>
        <button className='bg-red-f-w' onClick={() => {
          dispatch(clear());
          toast('Order Placed')
        }}>Place Order</button>
      </div>
      {seeall ? seeAllDiv : null}
    </div>)
    
}

export default Cart
