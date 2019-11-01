import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

interface IProps {
  component?: any,
  rest?: any,
  path?: any,
  exact?: any
}

const PrivateRoute:React.FunctionComponent<IProps> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => isAuthenticated() ? (
    <Component {...props} />
  ) : (
    <Redirect to={{pathname: '/login', state:{from: props.location}}} />
  )}/>
)

export default PrivateRoute