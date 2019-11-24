import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';
import { getBraintreeClientToken, processPayment } from '../api/braintree';
import DropIn from 'braintree-web-drop-in-react';
import Alert from './Alert';
import { AlertEnum } from '../domain/enums';
import { emptyCart } from '../api/cart';

interface IProps {
  products: any
}

const Checkout: React.FunctionComponent<IProps> = ({ products }) => {
  const [state, setState] = React.useState<any>({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
    redirectUser: false
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

  const buy = async() => {
    try {
      setState({...state, loading: true})

      // send nonce to your server
      // nonce = payment method {state.instance.requestPaymentMethod()}
      const { nonce } = await state.instance.requestPaymentMethod();

      // send nonce (card type, card number, etc..) as 'paymentMethodNonce'
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getCartItemTotal()
      }

      const response = await processPayment(userId, token, paymentData)

      console.log('RESPONSE: ', response)

      // check for errors
      if (response.error) {
        return setState({...state, error: response.statusText});
      }

      setState({...state, success: response.success})

      // empty cart and redirect user to shop page
      emptyCart(() => setState({...state, redirectUser: true, loading: false }))
      /**
       * TODO
       * - empty cart
       * - create an order
       */

    } catch (error) {
      console.log(`Checkout:buy=>>> Failed to load products by arrival: ${error}`)
      setState({...state, error, loading: false })
    }
  }

  const showLoading = (loading: boolean) => (loading && <h2>Loading...</h2>)

  // show credit card payment UI from braintree
  const showDropIn = () => (
    <div onBlur={() => setState({...state, error: ""})}>
      { 
      
        (state.clientToken !== null && products.length > 0) ? (
          <React.Fragment>
            <DropIn 
              options={{
                authorization: state.clientToken.clientToken,
                paypal: { flow: "vault" }
              }}
              onInstance={(instance: any) => state.instance = instance } 
            />

            <button onClick={buy} className="btn btn-success btn-block">Pay now </button>
          </React.Fragment>
        ) : null
      }
    </div>
  )

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
    return isAuthenticated() ? showDropIn() :
    (<Link to="/login">
      <button className="btn btn-success">Login to checkout</button>
    </Link>)
  }

  const redirectUser = () => {
    if (state.redirectUser) {
      return  <Redirect to='/shop' />
    }
  }

  return (
    <div>
      <h2>Total: £{getCartItemTotal()}</h2>
      {showLoading(state.loading)}
      <div>

        {
          state.success ? <Alert status={AlertEnum.SUCCESS} message={`successfully processed payment!`} displayWhen={state.success}/> :
          <Alert status={AlertEnum.ERROR} message={`${state.error.message}`} displayWhen={state.error}/>  
        }

        {progressToCheckout()}
        {redirectUser()}
      </div>
    </div>
  )
}

export default Checkout