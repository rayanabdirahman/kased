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

  const handleSubmit = (event: any) => {
    // send onChange value to parent component
    // handleFilters(event.target.value)

    // update state to show current checked radio
    // setValue(event.target.value)
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
    // setstate({...state, error: false, [name]: value })
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

  return (
    <div className="row">
      <div className="container mb-3">
        {form()}
      </div>
    </div>
  )
}


export default Search