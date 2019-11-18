import React from 'react';
import { getCategories } from '../api/category';

interface IProps {
  // prices: any
  // handleFilters: Function
}

const Search: React.FunctionComponent<IProps> = () => {
  const [state, setState] = React.useState<any>({
    categories: [],
    category: '',
    search: ' ',
    results: [],
    searched: false
  })

  const {categories, category, search, results, searched} = state;

  // const handleChange = (event: any) => {
  //   // send onChange value to parent component
  //   handleFilters(event.target.value)

  //   // update state to show current checked radio
  //   setValue(event.target.value)
  // }

  const loadCategories  = async() => {
    try {
      const response = await getCategories()

      // check for errors
      if (response.error) {
        console.error(` loadCategories=>>> Failed to load categories: ${response.error}`)
        // return setError(response.statusText);
      }

      setState({...state, categories: response})

    } catch (error) {
      console.log(` loadCategories=>>> Failed to load categories: ${error}`)
    }
  }

  // lifecycle method to run everytime the component mounts
  React.useEffect(() => {
    // run functions to get products by sort criteria
    loadCategories()
    // loadProductsByArrival()
  },[])

  return (
    <div>
<h2>Search bar: {JSON.stringify(categories)} </h2>
    </div>
  )
}


export default Search