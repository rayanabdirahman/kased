import { API_BASE_URL } from "../../../utils/config";
import { ISignUpModel, ILoginModel } from "../../../interfaces";

const API_SIGNUP = `${API_BASE_URL}/auth/signup`
const API_LOGIN = `${API_BASE_URL}/auth/login`
// const API_LOGOUT = `${API_BASE_URL}/auth/logout`

/**
 * Register user by sending state values to backend api
 * @param { ISignUpModel } user - stores required user credentials for signup
 */
export const signUp = async(user: ISignUpModel) => {
  try {
    const signUpModel: ISignUpModel = {
      ...user
    }
  
    let response = await fetch(`${API_SIGNUP}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpModel)
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`SignUpPage:signUp=>>>>>> Error when signing up user: ${error}`)
  }
}

/**
 * Log user in by sending state values to backend api
 * @param { ILoginModel } user - stores required user credentials for login
 */
export const login = async(user: ILoginModel) => {
  try {
    const loginModel: ILoginModel = {
      ...user
    }
  
    let response = await fetch(`${API_LOGIN}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginModel)
    })

    return await response.json();

  } catch(error) {
    console.log(error)
    console.error(`LoginPage:login=>>>>>> Error when signing up user: ${error}`)
  }
}

/**
 * Store JWT Token in localstorage
 * @param data 
 * @param next - callback function to be executed when user credentials have been stored
 */
export const authenticate = (data: object, next: Function ) => {
  // check if local storage is available on browser
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwtToken', JSON.stringify(data))
    next()
  }
}
