import React from 'react'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FunctionComponent = () => {
  // destructure user information from isAuthenticated response
  const {user} = isAuthenticated()
  const name = `${user.firstName} ${user.lastName}`

  const adminLinks = () => (
    <div className="card mb-5">
      <h3 className="card-header">Admin Links</h3>
      <ul className="list-group">
        <li className="list-group-item"> <Link to="/create/category">Create Category</Link></li>
        <li className="list-group-item"><Link to="/create/product">Create Product</Link></li>
      </ul>
    </div>
  )

  const adminInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">Admin Information</h3>
      <ul className="list-group">
        <li className="list-group-item">name: {user ? name : null}</li>
        <li className="list-group-item">email: {user ? user.email : null}</li>
        <li className="list-group-item">role: {user ? user.role === 1 ? 'Admin' : 'Registered USer' : null}</li>
      </ul>
    </div>
  )

  return (
    <Layout title="Admin Dashboard" description={`Welcome back ${name}`} >
      <div className="row">
        <div className="col-3">
          {adminLinks()}
        </div>
        <div className="col-9">
          {adminInfo()}
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboardPage;