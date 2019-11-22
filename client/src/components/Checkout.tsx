import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

interface IProps {
  products: any
}

const Checkout: React.FunctionComponent<IProps> = ({ products }) => {
  const getCartItemTotal = () => {  
    return products.reduce((currentValue: any, nextValue: any) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const progressToCheckout = () => { 
    return isAuthenticated() ? (<button className="btn btn-success">Checkout</button>) :
    (<Link to="/login">
      <button className="btn btn-success">Login to checkout</button>
    </Link>)
  }
    

  return (
    <div>
      <h2>Total: £{getCartItemTotal()}</h2>
      <div>
        {progressToCheckout()}
      </div>
    </div>
  )
}

export default Checkout