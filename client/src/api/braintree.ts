import { API_BASE_URL } from "../config";

const API_BRAINTREE_CLIENT_TOKEN = `${API_BASE_URL}/braintree/token`
const API_BRAINTREE_PAYMENT = `${API_BASE_URL}/braintree/payment`

/**
 * Get braintree client token from backend
 */
export const getBraintreeClientToken = async(userId: string, token: string) => {
  try {
    // make API request to log user out
    let response = await fetch(`${API_BRAINTREE_CLIENT_TOKEN}/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`getBraintreeClientToken:=>>>>>> Error when retrieving braintree client token: ${error}`)
  }
}

/**
 * Process payment
 * @param userId - store user id
 * @param token - store user token
 * @param data - store payment data
 */
export const processPayment = async(userId: string, token: string, data: any) => {
  try {
    // make API request to process payment
    let response = await fetch(`${API_BRAINTREE_PAYMENT}/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`processPayment:=>>>>>> Error when processing payments: ${error}`)
  }
}
