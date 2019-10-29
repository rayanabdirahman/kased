import React from 'react';
import Layout from '../components/Layout';
import { ISignUpModel, ISignUpState, AlertEnum } from '../interfaces';
import { signUp } from './api/auth';
import Alert from '../components/Alert';

const SignupPage: React.FunctionComponent = () => {
  // sets initial state for component
  const [state, setstate] = React.useState<ISignUpState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  // destruct required values from state
  const { firstName, lastName, email, password, error, success } = state;

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

      // set error state to false
      setstate({...state, error: false})

      // stores state values
      const signUpModel: ISignUpModel = {
        firstName,
        lastName,
        email,
        password
      }

      // pass state values to backend api
      const response = await signUp({...signUpModel});

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

    {
      error ? <Alert status={AlertEnum.ERROR} message={error} displayWhen={error}/> 
      : <Alert status={AlertEnum.SUCCESS} message="Successfully signed user up" displayWhen={success}/>
    }

    {form()}
  </Layout>
  )
}

export default SignupPage