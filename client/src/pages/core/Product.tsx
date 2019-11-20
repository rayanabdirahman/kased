import React from 'react'
import Layout from '../../components/Layout'
import { getProduct, getRelatedProducts } from '../../api/product'
import Card from '../../components/Card'

interface IProps {
  match: any
}

const ProductPage: React.FunctionComponent<IProps> = (props) => {
  // sets initial state for component
  const [product, setProduct] = React.useState<any>({})
  const [relatedProducts, setRelatedProducts] = React.useState<any>([])
  const [error, setError] = React.useState<any>(false)

  const loadProduct = async(productId: string) => {
    try {
      const response = await getProduct(productId)

      // check for errors
      if (response.error) {
        setError(response.statusText);
      }

      setProduct(response)

      // load related products
      loadRelatedProducts(response._id)

    } catch (error) {
      console.log(`loadProduct>>>Failed load product: ${error}`)
    }
  }

  const loadRelatedProducts = async(productId: string) => {
    try {
      const response = await getRelatedProducts(productId)

      // check for errors
      if (response.error) {
        setError(response.statusText);
      }

      setRelatedProducts(response)

    } catch (error) {
      console.log(`loadRelatedProducts>>>Failed load product: ${error}`)
    }
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // get product id from route
    const productId = props.match.params.productId;
    loadProduct(productId)
  },[props])

  return (
    <Layout title={`${product && product.name}`} description={`${product && product.description && product.description.substring(0,100)}`} >
      <h2 className="mb-4">Single Product</h2>
      <div className="row">
        <div className="col-8">
          { 
            product && product.description && <Card product={product} showViewProductButton={false} />
          }
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
            {
              relatedProducts.map((product: any, index: number) => (
                <div className="mb-3">
                  <Card key={`related-product-card--${index}`} product={product}/>
                </div>
              ))
            }
          </div>
      </div>
    </Layout>
  )
}

export default ProductPage