import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment'
import ProductImage from './ProductImage';
import { addItem } from '../api/cart';

interface IProps {
  product: any
  showViewProductButton?: boolean
  showAddToCartButton?: boolean
  cartUpdate?: boolean
}

const Card: React.FunctionComponent<IProps>  = ({ product, showViewProductButton = true , showAddToCartButton = true, cartUpdate = false }) => {
  const [redirect, setRedirect] = React.useState<any>(false)

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

  const showCartUpdateOptions = (cartUpdate: any) => {
    return cartUpdate && <div>Icrement/decrement</div>
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

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  )
}

export default Card