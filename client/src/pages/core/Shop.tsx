import React from 'react'
import Layout from '../../components/Layout'
import { getCategories } from '../../api/category'
import Checkbox from '../../components/Checkbox'

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

  const handleFilters = (filters: Array<string>, filterBy: string) => {
    console.log(`SHOP::: filters: ${filters} ------- filterBy: ${filterBy}`)
  }
    

  return (
    <Layout title="Shop page" description="Search and find books of your choice">
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox categories={categories} handleFilters={ (filters: Array<string>) => handleFilters(filters, 'category')}/>
          </ul>
        </div>
        <div className="col-8">
          Content
        </div>
      </div>
    </Layout>
  )
}

export default Shop