import React from 'react'
import Layout from '../../components/Layout'
import { getProduct } from '../../api/product'

interface IProps {
  match: any
}

const ProductPage: React.FunctionComponent<IProps> = (props) => {
  // sets initial state for component
  const [product, setProduct] = React.useState<any>({})
  const [error, setError] = React.useState<any>(false)

  const loadProduct = async(productId: string) => {
    try {
      const response = await getProduct(productId)

      // check for errors
      if (response.error) {
        setError(response.statusText);
      }

      setProduct(response)

    } catch (error) {
      console.log(`loadProduct>>>Failed load product: ${error}`)
    }
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // get product id from route
    const productId = props.match.params.productId;
    loadProduct(productId)
  },[])

  return (
    <Layout title="Product Page" description={`Welcome to product page`} >
      <h2 className="mb-4">Single Product</h2>
      <div className="row">
        { JSON.stringify(product) }
      </div>
    </Layout>
  )
}

export default ProductPage