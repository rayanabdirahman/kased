import React from 'react';
import Layout from '../../components/Layout';
import { getProducts } from '../../api/product';

const HomePage: React.FunctionComponent = () => {
  const [productsBySell, setproductsBySell] = React.useState<any>([])
  const [productsByArrival, setproductsByArrival] = React.useState<any>([])
  const [error, setError] = React.useState<any>([])

  const loadProductsBySell = async() => {
    try {
      const response = await getProducts('sold')

      // check for errors
      if (response.error) {
        return setError(response.statusText);
      }

      setproductsBySell(response)

    } catch (error) {
      console.log(`loadProductsBySell=>>> Failed to load products by sell: ${error}`)
    }
  }

  const loadProductsByArrival = async() => {
    try {
      const response = await getProducts('createdAt')

      // check for errors
      if (response.error) {
        return setError(response.statusText);
      }

      setproductsByArrival(response)

    } catch (error) {
      console.log(`loadProductsByArrival=>>> Failed to load products by arrival: ${error}`)
    }
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run functions to get products by sort criteria
    loadProductsBySell()
    loadProductsByArrival()
  },[])
  
  return (
    <Layout title="Kased" description="Warehouse prices without the hassle">
      { JSON.stringify(productsByArrival)}
      <hr/>
      { JSON.stringify(productsBySell)}
    </Layout>
  )
}

export default HomePage;