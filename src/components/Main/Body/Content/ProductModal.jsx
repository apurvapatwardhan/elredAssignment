import React, { useContext, useState } from 'react'
import './ProductModal.css'
import { ProductContext } from '../../../../context/ProductsContext'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../../../../redux/Slice/CartSlice'
import { showProductModalAction } from '../../../../redux/Slice/ProductModalSlice'
function ProductModal() {
  const [orderList, setOrderList] = useState([])
  const [colorItem, setColor] = useState('')
  const [labelItem, setLabel] = useState('')
  const [itemQty, setItemQuantity] = useState(0)
  const [priceState, setPrice] = useState('')
  const { setShowProductModal, setProduct, product } = useContext(
    ProductContext,
  )
  console.log(product, 'modal')
  const colorHandler = (clr) => {
    setColor(clr)
  }

  const labelHandler = (lbl) => {
    setLabel(lbl)
  }

  const dispatch = useDispatch()
  //add to order list
  const addHandler = () => {
    const variant = product?.variants.find((el) => {
      if (
        el.colorDescription == colorItem &&
        el.packingDescription == labelItem
      ) {
        return true
      }
      return false
    })
    console.log('add', variant, colorItem, labelItem, product?.variants)
    if (variant) {
      const orderItem = {
        pid: product?.productId,
        vid: variant._id,
        qty: Number(itemQty),
        label: labelItem,
        color: colorItem,
        pImage: product.productImages[0],
        price: variant.grossPrice,
        totalPrice: Number(priceState) * Number(itemQty),
        itemDescription: product?.itemDescription,
      }
      const prevOrderList = [...orderList]
      const orderItemIndex = prevOrderList.findIndex((od) => {
        return od.color == colorItem && od.label === labelItem
      })
      if (orderItemIndex >= 0) {
        const totalQty =
          Number(prevOrderList[orderItemIndex].qty) + Number(itemQty)
        const price = Number(prevOrderList[orderItemIndex].price)
        const newOrderItem = { ...prevOrderList[orderItemIndex] }
        newOrderItem.qty = totalQty
        newOrderItem.totalPrice = Number(price) * Number(totalQty)
        prevOrderList[orderItemIndex] = newOrderItem
      } else {
        prevOrderList.push(orderItem)
      }
      setOrderList(prevOrderList)
      console.log(prevOrderList, 'oil')
      setItemQuantity(0)
      setColor('')
      setLabel('')
    }
  }

  //delete handler
  const deleteHandler = (variantId) => {
    const filteredOrderList = orderList.filter((od) => {
      return od.vid != variantId
    })
    setOrderList(filteredOrderList)
  }

  const addDisabled = colorItem.length == 0 || labelItem.length == 0
  const colorset = new Set()
  const colors = product?.variants
    ?.filter((el) => {
      const { colorDescription, _id } = el
      if (colorset.has(colorDescription)) {
        return false
      }
      colorset.add(colorDescription)
      return true
    })
    .map((cl) => {
      const { colorDescription, _id } = cl
      return { colorDescription, vid: _id }
    })
  const labelSet = new Set()
  const labels = product?.variants
    ?.filter((el) => {
      const { packingDescription, _id } = el
      if (labelSet.has(packingDescription)) {
        return false
      }
      labelSet.add(packingDescription)
      return true
    })
    .map((el) => el.packingDescription)

  //add to cart
  const addToCart = () => {
    console.log(orderList)
    dispatch(add(orderList))
    dispatch(showProductModalAction(false))
  }

  const showProductModal = useSelector((state) => state.pm)
  //const priceItem = product?.variants?.find
  if (!showProductModal) {
    return null
  }

  const updatedOrderList = orderList.filter(olp => olp.pid === product.productId)
  return (
    <div className="overlay" >
      <div className="prod-modal">
        <div
          className="close-pr-md"
          onClick={(e) => {
            dispatch(showProductModalAction(false));
            //e.stopPropagation();
          }}
        >
          X
        </div>
        <div className="prod-modal-container">
          <div className="prod-modal-left">
            <div className="modal-head-img-container">
              <h1 className="">{product?.itemDescription}</h1>
              {product?.productImages[0] ? (
                <img
                  className="modal-left-img"
                  src={product?.productImages[0]}
                  alt=""
                />
              ) : (
                <p className="img-alternate"></p>
              )}

              <p>{`#${product?.itemNumber}`}</p>
              <div className="bold-head-modal">
                <p>{product?.itemDescription}</p>
                <p>{priceState}</p>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. In
                reiciendis reprehenderit rerum cumque quidem provident at
                voluptatem qui labore commodi vitae{' '}
              </p>
            </div>
            <div className="">
              <h1>Please Select Color Description</h1>
              <div className="btn-wrap">
                {colors.map((color) => (
                  <button
                    onClick={(e) => {
                      if (labelItem.length > 0) {
                        const ptem = product?.variants?.find((el) => {
                          return (
                            el.packingDescription === labelItem &&
                            el.colorDescription == color.colorDescription
                          )
                        })
                        if (ptem) {
                          setPrice(ptem.grossPrice)
                        } else {
                          setPrice('')
                        }
                      }
                      setColor(color.colorDescription);
                      //e.stopPropagation();
                    }}
                    className={`${
                      color.colorDescription == colorItem
                        ? 'btn-selected-modal'
                        : null
                    }`}
                  >
                    {color.colorDescription}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h1>Please Select Packagin Description</h1>
              <div className="btn-wrap">
                {labels.map((label) => (
                  <button
                    onClick={(e) => {
                      if (colorItem.length > 0) {
                        const ptem = product?.variants?.find((el) => {
                          return (
                            el.packingDescription === label &&
                            el.colorDescription == colorItem
                          )
                        })
                        if (ptem) {
                          setPrice(ptem.grossPrice)
                        } else {
                          setPrice('')
                        }
                      }
                      setLabel(label);
                      //e.stopPropagation();
                    }}
                    className={`${
                      label == labelItem ? 'btn-selected-modal' : null
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="qty-head">Enter Qunatity</p>
              <input
                type="text"
                placeholder="quantity"
                onChange={(e) => setItemQuantity(e.target.value)}
                value={itemQty}
              />
            </div>
            <div className="add-div">
              <button
                disabled={addDisabled}
                onClick={addHandler}
                className={`add-btn ${addDisabled ? 'ad-btn-dbld' : ''}`}
              >
                Add
              </button>
            </div>
          </div>
          <div className="prod-modal-right">
            <div className="mr-tb-head">Product</div>
            <div className="mr-tb-head">Qty</div>
            <div className="mr-tb-head">{'Price'}</div>
            <div className="mr-hide">Delete</div>
            {updatedOrderList.length === 0 ? (
              <div className="alas-no-items">No Items Added</div>
            ) : (
              updatedOrderList.map((oi) => {
                const { label, color, pImage, qty, price, totalPrice, vid } = oi
                const elem = (
                  <React.Fragment>
                    <div className="mr-img-container">
                      {pImage ? (
                        <img
                          className="modal-left-img"
                          src={product?.productImages[0]}
                          alt=""
                        />
                      ) : (
                        <p className="img-alternate-order"></p>
                      )}
                      <p className="mr-img-des">
                        <span className="mr-img-clr">{color}</span>
                        <span className="mr-img-lbl">{label}</span>
                      </p>
                    </div>
                    <div className="mr-qty">{qty}</div>
                    <div className="mr-price">{totalPrice}</div>
                    <div className="mr-delete">
                      <button onClick={() => deleteHandler(vid)}>X</button>
                    </div>
                  </React.Fragment>
                )

                return elem
              })
            )}
            {updatedOrderList.length > 0 ? (
              <div className="add-to-cart-mr">
                <button onClick={() => addToCart()}>Add to Cart</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
