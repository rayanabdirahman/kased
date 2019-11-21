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
  
  return (
    <div className="card">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ProductImage item={product} url="product"/>
        <p className="lead mt-2">
          {product.description.substring(0, 100)}
        </p>
        <p>£{product.price}</p>
        <p>Category: {product.category && product.category.name}</p>
        <p>Added on: {moment(product.createdAt).fromNow()}</p>
        {
          product.quantity > 0 ? <span className="badge badge-primary badge-pill">In stock</span>  : <span className="badge badge-danger badge-pill">Out of stock</span>
        }
        
        <Link to={`/product/${product._id}`}>
          {
            showViewProductButton && <button className="btn-outline-primary mt-2 mb-2">View Product</button>
          }
        </Link>

        {
          showAddToCartButton && <button onClick={addToCart} className="btn-outline-warning mt-2 mb-2">Add to Cart</button>
        }

        {
          showRemoveFromCartButton &&
          <button 
            onClick={() => {
              removeCartItem(product._id)
              setRun(!run); // run useEffect in parent Cart
            }}
            className="btn-outline-danger mt-2 mb-2">
            Remove item from Cart
          </button>
        }

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  )
}

export default Card