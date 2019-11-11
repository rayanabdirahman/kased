import React from 'react'
import { isAuthenticated } from '../../api/auth'
import Layout from '../../components/Layout'
import { createProduct } from '../../api/product'
import Alert from "../../components/Alert"
import { AlertEnum } from '../../domain/enums'
import { Link } from 'react-router-dom'
import { getCategories } from '../../api/category'

const ProductPage: React.FunctionComponent = () => {
  // sets initial state for component
  const [state, setstate] = React.useState<any>({
    name: '',
    description: '',
    price: '',
    category: '',
    categories: [],
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
    categories,
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

  // get a list of all categories and set formData
  const onInit = async() => {
    try {
      const response = await getCategories()

      // check for errors
      if (response.error) {
        setstate({...state, error: response.error, success: false});
        throw new Error(response.statusText);
      }

      setstate({...state, categories: response, formData: new FormData()})

    } catch (error) {

    }
    
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run onInit function to get list of categories and to set formData
    onInit()
  },[])

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
      event.preventDefault()

      setstate({...state, error: '', loading: true})

      // pass state values to backend api
      const response = await  createProduct(user._id, token, formData)

      // check for errors
      if (response.error) {
        setstate({...state, error: response.error, success: false});
        throw new Error(response.statusText);
      }

      setstate({...state, photo: '', name: '', description:'', email: '', price: '', quantity: '', loading: false, createdProduct: response.name })

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

          {
            // check if categories array is filled
            categories && categories.map((category: any, index: number) => (
              <option key={`category--${index}`} value={category._id}>{category.name}</option>
            ))
          }
        </select>
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">shipping</label>
        <select onChange={handleChange('shipping')} className="form-control">
          <option value="">Select shipping</option>
          <option value="false">no</option>
          <option value="true">yes</option>
        </select>
      </div> 

      <div className="form-group">
        <label className="text-muted" htmlFor="">quantity</label>
        <input onChange={handleChange('quantity')} value={quantity} className="form-control" type="number" />
      </div> 

      <button className="btn btn-primary" type="submit">Create product</button>
    </form>
  )




  return (
    <Layout title="Add new product Page" description={`Welcome back ${user.firstName}, ready to add a new product`} >
      <div className="row">
        <div className="col-md-8 offset-md-2">

          {
            loading? <Alert status={AlertEnum.INFO} message={`Loading...`} displayWhen={loading}/> : null
          }

          {
            createdProduct ? <Alert status={AlertEnum.SUCCESS} message={`Product ${name} was successfully created!`} displayWhen={createdProduct}/>
            : <Alert status={AlertEnum.ERROR} message={`${error}`} displayWhen={error}/> 
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

export default ProductPage