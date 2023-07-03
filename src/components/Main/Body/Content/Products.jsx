import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../../../context/ProductsContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsSearch, BsHeart } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import './Products.css'
import { useDispatch } from 'react-redux'
import { showProductModalAction } from '../../../../redux/Slice/ProductModalSlice'
import { toast } from 'react-toastify'

function Products() {
  const {
    fetchCategories,
    categories,
    fetchSubCategories,
    subCategories,
    fetchProducts,
    products,
    setProduct
  } = useContext(ProductContext)
  const location = useLocation()
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sid = location.state?.sid
  useEffect(() => {
    if(sid) {
      fetchProducts(sid)
    }
  }, [])
  return (
    <div className="prods">
      <div className="prods-head" onClick={(e) => toast('Coming Soon')}>
        <div className="prods-head-left">
          <BiArrowBack onClick={(e) => {
            navigate(-1);
            //e.stopPropagation();
          }}/>
          <p>All Products</p>
        </div>
        <div className="prods-head-right">
          <BsSearch />
          <input type="text"></input>
        </div>
      </div>
      <div className="prods-body">
        {products.map((prod) => {
          let src =
            prod.productImages.length > 0 && prod.productImages[0].length > 0
              ? prod.productImages[0]
              : null
          let elem = (
            <div className='prod-item' onClick={(e) => {
              dispatch(showProductModalAction(true));
              setProduct(prod);
              //e.stopPropagation();
            }}>
              {
                src ? <img src={src} alt="" srcset="" /> : <p className='no-img-prd'></p>
              }
              <span className='heart-logo'><BsHeart /></span>
              <p key={prod.productId} className="prod-item-head">
                {prod.itemDescription}
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
                incidunt quod possimus temporibus natus 
              </p>
            </div>
          )
          return elem
        })}

      </div>
    </div>
  )
}

export default Products
