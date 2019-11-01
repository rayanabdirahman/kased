import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

interface IProps {
  component?: any,
  rest?: any,
  path?: any,
  exact?: any
}

const AdminRoute:React.FunctionComponent<IProps> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated() && isAuthenticated().user.role === 1) ? (
    <Component {...props} />
  ) : (
    <Redirect to={{pathname: '/login', state:{from: props.location}}} />
  )}/>
)

export default AdminRoute