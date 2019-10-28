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

  const { firstName, lastName, password, email, error, success } = state;

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
  const handleSubmit = async(event: any) => {
    try {
      // prevent default event behaviour
      event.preventDefault();

      setstate({...state, error: false})

      // destructure required values from state
      const { firstName, lastName, email, password } = state;

      // pass state values to backend
      const response = await signUp({firstName, lastName, email, password});

      // check for errors
      if (response.error) {
        setstate({...state, error: response.error, success: false});
        throw new Error(response.statusText);
      }

      setstate({...state, firstName: '', lastName:'', email: '', password: '', success: true})

    } catch(error) {
      console.error(`SignUpPage:handleSubmit=>>>>>> Error when submiting user info: ${error}`)
    }
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

      return await response.json();

    } catch(error) {
      console.log(error)
      console.error(`SignUpPage:signUp=>>>>>> Error when signing up user: ${error}`)
    }
  }

  const showError = () => {
    return (
      <div className="alert alert-danger" role="alert" style={{display: error ? 'block': 'none'}}>
        { error }
      </div>
    )
  }

  const showSuccess = () => {
    return (
      <div className="alert alert-success" role="alert" style={{display: success ? 'block': 'none'}}>
        Successfully signed user up
      </div>
    )
  }

  // const showAlert = (status: string, message: string) => {
  //   if (status === 'error') {
  //     return (
  //       <div className="alert alert-danger" role="alert" style={{display: error ? '': 'none'}}>
  //         { message }
  //       </div>
  //     )
  //   }

  //   return (
  //     <div className="alert alert-success" role="alert" style={{display: success ? '': 'none'}}>
  //       { message }
  //     </div>
  //   )
  // }

  // form mark up
  const form = () => (
    <form>
      <div className="form-group">
        <label className="text-muted" htmlFor="">First Name</label>
        <input onChange={handleChange('firstName')} value={firstName} className="form-control" type="text"/>
      </div>

      <div className="form-group">
        <label className="text-muted" htmlFor="">Last Name</label>
        <input onChange={handleChange('lastName')} value={lastName} className="form-control" type="text"/>
      </div>
  
      <div className="form-group">
        <label className="text-muted" htmlFor="">Email</label>
        <input onChange={handleChange('email')} value={email} className="form-control" type="email"/>
      </div>

      <div className="form-group">
        <label className="text-muted" htmlFor="">Password</label>
        <input onChange={handleChange('password')} value={password} className="form-control" type="password"/>
      </div>

      <button onClick={handleSubmit} className="btn btn-primary" type="submit">Submit</button>
    </form>
  )

  return (    
  <Layout title="Signup | Next.js + TypeScript Example" heroTitle="Signup" description="Signup to get the best deals" >
    <h1>Signup page</h1>
    {showSuccess()}
    {showError()}
    {form()}
  </Layout>
  )
}

export default SignupPage