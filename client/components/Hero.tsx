import React from 'react'

type Props = {
  title?: string
  description?: string
  buttonText?: string
}

const Hero: React.FunctionComponent<Props> = ({
  title,
  description,
  buttonText
}) => (
  <div className="jumbotron">
    <h1 className="display-4">{title}</h1>
    <p className="lead">{description}</p>
    <a className="btn btn-primary btn-lg" href="#" role="button">{buttonText}</a>
  </div>
);

export default Hero