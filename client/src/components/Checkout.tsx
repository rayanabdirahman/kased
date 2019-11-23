import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';
import { getBraintreeClientToken } from '../api/braintree';

interface IProps {
  products: any
}

const Checkout: React.FunctionComponent<IProps> = ({ products }) => {
  const [state, setState] = React.useState<any>({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  // store userId
  const userId = isAuthenticated() && isAuthenticated().user._id

  // store user token
  const token = isAuthenticated() && isAuthenticated().token

  // call backend api to retrieve braintree client token
  const getClientToken = async(userId: string, token: string) => {
    try {
      const response = await getBraintreeClientToken(userId, token)

      // check for errors
      if (response.error) {
        return setState({...state, error: response.statusText});
      }

      setState({...state, clientToken: response})

    } catch (error) {
      console.log(`Checkout:getClientToken=>>> Error when retrieving braintree client token: ${error}`)
    }
  }

    // lifecycle method to run everytime the component mounts
    React.useEffect(() => {
      // run functions to get braintree client token
      getClientToken(userId, token)
    },[])

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