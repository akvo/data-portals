import { StatelessComponent } from 'react'
import { GetServerSideProps } from 'next'
import { API_PATH, MAPBOX_TOKEN } from '../config'
import UnclusteredMap from '../components/UnclusteredMap'

type Props = {
  sourceUrl: string
  mapboxToken: string
}

const Sanitation: StatelessComponent<Props> = ({ sourceUrl, mapboxToken }) => {
  return (
    <>
      <h1>Sanitation</h1>

      <div
        style={{
          height: '50vh',
          minHeight: '500px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <UnclusteredMap
          source={sourceUrl}
          latitude={17.65}
          longitude={-4.5}
          zoom={4.5}
          width="100%"
          height="100%"
          mapboxToken={mapboxToken}
        />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      sourceUrl: `${API_PATH}/mali/waterpoints.geojson`,
      mapboxToken: MAPBOX_TOKEN,
    },
  }
}

export default Sanitation
