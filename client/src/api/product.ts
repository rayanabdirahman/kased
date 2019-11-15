import { API_BASE_URL } from "../config";
// import { any } from "../domain/interfaces";

const API_CREATE_PRODUCT = `${API_BASE_URL}/product/create/`
const API_GET_PRODUCTS = `${API_BASE_URL}/product/`
const API_SEARCH_PRODUCTS = `${API_BASE_URL}/product/search`

/**
 * Create product
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 * @param { any } product - stores required product details for creating a new product
 */
export const createProduct = async(userId: string, token: string, product:  any) => {
  try {
    let response = await fetch(`${API_CREATE_PRODUCT}${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: product
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:createProduct=>>>>>> Error when creating a category: ${error}`)
  }
}

/**
 * Return a list of all products you can sortBy 
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 * @param { ICreateCategoryModel } category - stores required category details for creating a new category
 */
export const getProducts = async(sortBy: string) => {
  try {
    let response = await fetch(`${API_GET_PRODUCTS}?sortBy=${sortBy}&order=desc&limit=6`, {
      method: 'GET',
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:getProducts=>>>>>> Error when getting a list of all products: ${error}`)
  }
}

/**
 * Search products by filters
 * @param { number } skip - stores logged in user id
 * @param { number } limit - stores user bearer token
 * @param { any } filters - stores required product details for creating a new product
 */
export const searchProducts = async(skip: any, limit: any, filters = {}) => {
  try {
    const data = {
      limit, skip, filters
    }

    let response = await fetch(`${API_SEARCH_PRODUCTS}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:searchProducts=>>>>>> Error when filtering for a product: ${error}`)
  }
}