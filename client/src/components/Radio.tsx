import React from 'react';

interface IProps {
  prices: any
  handleFilters: Function
}

const Radio: React.FunctionComponent<IProps> = ({ prices, handleFilters }) => {
  const [value, setValue] = React.useState<any>(0)

  // const handleToggle = (categoryId: any) => () => {
  //   // check if checked category has been registred to state already by searching for category Id
  //   const currentCategoryId = checked.indexOf(categoryId) // return -1 if categoryId does not exist in state
  //   const newCheckedCategoryId = [...checked]

  //   // push new checked category into state if it is not there already
  //   if (currentCategoryId === -1) {
  //     newCheckedCategoryId.push(categoryId)
  //   } else {
  //     // else remove category from state if it is there
  //     newCheckedCategoryId.splice(currentCategoryId, 1)
  //   }

  //   // set state with new checked items
  //   setChecked(newCheckedCategoryId)

  //   // send checked filters to parent component
  //   handleFilters(newCheckedCategoryId)
  // }

  const handleChange = () => () => {}

  return (
    prices.map((price: any, index: number) => (
      <div key={`price-radio--${index}`}>
        <input onChange={handleChange()} value={price._id} type="radio" className="mr-2 ml-4"/>
        <label className="form-check-label">{price.name}</label>
      </div>
    ))
  )
}


export default Radio