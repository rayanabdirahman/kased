import React from 'react'
import Link from 'next/link'
import { logout, isAuthenticated } from '../pages/api/auth'
import Router from 'next/router'

const Navbar: React.FunctionComponent = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light">
      {/* <div className="container"> */}
        {/* Brand logo */}
        <Link href="/">
          <a className="navbar-brand">Navbar</a>
        </Link>
        {/* Brand logo */}

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link href="/">
                <a className="nav-link">Home <span className="sr-only">(current)</span></a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/user-dashboard">
                <a className="nav-link">Dashboard</a>
              </Link>
            </li>
            {/* Conditionally show nav links depending on user authentication */}
            { 
              !isAuthenticated() ?
              <React.Fragment>
                <li className="nav-item">
                  <Link href="/login">
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/signup">
                    <a className="nav-link">Sign Up</a>
                  </Link>
                </li>
              </React.Fragment> :

              <React.Fragment>
                <li className="nav-item">
                  <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => logout(() => Router.replace('/'))}>Logout</a>
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

export default Navbar;