import { isAuthenticated } from '.';
import Router from 'next/router';

const PrivateRoute = (component: any) => {
  if (isAuthenticated()) {
    return component
  }

  Router.replace('/login')
}

export default PrivateRoute;