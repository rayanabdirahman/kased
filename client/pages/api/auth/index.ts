import { API_BASE_URL } from "../../../utils/config";
import { ISignUpModel } from "../../../interfaces";

const API_SIGNUP = `${API_BASE_URL}/auth/signup`
// const API_LOGIN = `${API_BASE_URL}/auth/login`
// const API_LOGOUT = `${API_BASE_URL}/auth/logout`

/**
 * Register user by sending state values to backend api
 * @param name - stores state value for name
 * @param email - stores state value for email
 * @param password stores state value for password
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
