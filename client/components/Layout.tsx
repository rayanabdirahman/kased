import * as React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Hero from "./Hero";

type Props = {
  title?: string,
  heroTitle?: string,
  description?: string,
  heroButtonText?: string,
  showHero?: boolean,
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'Kased | Warehouse prices without the membership fees!',
  showHero = true,
  heroTitle = 'Hero title',
  description = 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.',
  heroButtonText = 'Find out more'
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="/bootstrap.min.css" rel="stylesheet" />
    </Head>
    <Navbar />

    {
      showHero ? <Hero title={heroTitle} description={description} buttonText={heroButtonText}/> : null 
    }

    <div className="container">
      {children}
    </div>

    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
