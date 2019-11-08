import React from 'react'
import { isAuthenticated } from '../../api/auth'
import Layout from '../../components/Layout'
import { createProduct } from '../../api/product'
import Alert from "../../components/Alert"
import { AlertEnum } from '../../domain/enums'
import { Link } from 'react-router-dom'

const ProductPage: React.FunctionComponent = () => {
  // sets initial state for component
  const [state, setstate] = React.useState<any>({
    name: '',
    description: '',
    price: '',
    category: '',
    shipping: '',
    quantity: '',
    photo: ' ',
    sold: '',
    error: '',
    loading: false,
    createdProduct: '',
    redirectToReferrer: false,
    formData: ''
  })

  // destruct required values from state
  const { 
    name,
    description,
    price,
    category,
    shipping,
    quantity,
    error,
    loading,
    createdProduct,
    redirectToReferrer,
    formData 
  } = state

  // destructure user and token information from isAuthenticated response
  const { user, token } = isAuthenticated()

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    setstate({...state, formData: new FormData()}) 
  }, [])

  /**
   * Listens for changes on input fields
   * @param { string } name - stores form name
   * @param event - listens for onChange event
   */
  const handleChange = (name: string) => (event: any) => {
    // check if photo is being uploaded before setting state
    const value = name === 'photo' ? event.target.files[0] : event.target.value

    // set formData values
    formData.set(name, value)

    // set state
    setstate({...state, error: false, [name]: value })
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

    } catch(error) {
      console.error(`ProductPage:handleSubmit=>>>>>> Error when submiting product info: ${error}`)
    }
  }

  // form mark up
  const form = () => (
    <form className="mb-3" onSubmit={handleSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary" htmlFor="">
          <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted" htmlFor="">Name</label>
        <input onChange={handleChange('name')} value={name} className="form-control" type="text" />
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">description</label>
        <textarea onChange={handleChange('description')} value={description} className="form-control" />
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">price</label>
        <input onChange={handleChange('price')} value={price} className="form-control" type="number" />
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">category</label>
        <select onChange={handleChange('category')} className="form-control">
          <option value="">Select category</option>
          <option value="5dc1c4adfdb68820c8849ce1">node</option>
          <option value="5dc1c6b8fdb68820c8849ce8">python</option>
          <option value="5dc4116a732e3812038f79de">bear</option>
        </select>
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">shipping</label>
        <select onChange={handleChange('shipping')} className="form-control">
          <option value="">Select shipping</option>
          <option value="0">no</option>
          <option value="1">yes</option>
        </select>
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">quantity</label>
        <input onChange={handleChange('quantity')} value={quantity} className="form-control" type="number" />
      </div> 

      <button className="btn btn-primary" type="submit">Create product</button>

      {/* <div className="form-group">
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

      <button onClick={handleSubmit} className="btn btn-primary" type="submit">Submit</button> */}
    </form>
  )




  return (
    <Layout title="Add new product Page" description={`Welcome back ${user.firstName}, ready to add a new product`} >
      <div className="row">
        <div className="col-md-8 offset-md-2">

          {/* {
            success ? <Alert status={AlertEnum.SUCCESS} message={`Product ${name} was successfully created!`} displayWhen={success}/>
            : <Alert status={AlertEnum.ERROR} message={`Unable to add product ${name}`} displayWhen={error}/>  
          } */}

          {form()}

          <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to dashboad</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductPage