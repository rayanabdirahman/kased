import React from 'react'
import Link from 'next/link'

const Navbar: React.FunctionComponent = () => (
  <header>
    <nav>
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