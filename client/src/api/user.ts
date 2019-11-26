import { API_BASE_URL, JWT_COOKIE_NAME } from "../config";

const API_USER_ROUTE = `${API_BASE_URL}/user/`

/**
 * Read user information
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 */
export const readUserInformation = async(userId: string, token: string) => {
  try {
    let response = await fetch(`${API_USER_ROUTE}/${userId}`, {
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
    console.error(`API CALL:readUserInformation=>>>>>> Error when reading user information: ${error}`)
  }
}

/**
 * Update user information
 * @param { string } userId - stores logged in user id
 * @param { string } token - stores user bearer token
 * @param { any } userInformation - stores information to update user profile with
 */
export const updateUserInformation = async(userId: string, token: string, userInformation: any) => {
  try {
    let response = await fetch(`${API_USER_ROUTE}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userInformation)
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`API CALL:updateUserInformation=>>>>>> Error when updating user information: ${error}`)
  }
}

/**
 * Update user information in cookie
 * @param { any } data - stores updated user information
 * @param { Function } next - stores callback function
 */
export const updateUserCookie = (data: object, next: Function) => {
  if (typeof window !== 'undefined') {
    // check if user details is stored in localstorage
    if (localStorage.getItem(JWT_COOKIE_NAME)) {
      // update user information stored in cookie
      const auth = JSON.parse(`${localStorage.getItem(JWT_COOKIE_NAME)}`)
      auth.user = data
      localStorage.setItem(JWT_COOKIE_NAME, JSON.stringify(auth))
      next()
    }
  }
}
