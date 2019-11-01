import React from 'react'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth';
import { Link } from 'react-router-dom';

const UserDashboardPage: React.FunctionComponent = () => {
  // destructure user information from isAuthenticated response
  const {user} = isAuthenticated()
  const name = `${user.firstName} ${user.lastName}`

  const userLinks = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Links</h3>
      <ul className="list-group">
        <li className="list-group-item"> <Link to="/cart">My Cart</Link></li>
        <li className="list-group-item"><Link to="profile/update">Update profile</Link></li>
      </ul>
    </div>
  )

  const userInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">name: {user ? name : null}</li>
        <li className="list-group-item">email: {user ? user.email : null}</li>
        <li className="list-group-item">role: {user ? user.role === 1 ? 'Admin' : 'Registered USer' : null}</li>
      </ul>
    </div>
  )

  const userHistory = () => (
    <div className="card mb-5">
      <h3 className="card-header">Purchase history</h3>
      <ul className="list-group">
        <li className="list-group-item">history</li>
      </ul>
    </div>
  )

  return (
    <Layout title="User Dashboard" description={`Welcome back ${name}`} >
      <div className="row">
        <div className="col-3">
          {userLinks()}
        </div>
        <div className="col-9">
          {userInfo()}
          {userHistory()}
        </div>
      </div>

      
    </Layout>
  )
}

export default UserDashboardPage;