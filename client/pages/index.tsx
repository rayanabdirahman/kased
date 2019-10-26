import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'

import '../styles/index.sass';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Kased | Warehouse prices without the membership fees!">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
