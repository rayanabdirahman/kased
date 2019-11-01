import React from 'react'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth';

const UserDashboardPage: React.FunctionComponent = () => {
  // destructure user information from isAuthenticated response
  const {user} = isAuthenticated();

  return (
    <Layout title="User Dashboard | Next.js + TypeScript Example" description="User Dashboard to get the best deals" >
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">name: {user ? user.firstName : null} {user ? user.lastName : null}</li>
          <li className="list-group-item">email: {user ? user.email : null}</li>
          <li className="list-group-item">role: {user ? user.role === 1 ? 'Admin' : 'Registered USer' : null}</li>
        </ul>
      </div>

      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">history</li>
        </ul>
      </div>
    </Layout>
  )
}

export default UserDashboardPage;