import React from 'react';

interface IProps {
  categories: any
}

const Checkbox: React.FunctionComponent<IProps> = ({ categories }) => (
  categories.map((category: any, index: number) => (
    <li key={`category-checkbox--${index}`} className={`list-unstyled`}>
      <input type="checkbox" className="fomr-check-input"/>
      <label className="form-check-label">{category.name}</label>
    </li>
  ))
)

export default Checkbox