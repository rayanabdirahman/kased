import React from 'react';
import Layout from '../components/Layout';
// import { API_URL } from '../utils/config';

const SignupPage: React.FunctionComponent = () => {
  type State = {
    name: string
    email: string
    password: string
    error: string | boolean
    success: boolean
  }

  // sets initial state for component
  const initialState: State = {
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  }

  const [state, setstate] = React.useState(initialState)

  /**
   * Listens for changes on input fields
   * @param { string } name - stores form name
   * @param event - handles onChange event
   */
  const handleChange = (name: string) => (event: any) => {
    setstate({...state, error: false, [name]: event.target.value })
  }

  // form mark up
  const form = () => (
    <form>
      <div className="form-group">
        <label className="text-muted" htmlFor="">Name</label>
        <input onChange={handleChange('name')} className="form-control" type="text"/>
      </div>
  
      <div className="form-group">
        <label className="text-muted" htmlFor="">Email</label>
        <input onChange={handleChange('email')} className="form-control" type="email"/>
      </div>

      <div className="form-group">
        <label className="text-muted" htmlFor="">Password</label>
        <input onChange={handleChange('password')}className="form-control" type="password"/>
      </div>

      <button className="btn btn-primary" type="submit">Submit</button>
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