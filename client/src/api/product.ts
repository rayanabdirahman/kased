import { API_BASE_URL } from "../config";
import queryString from 'querystring';
// import { any } from "../domain/interfaces";

const API_CREATE_PRODUCT = `${API_BASE_URL}/product/create`
const API_GET_PRODUCTS = `${API_BASE_URL}/product`
const API_SEARCH_PRODUCTS = `${API_BASE_URL}/product/search`
const API_LISTSEARCH_PRODUCTS = `${API_BASE_URL}/product/listsearch`
const API_RELATED_PRODUCTS = `${API_BASE_URL}/product/related`

/**
 * Create product
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 * @param { any } product - stores required product details for creating a new product
 */
export const createProduct = async(userId: string, token: string, product:  any) => {
  try {
    let response = await fetch(`${API_CREATE_PRODUCT}/${userId}`, {
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
export const getProductsToSort = async(sortBy: string) => {
  try {
    let response = await fetch(`${API_GET_PRODUCTS}/?sortBy=${sortBy}&order=desc&limit=6`, {
      method: 'GET',
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:getProductsToSort=>>>>>> Error when getting a list of all products: ${error}`)
  }
}

/**
 * Return a single product using Id
 * @param { string } productId - stores product id
 */
export const getProduct = async(productId: string) => {
  try {
    let response = await fetch(`${API_GET_PRODUCTS}/${productId}`, {
      method: 'GET',
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:getProduct=>>>>>> Error when getting a single product: ${error}`)
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

/**
 * Return a list of all products you can sortBy 
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 * @param { ICreateCategoryModel } category - stores required category details for creating a new category
 */
export const listProducts = async(params: any) => {
  try {
    const query = queryString.stringify(params)
    console.log('paframs: ', query)
    let response = await fetch(`${ API_LISTSEARCH_PRODUCTS}?${query}`, {
      method: 'GET',
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:listProducts=>>>>>> Error when getting a list of all products: ${error}`)
  }
}

/**
 * Return a list of all related products
 * @param { string } productId - stores product id
 */
export const getRelatedProducts = async(productId: string) => {
  try {
    let response = await fetch(`${API_RELATED_PRODUCTS}/${productId}`, {
      method: 'GET',
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:getRelatedProducts=>>>>>> Error when getting a list of all products: ${error}`)
  }
}

/**=================================================
 * Admin routes to perform CRUD
=================================================*/

// Return a list of all products
export const getProducts = async() => {
  try {
    let response = await fetch(`${API_GET_PRODUCTS}?limit=undefined`, {
      method: 'GET',
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:getProducts=>>>>>> Error when getting a list of all products: ${error}`)
  }
}

/**
 * Delete product
 * @param { string } productId - stores product id
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 */
export const removeProduct = async(productId: string, userId: string, token: string) => {
  try {
    let response = await fetch(`${API_GET_PRODUCTS}/${productId}/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:removeProduct=>>>>>> Error when deleting a product: ${error}`)
  }
}

/**
 * Update product
 * @param { string } productId - stores product id
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 * @param { any } product - stores updated product information
 */
export const updateProduct = async(productId: string, userId: string, token: string, product: any) => {
  try {
    let response = await fetch(`${API_GET_PRODUCTS}/${productId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: product
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:updateProduct=>>>>>> Error when updating a product: ${error}`)
  }
}