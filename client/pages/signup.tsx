import React from 'react';
import Layout from '../components/Layout';
import { API_BASE_URL } from '../utils/config';

const SignupPage: React.FunctionComponent = () => {
  type State = {
    firstName: string
    lastName: string
    email: string
    password: string
    error: string | boolean
    success: boolean
  }

  interface ISignUpModel {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  // sets initial state for component
  const initialState: State = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
    success: false
  }

  const [state, setstate] = React.useState(initialState)

  /**
   * Listens for changes on input fields
   * @param { string } name - stores form name
   * @param event - listens for onChange event
   */
  const handleChange = (name: string) => (event: any) => {
    setstate({...state, error: false, [name]: event.target.value })
  }

  /**
   * Listens for form submitions
   * Passes required signup fields to signUp function
   * @param event - listens for onClcik event
   */
  const handleSubmit = (event: any) => {
    // prevent default event behaviour
    event.preventDefault();

    // destructure required values from state
    const { firstName, lastName, email, password } = state;

    // pass state values to backend
    signUp({firstName, lastName, email, password});
  }

  /**
   * Register user by sending state values to backend api
   * @param name - stores state value for name
   * @param email - stores state value for email
   * @param password stores state value for password
   */
  const signUp = async(user: ISignUpModel) => {
    try {
      const signUpModel: ISignUpModel = {
        ...user
      }
  
      const API_SIGNUP = `${API_BASE_URL}/auth/signup`
      
      let response = await fetch(`${API_SIGNUP}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpModel)
      })

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();

    } catch(error) {
      console.error(`SignUpPage:signUp=>>>>>> Error when signing up user: ${error}`)
    }
  }

  // form mark up
  const form = () => (
    <form>
      <div className="form-group">
        <label className="text-muted" htmlFor="">First Name</label>
        <input onChange={handleChange('firstName')} className="form-control" type="text"/>
      </div>

      <div className="form-group">
        <label className="text-muted" htmlFor="">Last Name</label>
        <input onChange={handleChange('lastName')} className="form-control" type="text"/>
      </div>
  
      <div className="form-group">
        <label className="text-muted" htmlFor="">Email</label>
        <input onChange={handleChange('email')} className="form-control" type="email"/>
      </div>

      <div className="form-group">
        <label className="text-muted" htmlFor="">Password</label>
        <input onChange={handleChange('password')}className="form-control" type="password"/>
      </div>

      <button onClick={handleSubmit} className="btn btn-primary" type="submit">Submit</button>
    </form>
  )

  return (    
  <Layout title="Signup | Next.js + TypeScript Example" heroTitle="Signup" description="Signup to get the best deals" >
    <h1>Signup page</h1>
    {form()}
    {JSON.stringify(state)}
  </Layout>
  )
}

export default SignupPage