import React from 'react'
import Layout from '../../components/Layout'
import { getCategories } from '../../api/category'

const Shop: React.FunctionComponent = () => {
  const [categories, setCategories] = React.useState<any>([])
  const [error, setError] = React.useState<any>([])

  const init = async() => {
    try {
      const response = await getCategories ()

      // check for errors
      if (response.error) {
        return setError(response.statusText);
      }

      setCategories(response)

    } catch (error) {
      console.log(`init=>>> Failed to load products by sell: ${error}`)
    }
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run functions to get categories
    init()
  },[])
    

  return (
    <Layout title="Shop page" description="Search and find books of your choice">
      <div className="row">
        <div className="col-4">
          Sidebasr
          { JSON.stringify(categories)}
        </div>
        <div className="col-8">
          Content
        </div>
      </div>
    </Layout>
  )
}

export default Shop