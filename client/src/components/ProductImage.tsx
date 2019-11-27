import React from 'react'
import { API_BASE_URL } from '../config'

interface IProps {
  item: any
  url: string
}

const ProductImage: React.FunctionComponent<IProps> = ({ item, url}) => {
  return (
    <div className="product-image">
      <img src={`${API_BASE_URL}/${url}/photo/${item._id}`} alt={item.name} className="mb-3"/>
    </div>
  );
}

export default ProductImage