import React from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { ILoginState, ILoginModel, AlertEnum } from '../interfaces';
import { login } from './api/auth';
import Alert from '../components/Alert';

const LoginPage: React.FunctionComponent = () => {
  // sets initial state for component
  const [state, setstate] = React.useState<ILoginState>({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  })

  // destruct required values from state
  const { email, password, error, loading, redirectToReferrer } = state;

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
   * Passes required login fields to login function
   * @param event - listens for onClcik event
   */
  const handleSubmit = async(event: any) => {
    try {
      // prevent default event behaviour
      event.preventDefault();

      // set error state to false
      setstate({...state, error: false, loading: true})

      // stores state values
      const loginModel: ILoginModel = {
        email,
        password
      }

      // pass state values to backend api
      const response = await login({...loginModel});

      // check for errors
      if (response.error) {
        setstate({...state, error: response.error, loading: false});
        throw new Error(response.statusText);
      }

      setstate({...state, redirectToReferrer: true})

    } catch(error) {
      console.error(`LoginPage:handleSubmit=>>>>>> Error when submiting user info: ${error}`)
    }
  }

  const redirectUser = () => {
    if (redirectToReferrer) {
      Router.replace('/')
    }
  }

  // form mark up
  const form = () => (
    <form>
      <div className="form-group">
        <label className="text-muted" htmlFor="">Email</label>
        <input onChange={handleChange('email')} value={email} className="form-control" type="email" autoComplete="username"/>
      </div>

      <div className="form-group">
        <label className="text-muted" htmlFor="">Password</label>
        <input onChange={handleChange('password')} value={password} className="form-control" type="password" autoComplete="current-password" />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary" type="submit">Submit</button>
    </form>
  )


  return (
    <Layout title="Login| Next.js + TypeScript Example">
      <h1>Login page</h1>

      {
        error ? <Alert status={AlertEnum.ERROR} message={error} displayWhen={error}/> 
        : <Alert status={AlertEnum.INFO} message="Loading content! User successfully logged in" displayWhen={loading}/>
      }

      {form()}
      {redirectUser()}
    </Layout>
  )
}

export default LoginPage