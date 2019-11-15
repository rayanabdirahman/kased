import React from 'react'
import Layout from '../../components/Layout'
import { getCategories } from '../../api/category'
import Checkbox from '../../components/Checkbox'
import Radio from '../../components/Radio'
import prices from '../../domain/prices'
import { searchProducts } from '../../api/product'

const Shop: React.FunctionComponent = () => {
  const [categories, setCategories] = React.useState<any>([])
  const [myFilters, setMyFilters] = React.useState<any>({
    filters: { category: [], price: [] }
  })

  const [error, setError] = React.useState<any>([])
  const [limit, setLimit] = React.useState<any>(6)
  const [skip, setSkip] = React.useState<any>(0)
  const [filteredResults, setFilteredResults] = React.useState<any>(0)

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


  const loadFilteredResults = async (filters: any) => {
    try {
      const response = await searchProducts(skip, limit, filters)

      // check for errors
      if (response.error) {
        return setError(response.statusText)
      }
  
      return setFilteredResults(response)

    } catch (error) {
      console.log(`loadFilteredResults=>>> Failed to load filtered products: ${error}`)
    }
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run functions to get categories
    init()
  },[])

  const handleFilters = (filters: Array<string>, filterBy: string) => {
    const newFilters = {...myFilters}
    newFilters.filters[filterBy] = filters

    // check if filterBy is price
    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }

    // call backend to retrive filtered products
    loadFilteredResults(myFilters.filters)

    setMyFilters(newFilters)
  }

  const handlePrice = (value: any) => {
    const data = prices
    let array: Array<any> = []

    for (let key in data) {
      if ( data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }

    return array
  }

  return (
    <Layout title="Shop page" description="Search and find books of your choice">
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox categories={categories} handleFilters={ (filters: Array<string>) => handleFilters(filters, 'category')}/>
          </ul>

          <h4>Filter by prices</h4>
          <Radio prices={prices} handleFilters={ (filters: any) => handleFilters(filters, 'price')}/>
        </div>
        <div className="col-8">
          Content
          {JSON.stringify(filteredResults)}
        </div>
      </div>
    </Layout>
  )
}

export default Shop