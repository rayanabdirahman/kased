export interface ILoginState {
  email: string
  password: string
  error: string | boolean
  loading: boolean
  redirectToReferrer: boolean,
}

export interface ILoginModel {
  email: string
  password: string
}

export interface ISignUpModel {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ISignUpState {
  firstName: string
  lastName: string
  email: string
  password: string
  error: string | boolean
  success: boolean
}

export interface ICreateCategoryState {
  name: string
  error: string | boolean
  success: boolean
}