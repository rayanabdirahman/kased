import React from 'react';

interface IProps {
  prices: any
  handleFilters: Function
}

const Radio: React.FunctionComponent<IProps> = ({ prices, handleFilters }) => {
  const [value, setValue] = React.useState<any>(0)

  const handleChange = (event: any) => {
    // send onChange value to parent component
    handleFilters(event.target.value)

    // update state to show current checked radio
    setValue(event.target.value)
  }

  return (
    prices.map((price: any, index: number) => (
      <div key={`price-radio--${index}`}>
        <input type="radio" className="mr-2 ml-4" onChange={handleChange} value={price._id} name={price}/>
        <label className="form-check-label">{price.name}</label>
      </div>
    ))
  )
}


export default Radio