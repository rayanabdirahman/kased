import React from 'react';
import Layout from '../../components/Layout';
import { getProductsToSort } from '../../api/product';
import Card from '../../components/Card';
import Search from '../../components/Search';
import SellingPoints from '../../components/SellingPoints';

const HomePage: React.FunctionComponent = () => {
  const [productsBySell, setproductsBySell] = React.useState<any>([])
  const [productsByArrival, setproductsByArrival] = React.useState<any>([])
  const [error, setError] = React.useState<any>([])

  const loadProductsBySell = async() => {
    try {
      const response = await getProductsToSort('sold')

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
      const response = await getProductsToSort('createdAt')

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
      <SellingPoints />

      {/* SEARCH COMPONENT */}
      {/* <Search /> */}
      {/* SEARCH COMPONENT */}

      {/* NEW ARRIVALS SECTIONS */}
      <section className="section new-arivals mb-20">
        <h5 className="font-bold mb-4">NEW ARRIVALS</h5>
        <div className="row">
          { productsByArrival.map((product: any, index: number) => (
            <div key={`new-product-card--${index}`} className="col-3 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </section>
      {/* NEW ARRIVALS SECTIONS */}

      {/* BEST SELLING SECTION */}
      <section className="section best-sellers mb-20">
        <h5 className="font-bold mb-4">BEST SELLERS</h5>
          <div className="row">
          { productsBySell.map((product: any, index: number) => (
            <div key={`best-seller-product-card--${index}`} className="col-3 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </section>
      {/* BEST SELLING SECTION */}
    </Layout>
  )
}

export default HomePage;