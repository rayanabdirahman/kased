import { API_BASE_URL } from "../config";

const API_CREATE_ORDER = `${API_BASE_URL}/order/create`
const API_GET_ORDERS = `${API_BASE_URL}/order`

/**
 * Create order
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 * @param { any } order - stores required order details for creating a new order
 */
export const createOrder = async(userId: string, token: string, order:  any) => {
  try {
    let response = await fetch(`${API_CREATE_ORDER}/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ order })
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:createOrder=>>>>>> Error when creating a order: ${error}`)
  }
}

/**
 * Return a list of all orders
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 */
export const getOrders = async(userId: string, token: string,) => {
  try {
    let response = await fetch(`${API_GET_ORDERS}/${userId}`, {
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
    console.error(`API CALL:getCategories=>>>>>> Error when getting a list of all categories: ${error}`)
  }
}