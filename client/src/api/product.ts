import { API_BASE_URL } from "../config";
// import { any } from "../domain/interfaces";

const API_CREATE_PRODUCT = `${API_BASE_URL}/product/create/`

/**
 * Create category
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 * @param { any } product - stores required product details for creating a new product
 */
export const createProduct = async(userId: string, token: string, product:  any) => {
  try {
    // const createProductModel: any = {
    //   ...product
    // }

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