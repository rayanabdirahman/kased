import React from 'react';
import Layout from '../components/Layout';
import PrivateRoute from './api/auth/privateRoute';

const UserDashboardPage: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      { 
        PrivateRoute(
          <Layout title="User Dashboard | Next.js + TypeScript Example" heroTitle="User Dashboard" description="User Dashboard to get the best deals" ></Layout>
        ) 
      }
    </React.Fragment>
  )
}

export default UserDashboardPage;