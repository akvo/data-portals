import 'antd/dist/antd.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'nprogress/nprogress.css'
import '../styles/global.scss'
import { StatelessComponent } from 'react'
import { AppProps } from 'next/app'
import Layout from '../components/layout'

const App: StatelessComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
