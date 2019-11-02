import React from 'react'
// import { ICreateCategoryState } from '../../domain/interfaces'
// import { isAuthenticated } from '../../api/auth'
import Layout from '../../components/Layout'
// import Alert from "../../components/Alert"
// import { AlertEnum } from '../../domain/enums'

const CategoryPage: React.FunctionComponent = () => {
  // sets initial state for component
  // const [state, setstate] = React.useState<ICreateCategoryState>({
  //   name: '',
  //   error: '',
  //   success: false
  // })
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)

  // destructure user and token information from isAuthenticated response
  // const { user, token } = isAuthenticated()

  /**
   * Listens for changes on input fields
   * @param event - listens for onChange event
   */
  const handleChange = () => (event: any) => {
    // setstate({...state, error: false, [name]: event.target.value })
    // Remove any errors on form fields when user starts typing
    setError('')
    console.log(error);

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
    console.log(success);
  }

  // form mark up
  const form = () => (
    <form>
      <div className="form-group">
        <label className="text-muted" htmlFor="">Name</label>
        <input onChange={handleChange} value={name} className="form-control" type="text" />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary" type="submit">Create Category</button>
    </form>
  )

  return (
    <Layout title="Create Category Page" description={`Welcome back ${name}, ready to add a new category`} >
    <div className="row">
      <div className="col-md-8 offset-md-2">
        {form()}
      </div>
    </div>
    </Layout>
  )



}

export default CategoryPage;