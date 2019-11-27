import React from 'react';

const sellingPoints = [
  {
    icon: `${process.env.PUBLIC_URL}/icons/package.svg`,
    header: 'Big sizes mean bigger savings',
    subtitle: 'Shop all your favourite brands, in bulk'
  },
  {
    icon: `${process.env.PUBLIC_URL}/icons/card.svg`,
    header: 'No membership fees',
    subtitle: 'No minimum spend or contracts required'
  },
  {
    icon: `${process.env.PUBLIC_URL}/icons/truck.svg`,
    header: 'We deliver in bulk for free',
    subtitle: 'Free shipping on orders £100 or more'
  }
]

const SellingPoints: React.FunctionComponent = () => (
  <section className="selling-points">
    <div className="container">
      <ul className="list">
        {
          sellingPoints.map((points: any, index: number) => (
            <li className="list-item">
              <img className="list-icon" src={points.icon} />
              <h5 className="display-5">{points.header}</h5>
              <p className="lead">{points.subtitle}</p>
            </li>
          ))
        }
      </ul>
    </div>
  </section>
)

export default SellingPoints