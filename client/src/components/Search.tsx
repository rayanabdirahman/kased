import React from 'react';
import { getCategories } from '../api/category';
import { listProducts } from '../api/product';
import Card from './Card';

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

  const searchedResults = async() => {
    try { 
      if(search) {
        const response = await listProducts({ search: search || undefined, category });

        // check for errors
        if (response.error) {
          console.error(`searchedResults=>>> Failed to list products: ${response.error}`)
          // setState({...state, error: response.error, success: false});
          // throw new Error(response.statusText);
        }

        setState({...state, results: response.products, searched: true})
      }
    } catch(error) {
      console.log(`searchedResults=>>> Failed to list products: ${error}`)
    }
  }

  /**
   * Listens for form submitions
   * Passes required fields to create categories function
   * @param event - listens for onClcik event
   */
  const handleSubmit = async(event: any) => {
    // prevent default event behaviour
    event.preventDefault();

    searchedResults()

    // Reset error state on form when user submits
    // setError('')
    // setSuccess(false)

    // pass user details and category state values to backend api
    // const response = await createCategory(user._id, token, { name });

    // check for errors
    // if (response.error) {
    //   return setError(response.error);
    // }

    // // if user is able to create category set Error empty and success true
    // setError('')
    // setSuccess(true)
  }

  /**
   * Listens for changes on input fields
   * @param { string } name - stores form name
   * @param event - listens for onChange event
   */
  const handleChange = (name: string) => (event: any) => {
    // check if photo is being uploaded before setting state
    // const value = name === 'photo' ? event.target.files[0] : event.target.value

    // set formData values
    // formData.set(name, value)

    // set state
    setState({...state, [name]: event.target.value, searched: false})
  }

  // form mark up
  const form = () => (
    <form className="mb-3" onSubmit={handleSubmit}>
      <span className="input-group-text">
        <div className="input-group-prepend">
          <select className="btn mr-2" onChange={handleChange('category')}>
            <option value="All">Select category</option>
            {
              // check if categories array is filled
              categories && categories.map((category: any, index: number) => (
                <option key={`search-category--${index}`} value={category._id}>{category.name}</option>
              ))
            }

          </select>
        </div>


        <div className="input-group input-group-lg">
          <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Search by name"/>
        </div>

        <div className="btn input-group-append" style={{border:'none'}}>
          <button className="input-group-text">Search </button>
        </div>
      </span>
    </form>
  )

  const displaySearchedProducts = (results: any = []) => (
    <div className="row">
      {
        results.map((result: any, index: number) => (<Card key={`search-product-card--${index}`} product={result}/>) )
      }
    </div>
  )

  return (
    <div className="row">
      <div className="container mb-3">
        {form()}
      </div>

      <div className="container-fluid mb-3">
        {displaySearchedProducts(results)}
      </div>
    </div>
  )
}


export default Search