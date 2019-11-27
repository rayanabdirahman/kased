import React from 'react';

interface Props {
  title?: string,
  description?: string
}

const Hero: React.FunctionComponent<Props> = ({ title, description }) => (
  <div className="jumbotron">
    <div className="container">
      {/* <h1 className="display-4">{title}</h1>
      <p className="lead">{description}</p> */}
      <h1 className="display-4 hero-header">Bulk shopping made easy</h1>
      <p className="lead hero-lead">Shop all your favourite brands, in bulk, and we’ll deliver them straight to your door</p>
    </div>
  </div>
)

export default Hero;
