// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export enum AlertEnum {
  SUCCESS = 'success',
  ERROR = 'danger',
  INFO = 'info'
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