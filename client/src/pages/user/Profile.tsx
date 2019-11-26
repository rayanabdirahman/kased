import React from 'react'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth';
import { Link, Redirect } from 'react-router-dom';
import { readUserInformation, updateUserInformation, updateUserCookie } from '../../api/user';

interface IProps {
  match: any
}

const UserProfilePage: React.FunctionComponent<IProps> = ({ match }) => {
  // sets initial state for component
  const [state, setstate] = React.useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  // destruct required values from state
  const { 
    firstName,
    lastName,
    email,
    password,
    error,
    success
  } = state

  // destructure token from isAuthenticated response
  const { token } = isAuthenticated()

  // get user id from params
  const userId = match.params.userId

  // get user information from backend
  const onInit = async(userId: string) => {
    try {
      const response = await readUserInformation(userId, token)

      // check for errors
      if (response.error) {
        setstate({...state, error: response.error, success: false});
      }

      setstate({
        ...state,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email
      })

    } catch (error) {
      console.log(`Failed to init function on profile page: ${error}`)
    }
    
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run onInit function to fetch user information
    onInit(userId)
  },[])

  // const userLinks = () => (
  //   <div className="card mb-5">
  //     <h3 className="card-header">User Links</h3>
  //     <ul className="list-group">
  //       <li className="list-group-item"> <Link to="/cart">My Cart</Link></li>
  //       <li className="list-group-item"><Link to="/profile/update">Update profile</Link></li>
  //     </ul>
  //   </div>
  // )

  // const userInfo = () => (
  //   <div className="card mb-5">
  //     <h3 className="card-header">User Information</h3>
  //     <ul className="list-group">
  //       <li className="list-group-item">name: {user ? name : null}</li>
  //       <li className="list-group-item">email: {user ? user.email : null}</li>
  //       <li className="list-group-item">role: {user ? user.role === 1 ? 'Admin' : 'Registered USer' : null}</li>
  //     </ul>
  //   </div>
  // )

  // const userHistory = () => (
  //   <div className="card mb-5">
  //     <h3 className="card-header">Purchase history</h3>
  //     <ul className="list-group">
  //       <li className="list-group-item">history</li>
  //     </ul>
  //   </div>
  // )

  /**
   * Listens for changes on input fields
   * @param { string } name - stores form name
   * @param event - listens for onChange event
   */
  const handleChange = (name: string) => (event: any) => {
    // remove any erros when user starts typing
    setstate({ ...state, error: false, [name]: event.target.value})
  }

  /**
   * Listens for form submitions
   * Passes required signup fields to signUp function
   * @param event - listens for onClcik event
   */
  const handleSubmit = async(event: any) => {
    try {
      // prevent default event behaviour
      event.preventDefault()

      // setstate({...state, error: '', loading: true})

      // // pass updated values to backend api
      const response = await updateUserInformation(userId, token, 
        {
          firstName,
          lastName,
          email,
          password
        }
      )

      // check for errors
      if (response.error) {
        setstate({...state, error: response.error, success: false});
      }

      // update user information in cookie
      updateUserCookie(response, () => {
        // update state with the new values
        setstate({
          ...state,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          success: true
        })
      })

    } catch(error) {
      console.error(`CreateProductPage:handleSubmit=>>>>>> Error when submiting product info: ${error}`)
    }
  }

  const redirectUser = (success: boolean) => {
    if (success) {
      return <Redirect to="/shop" />
    }
  }

  // form mark up
  const form = () => (
    <form className="mb-3">
      <div className="form-group">
        <label className="text-muted" htmlFor="">First Name</label>
        <input onChange={handleChange('firstName')} value={firstName} className="form-control" type="text" />
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">Last Name</label>
        <input onChange={handleChange('lastName')} value={lastName} className="form-control" type="text" />
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">Email</label>
        <input onChange={handleChange('email')} value={email} className="form-control" type="email" />
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">Password</label>
        <input onChange={handleChange('password')} value={password} className="form-control" type="password" />
      </div> 

      <button onClick={handleSubmit} className="btn btn-primary" type="submit">Update profile</button>
    </form>
  )

  return (
    <Layout title="User Profile page" description={`Update your profile`} >
      {/* <div className="row">
        <div className="col-3">
          {userLinks()}
        </div>
        <div className="col-9">
          {userInfo()}
          {userHistory()}
        </div>
      </div> */}
      <h2 className="mb-4">Profile update</h2>
      {form()}
      {redirectUser(success)}

      
    </Layout>
  )
}

export default UserProfilePage;