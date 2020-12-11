import 'antd/dist/antd.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'nprogress/nprogress.css'
import '../styles/global.scss'
import { AppProps } from 'next/app'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StatelessComponent } from 'react'
import TopProgressBar from '../components/commons/TopProgressBar'

const { Header, Content, Footer } = Layout

const CustomApp: StatelessComponent<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const activeMenu = router.pathname.replace(/^\//, '')

  return (
    <div className="container">
      <TopProgressBar />
      <Layout>
        <Header>
          <div className="layout-header layout-center">
            <div className="logo">
              <Link href="/">
                <a>
                  <h1>Mali portail EAH</h1>
                </a>
              </Link>
            </div>
            <Menu theme="dark" mode="horizontal" selectedKeys={[activeMenu]}>
              <Menu.Item key="water">
                <Link href="/water">
                  <a>Accés à l'eau</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="water-quality">
                <Link href="/water-quality">
                  <a>Qualité de l'eau</a>
                </Link>
              </Menu.Item>
              {/*
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
              */}
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
      </Layout>
      <Footer>
        <div className="layout-footer layout-center">
          <h1 className="partnerTl">Partenaires</h1>
          <div className="partnersLg">
            <div className="partnerImg">
              <a href="#">
                <img src="tumbDNH-150x150.png" alt="" className="grayscale" />
              </a>
            </div>
            <div className="partnerImg">
              <a href="#">
                <img src="tumb-sweden.png" alt="" className="grayscale" />
              </a>
            </div>
            <div className="partnerImg">
              <a href="#">
                <img src="tumb-unicef.png" alt="" className="grayscale" />
              </a>
            </div>
            <div className="partnerImg">
              <a href="#">
                <img src="tumbGIZ.png" alt="" className="grayscale" />
              </a>
            </div>
            <div className="partnerImg">
              <a href="#">
                <img src="tumbsnv.png" alt="" className="grayscale" />
              </a>
            </div>
            <div className="partnerImg">
              <a href="#">
                <img src="AkvoLogo2.svg" alt="" className="grayscale" />
              </a>
            </div>
          </div>
          <p className="copyRights">@2020 Some rights reserved</p>
        </div>
      </Footer>
    </div>
  )
}

export default CustomApp
