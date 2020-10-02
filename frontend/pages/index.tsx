import { StatelessComponent } from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { MAPBOX_TOKEN } from '../config'

const MaliAdm3Map = dynamic(() => import('../components/MaliAdm3Map'), {
  ssr: false,
})

type Props = {
  mapboxToken: string
}

const Home: StatelessComponent<Props> = ({ mapboxToken }) => {
  return (
    <>
      <h1>Welcome</h1>
      <div style={{ height: '60vh', width: '100%' }}>
        <MaliAdm3Map accessToken={mapboxToken} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      mapboxToken: MAPBOX_TOKEN,
    },
  }
}

export default Home
