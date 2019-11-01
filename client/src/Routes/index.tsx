import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/Login';
import SignupPage from '../pages/auth/Signup';
import HomePage from '../pages/core/Home';
import PrivateRoute from './private.route';
import UserDashboardPage from '../pages/user/Dashboard';
import AdminDashboardPage from '../pages/admin/Dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/login" exact component={LoginPage}></Route>
        <Route path="/signup" exact component={SignupPage}></Route>
        <PrivateRoute path="/user/dashboard" exact component={UserDashboardPage} />
        <PrivateRoute path="/admin/dashboard" exact component={AdminDashboardPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;