import { API_BASE_URL } from "../config";

const API_BRAINTREE_CLIENT_TOKEN = `${API_BASE_URL}/braintree/token`

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
