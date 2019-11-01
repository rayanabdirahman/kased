import { isAuthenticated } from '.';

const PrivateRoute = (component: any, noAuthComponent: any) => {
  if (isAuthenticated()) {
    return component
  }

  return ( noAuthComponent )
}

export default PrivateRoute;