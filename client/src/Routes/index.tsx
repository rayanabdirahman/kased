import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/Login';
import SignupPage from '../pages/auth/Signup';
import HomePage from '../pages/core/Home';
import PrivateRoute from './private.route';
import AdminRoute from './admin.route';
import UserDashboardPage from '../pages/user/Dashboard';
import AdminDashboardPage from '../pages/admin/Dashboard';
import CategoryPage from '../pages/admin/Category';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/login" exact component={LoginPage}></Route>
        <Route path="/signup" exact component={SignupPage}></Route>
        <PrivateRoute path="/user/dashboard" exact component={UserDashboardPage} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboardPage} />
        <AdminRoute path="/create/category" exact component={CategoryPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;