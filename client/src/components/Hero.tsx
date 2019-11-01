import React from 'react';

interface Props {
  title?: string,
  description?: string
}

const Hero: React.FunctionComponent<Props> = ({ title, description }) => (
  <div className="jumbotron">
    <h1 className="display-4">{title}</h1>
    <p className="lead">{description}</p>
  </div>
)

export default Hero;
