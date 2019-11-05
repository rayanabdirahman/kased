import React from 'react'
import { isAuthenticated } from '../../api/auth'
import Layout from '../../components/Layout'
import { createCategory } from '../../api/category'
import Alert from "../../components/Alert"
import { AlertEnum } from '../../domain/enums'
import { Link } from 'react-router-dom'

const CategoryPage: React.FunctionComponent = () => {
  // sets initial state for component
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)

  // destructure user and token information from isAuthenticated response
  const { user, token } = isAuthenticated()

  /**
   * Listens for changes on input fields
   * @param event - listens for onChange event
   */
  const handleChange = () => (event: any) => {
    // Remove any errors on form fields when user starts typing
    setError('')

    // set name state to input value
    setName(event.target.value)
  }

  /**
   * Listens for form submitions
   * Passes required fields to create categories function
   * @param event - listens for onClcik event
   */
  const handleSubmit = async(event: any) => {
    // prevent default event behaviour
    event.preventDefault();

    // Reset error state on form when user submits
    setError('')
    setSuccess(false)

    // pass user details and category state values to backend api
    const response = await createCategory(user._id, token, { name });

    // check for errors
    if (response.error) {
      return setError(response.error);
    }

    // if user is able to create category set Error empty and success true
    setError('')
    setSuccess(true)
  }

  const form = () => (
    <form>
      <div className="form-group">
        <label className="text-muted" htmlFor="">Name</label>
        <input onChange={handleChange()} value={name} className="form-control" type="text" required autoFocus/>
      </div>

      <button onClick={handleSubmit} className="btn btn-primary" type="submit">Create Category</button>
    </form>
  )

  return (
    <Layout title="Create Category Page" description={`Welcome back ${user.firstName}, ready to add a new category`} >
    <div className="row">
      <div className="col-md-8 offset-md-2">

        {
          success ? <Alert status={AlertEnum.SUCCESS} message={`Category ${name} was successfully created!`} displayWhen={success}/>
          : <Alert status={AlertEnum.ERROR} message={`Unable to create category ${name}. Category name should be unique`} displayWhen={error}/>  
        }

        {form()}

        <div className="mt-5">
          <Link to="/admin/dashboard" className="text-warning">Back to dashboad</Link>
        </div>
      </div>
    </div>
    </Layout>
  )



}

export default CategoryPage;