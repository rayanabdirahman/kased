import React from 'react';

interface IProps {
  categories: any
  handleFilters: Function
}

const Checkbox: React.FunctionComponent<IProps> = ({ categories, handleFilters }) => {
  const [checked, setChecked] = React.useState<any>([])

  const handleToggle = (categoryId: any) => () => {
    // check if checked category has been registred to state already by searching for category Id
    const currentCategoryId = checked.indexOf(categoryId) // return -1 if categoryId does not exist in state
    const newCheckedCategoryId = [...checked]

    // push new checked category into state if it is not there already
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(categoryId)
    } else {
      // else remove category from state if it is there
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }

    // set state with new checked items
    setChecked(newCheckedCategoryId)

    // send checked filters to parent component
    handleFilters(newCheckedCategoryId)
  }

  return (
    categories.map((category: any, index: number) => (
      <li key={`category-checkbox--${index}`} className={`list-unstyled`}>
        <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} type="checkbox" className="fomr-check-input"/>
        <label className="form-check-label">{category.name}</label>
      </li>
    ))
  )
}


export default Checkbox