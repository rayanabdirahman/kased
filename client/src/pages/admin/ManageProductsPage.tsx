import React from 'react'
import { isAuthenticated } from '../../api/auth'
import Layout from '../../components/Layout'
import { getProducts, removeProduct } from '../../api/product'
import Alert from "../../components/Alert"
import { AlertEnum } from '../../domain/enums'
import { Link } from 'react-router-dom'
import { getCategories } from '../../api/category'

const ManageProductsPage: React.FunctionComponent = () => {
  // sets initial state for component
  const [products, setProducts] = React.useState<any>([])
  const [error, setError] = React.useState<any>(false)

  // destructure user and token information from isAuthenticated response
  const { user, token } = isAuthenticated()

  const loadProducts = async() => {
    try {
      const response = await getProducts()

      // check for errors
      if (response.error) {
        return setError(response.statusText);
      }

      setProducts(response)

    } catch (error) {
      console.log(`loadProducts=>>> Failed to load products: ${error}`)
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      const response = await removeProduct(productId, user._id, token)

      // check for errors
      if (response.error) {
        return setError(response.statusText);
      }

      // load new batch of products
      loadProducts()

    } catch (error) {
      console.log(`deleteProduct=>>> Failed to delete product: ${error}`)
    }
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run loadProducts function to get list of all products
    loadProducts()
  },[])

  return (
    <Layout title="Manage products" description={`Welcome back ${user.firstName}`} >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total products: {products.length}</h2>
          <hr />
          <ul className="list-group">
            {products.map((product: any, index: number) => (
              <li key={`manage-product--${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{product.name}</strong>
                <Link to={`/admin/product/update/${product._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                  <span onClick={() => deleteProduct(product._id)} className="badge badge-danger badge-pill">Delete</span>
                </Link>
              </li>
            ))}


          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default ManageProductsPage