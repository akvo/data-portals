import { StatelessComponent } from 'react'
import Link from 'next/link'
import Navigation from './Navigation'

const Header: StatelessComponent = () => {
  return (
    <div className="layout-header layout-center">
      <div className="logo">
        <Link href="/">
          <a>
            <h1>Mali portail EAH</h1>
          </a>
        </Link>
      </div>
      <Navigation />
    </div>
  )
}

export default Header
