import 'antd/dist/antd.css'
import '../styles/global.css'
import 'leaflet/dist/leaflet.css'
import { AppProps } from 'next/app'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StatelessComponent } from 'react'

const { Header, Content, Footer } = Layout

const CustomApp: StatelessComponent<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const activeMenu = router.pathname.replace(/^\//, '')

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1000000, width: '100%' }}>
        <div className="layout-header layout-center">
          <div className="logo">
            <Link href="/">
              <a>
                <h1>Akvo Portals</h1>
              </a>
            </Link>
          </div>
          <Menu theme="dark" mode="horizontal" selectedKeys={[activeMenu]}>
            <Menu.Item key="water">
              <Link href="/water">
                <a>Water</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="water-quality">
              <Link href="/water-quality">
                <a>Water quality</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="sanitation">
              <Link href="/sanitation">
                <a>Sanitation</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="hygiene">
              <Link href="/hygiene">
                <a>Hygiene</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="data">
              <Link href="/data">
                <a>Data</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="guide">
              <Link href="/guide">
                <a>Guide</a>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>

      <Content>
        <div className="layout-content layout-center">
          <Component {...pageProps} />
        </div>
      </Content>

      <Footer>
        <div className="layout-footer layout-center">
          <p>@2020</p>
        </div>
      </Footer>
    </Layout>
  )
}

export default CustomApp
