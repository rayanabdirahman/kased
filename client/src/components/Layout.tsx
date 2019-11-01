import React from 'react';
import Hero from "./Hero";
import Navbar from './Navbar';

interface Props {
  title?: string,
  description?: string,
  showHero?: boolean
}

const Layout: React.FunctionComponent<Props> = ({children, showHero=true, title, description, }) => (
  <React.Fragment>
    <Navbar />
    {
      showHero ? <Hero title={title} description={description}/> : null
    }

    <div className="container-fluid">
      { children }
    </div>

    <footer>
      <hr/>
      <span>I'm here to stay (Footer)</span>
    </footer>

  </React.Fragment>
)

export default Layout