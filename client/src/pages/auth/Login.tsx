import React from 'react';
import Layout from '../../components/Layout';
import Alert from "../../components/Alert";
import { ILoginState, ILoginModel } from '../../domain/interfaces';
import { login, authenticate, isAuthenticated } from '../../api/auth';
import { AlertEnum } from '../../domain/enums';
import { Redirect } from 'react-router';

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

  // destructure user information from isAuthenticated response
  const { user } = isAuthenticated();

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

      // store user JWT credentials in localstorage
      authenticate(response, () => {
        setstate({...state, redirectToReferrer: true})
      })

    } catch(error) {
      console.error(`LoginPage:handleSubmit=>>>>>> Error when submiting user info: ${error}`)
    }
  }

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />
      }
      
      return  <Redirect to='/user/dashboard' />
    }

    if (isAuthenticated()) {
      return  <Redirect to='/' />
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
  <Layout title="Login Page" description="Login description">
    {
      error ? <Alert status={AlertEnum.ERROR} message={error} displayWhen={error}/> 
      : <Alert status={AlertEnum.INFO} message="Loading content! User successfully logged in" displayWhen={loading}/>
    }
    
    {form()}
    {redirectUser()}
  </Layout>
  )
}

export default LoginPage;