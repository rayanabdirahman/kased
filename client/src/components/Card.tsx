import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment'
import ProductImage from './ProductImage';
import { addItem, updateCartItem, removeCartItem } from '../api/cart';

interface IProps {
  product: any
  showViewProductButton?: boolean
  showAddToCartButton?: boolean
  showRemoveFromCartButton?: boolean
  cartUpdate?: boolean
  setRun?: any
  run?: any
}

const Card: React.FunctionComponent<IProps>  = (
  { 
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    showRemoveFromCartButton = false,
    cartUpdate = false,
    setRun = (fn: any) => fn,
    run = undefined
  }) => {
  const [redirect, setRedirect] = React.useState<any>(false)
  const [count, setCount] = React.useState<any>(product.count)

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = (redirect: any) => {
    if(redirect) {
      return <Redirect to="/cart" />
    }
  }

  const handleChange = (productId: any) => (event: any) => {
    setRun(!run) // run useEffect in parent Cart
    setCount((event.target.value < 1) ? 1 : event.target.value)
    if(event.target.value >= 1) {
      updateCartItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = (cartUpdate: boolean) => {
    return cartUpdate && <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Quantity</span>
        </div>
        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
      </div>
    </div>
  }
  
  const showStockStatus = () => (
    product.quantity > 0 ? 
    <span className="badge badge-primary">In stock</span>  : 
    <span className="badge badge-danger">Out of stock</span>
  )

  const showAddtoCartButton = () => (
    showAddToCartButton && <button onClick={addToCart} className="btn btn-secondary btn-outline mr-0">ADD</button>
  )

  const showRemovefromCartButton = () => (
    showRemoveFromCartButton &&
    <button 
      onClick={() => {
        removeCartItem(product._id)
        setRun(!run); // run useEffect in parent Cart
      }}
      className="btn-outline-danger mt-2 mb-2">
      Remove item from Cart
    </button>
  )
  
  return (
    <div className="card mb-10">
      <div className="card-header">
        {/* TODO - REMOVE REDIRCT WHEN CART CONTENT SHOULD BE VISIBLE AT ALL TIME */}
        {shouldRedirect(redirect)}

        {/* SHOW WHETHER PRODUCT IS IN STOCK OR NOT */}
        {showStockStatus()}

      </div>
      <div className="card-content">
        <ProductImage item={product} url="product"/>
        <span className="product-name">{product.name}</span>
        <span className="product-description">{product.description}</span>
      </div>
      <div className="card-footer">
        <span className="product-price">£{product.price}</span>

        {/* TOGGLE VIEW PRODUCT BUTTON DEPENDING ON PAGE */}
        <Link to={`/product/${product._id}`}>
          {
            showViewProductButton && <button className="btn btn-primary mt-2 mb-2">View Product</button>
          }
        </Link>

        {/* TOGGLE ADD TO CART BUTTON DEPENDING ON PAGE */}
        {showAddtoCartButton()}

        {/* ONLY SHOW REMOVE FROM CART BUTTON ON CART PAGE */}
        {showRemovefromCartButton()}

        {/* UPDATE CART */}
        {showCartUpdateOptions(cartUpdate)}

      </div>
    </div>
  )
}

export default Card