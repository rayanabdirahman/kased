import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';

interface IProps {
  product: any
}


const Card: React.FunctionComponent<IProps>  = ({ product }) => (
  <div className="col-4 mb-3">
    <div className="card">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        <ProductImage item={product} url="product"/>
        <p>
          {product.description.substring(0, 100)}
        </p>
        <p>£{product.price}</p>
        <Link to={`/product/${product._id}`}>
          <button className="btn-outline-primary mt-2 mb-2">View Product</button>
        </Link>
        <button className="btn-outline-warning mt-2 mb-2">Add to Cart</button>
      </div>
    </div>
  </div>
)

export default Card