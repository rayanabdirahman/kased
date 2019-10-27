import React from 'react'
import Link from 'next/link'

const Navbar: React.FunctionComponent = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Brand logo */}
        <Link href="/">
          <a className="navbar-brand">Navbar</a>
        </Link>
        {/* Brand logo */}

        {/* Search bar */}
        <div className="input-group-overlay">
          <input type="text" placeholder="Search for products" className="form-control appended-form-control"/>
        </div>
        {/* Search bar */}
      </div>
      <img src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""/>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      |{' '}
      <Link href="/about">
        <a>About</a>
      </Link>{' '}
      |{' '}
      <Link href="/users">
        <a>Users List</a>
      </Link>{' '}
      |{' '}
      <Link href="/login">
        <a>Login</a>
      </Link>{' '}
      |{' '}
      <Link href="/signup">
        <a>Signup</a>
      </Link>
    </nav>
  </header>
)

export default Navbar;