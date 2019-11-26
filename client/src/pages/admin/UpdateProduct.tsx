import React from 'react'
import { isAuthenticated } from '../../api/auth'
import Layout from '../../components/Layout'
import { createProduct, getProduct, updateProduct } from '../../api/product'
import Alert from "../../components/Alert"
import { AlertEnum } from '../../domain/enums'
import { Link, Redirect } from 'react-router-dom'
import { getCategories } from '../../api/category'

interface IProps {
  match: any
}

const UpdateProductPage: React.FunctionComponent<IProps> = ({ match }) => {
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
    updatedProduct: '',
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
    updatedProduct,
    redirectToReferrer,
    formData 
  } = state

  // destructure user and token information from isAuthenticated response
  const { user, token } = isAuthenticated()

  // get product id from params
  const productId = match.params.productId

  // get a list of all categories and set formData
  const onInit = async(productId: string) => {
    try {
      const response = await getProduct(productId)

      // check for errors
      if (response.error) {
        setstate({...state, error: response.error, success: false});
      }

      // update state with product
      setstate({
        ...state,
        name: response.name,
        description: response.description,
        price: response.price,
        category: response.category._id,
        shipping: response.shipping,
        quantity: response.quantity,
        formData: new FormData()
      })

      // load categories
      loadCategories()

    } catch (error) {
      console.log(`Failed to init function on UpdateProductPage: ${error}`)
    }
    
  }

  // get a list of all categories and set formData
  const loadCategories = async() => {
    try {
      const response = await getCategories()

      // check for errors
      if (response.error) {
        setstate({error: response.error, success: false});
        throw new Error(response.statusText);
      }

      setstate({categories: response, formData: new FormData()})

    } catch (error) {
      console.log(`Failed to init function on UpdateProductPage: ${error}`)
    }
    
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run onInit function to get list of categories and product by id
    onInit(productId)
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
      const response = await  updateProduct(productId, user._id, token, formData)

      console.log(formData)

      // check for errors
      if (response.error) {
        setstate({...state, error: response.error, success: false});
        throw new Error(response.statusText);
      }

      setstate({...state, photo: '', name: '', description:'', email: '', price: '', quantity: '', loading: false, updatedProduct: response.name })

    } catch(error) {
      console.error(`UpdateProductPage:handleSubmit=>>>>>> Error when submiting product info: ${error}`)
    }
  }

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (!error) {
        return <Redirect to="/admin/products" />
      }
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

      <button className="btn btn-primary" type="submit">Update product</button>
    </form>
  )




  return (
    <Layout title="Update product" description={`Welcome back ${user.firstName}, ready to add a new product`} >
      <div className="row">
        <div className="col-md-8 offset-md-2">

          {
            loading? <Alert status={AlertEnum.INFO} message={`Loading...`} displayWhen={loading}/> : null
          }

          {
            updatedProduct ? <Alert status={AlertEnum.SUCCESS} message={`Product ${name} was successfully updated!`} displayWhen={updatedProduct}/>
            : <Alert status={AlertEnum.ERROR} message={`${error}`} displayWhen={error}/> 
          }

          {form()}
          {redirectUser()}

          <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to dashboad</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProductPage