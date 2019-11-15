import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { logout, isAuthenticated } from '../api/auth'

const isActive = (history: any, path: any) => {
  if(history.location.pathname === path) {
    return { color: '#ff9900'}
  }
}

interface Props {
  history: any
}

const Navbar: React.FunctionComponent<Props> = ({ history }) => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      {/* <div className="container"> */}
        {/* Brand logo */}
        <Link className="navbar-brand" to="/">Navbar</Link>
        {/* Brand logo */}

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/" style={isActive(history, '/')}>
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/shop" style={isActive(history, '/shop')}>
                Shop <span className="sr-only">(current)</span>
              </Link>
            </li>
            {/* Conditionally show admin dashboard if user is admin */}
            {
              (isAuthenticated() && isAuthenticated().user.role === 1) ?
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/dashboard"  style={isActive(history, '/admin/dashboard')}>
                    Dashboard
                  </Link>
                </li>
              </React.Fragment> :

              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/dashboard"  style={isActive(history, '/user/dashboard')}>
                    Dashboard
                  </Link>
                </li>
              </React.Fragment>
            }
            {/* Conditionally show admin dashboard if user is admin */}
            {/* Conditionally show nav links depending on user authentication */}
            {
              !isAuthenticated() ?
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" style={isActive(history, '/login')}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>
                      Sign Up
                    </Link>
                  </li>
                </React.Fragment> :

                <React.Fragment>
                  <li className="nav-item">
                    <button className="nav-link" onClick={() => logout(() => history.push('/'))}>Logout</button>
                  </li>
                </React.Fragment>
            }
            {/* Conditionally show nav links depending on user authentication */}
          </ul>
        </div>

      {/* </div> */}
    </nav>
  </header>
)

export default withRouter(Navbar);