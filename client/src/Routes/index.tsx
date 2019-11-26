import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/Login';
import SignupPage from '../pages/auth/Signup';
import HomePage from '../pages/core/Home';
import PrivateRoute from './private.route';
import AdminRoute from './admin.route';
import UserDashboardPage from '../pages/user/Dashboard';
import UserProfilePage from '../pages/user/Profile';
import AdminDashboardPage from '../pages/admin/Dashboard';
import CreateCategoryPage from '../pages/admin/CreateCategory';
import CreateProductPage from '../pages/admin/CreateProduct';
import OrdersPage from '../pages/admin/Orders';
import Shop from '../pages/core/Shop';
import ProductPage from '../pages/core/Product';
import CartPage from '../pages/core/Cart';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/product/:productId" exact component={ProductPage}></Route>
        <Route path="/shop" exact component={Shop}></Route>
        <Route path="/cart" exact component={CartPage}></Route>
        <Route path="/login" exact component={LoginPage}></Route>
        <Route path="/signup" exact component={SignupPage}></Route>
        <PrivateRoute path="/user/dashboard" exact component={UserDashboardPage} />
        <PrivateRoute path="/profile/:userId" exact component={UserProfilePage} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboardPage} />
        <AdminRoute path="/admin/orders" exact component={OrdersPage} />
        <AdminRoute path="/create/category" exact component={CreateCategoryPage} />
        <AdminRoute path="/create/product" exact component={CreateProductPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;