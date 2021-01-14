import { StatelessComponent } from 'react'
import { Layout as AntLayout } from 'antd'
import TopProgressBar from './TopProgressBar'
import Header from './Header'
import Footer from './Footer'

const Layout: StatelessComponent = ({ children }) => {
  return (
    <div className="container">
      <TopProgressBar />
      <AntLayout>
        <AntLayout.Header>
          <Header />
        </AntLayout.Header>
        <AntLayout.Content>
          <div className="layout-content layout-center">{children}</div>
        </AntLayout.Content>
      </AntLayout>
      <AntLayout.Footer>
        <Footer />
      </AntLayout.Footer>
    </div>
  )
}

export default Layout
