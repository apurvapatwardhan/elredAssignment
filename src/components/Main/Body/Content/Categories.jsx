import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../../../context/ProductsContext'
import { BsSearch } from 'react-icons/bs'
import './Categories.css'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function Categories() {
  const {
    fetchCategories,
    categories,
    fetchSubCategories,
    subCategories,
    setCategory,
    category,
  } = useContext(ProductContext)
  console.log(categories)
  useEffect(() => {
    fetchCategories()
  }, [])

  const categoryHandler = (categoryId) => {
    fetchSubCategories(categoryId)
  }
  return (
    <div className="cat">
      <div className="cat-head">
        <p>Print Heads</p>
        <div onClick={(e) => toast('Coming Soon')}>
          <BsSearch />
          <input type="text" ></input>
        </div>
      </div>
      <div className="cat-container">
        <div className="cat-cats">
          {categories.map((el) => {
            let src = el.categoryImageURL
            if (src.length > 0) {
              return (
                <div
                  onClick={(e) => {
                    categoryHandler(el.categoryId)
                    setCategory(el.categoryId);
                    //e.stopPropagation();
                  }}
                  key={el.categoryId}
                  className={`cat-img-container ${
                    category === el.categoryId ? 'item-selected' : null
                  }`}
                >
                  <p className="cat-img-des">{el.categoryName}</p>
                  <img width={'150'} height={'150'} src={src} alt="hello" />
                </div>
              )
            } else {
              return (
                <p
                  onClick={(e) => {
                    categoryHandler(el.categoryId)
                    setCategory(el.categoryId);
                    //e.stopPropagation();
                  }}
                  key={el.categoryId}
                  className={`cat-square ${
                    category === el.categoryId ? 'item-selected' : null
                  }`}
                >
                  {el.categoryName}
                </p>
              )
            }
          })}
        </div>
      </div>
      <div className="cat-sub">
        {subCategories.length === 0 ? (
          <div className='no-sub-data'>No Data Found</div>
        ) : (
          subCategories.map((el) => {
            let src = el.subCategoryImageURL
            if (src.length > 0) {
              let elem = (
                <div key={el.subCategoryId} className="cat-img-container">
                  <p className="cat-img-des-sub">{el.subCategoryName}</p>
                  <img width={'150'} height={'150'} src={src} alt="hello" />
                </div>
              )
              return (
                <NavLink to="/products" state={{ sid: el.subCategoryId }}>
                  {elem}
                </NavLink>
              )
            } else {
              let elem = (
                <p key={el.subCategoryId} className="cat-square">
                  {el.subCategoryName}
                </p>
              )
              return (
                <NavLink to="/products" state={{ sid: el.subCategoryId }}>
                  {elem}
                </NavLink>
              )
            }
          })
        )}
      </div>
    </div>
  )
}

export default Categories
