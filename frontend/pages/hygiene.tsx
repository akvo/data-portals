import { StatelessComponent } from 'react'
import { GetServerSideProps } from 'next'
import { TickFormatter } from '@nivo/axes'
import { API_PATH, MAPBOX_TOKEN } from '../config'
import ClusteredMap from '../components/ClusteredMap'
import GroupBarChart from '../components/GroupBarChart'

type Props = {
  chartSource: string
  mapSource: string
  mapboxToken: string
}

const Hygiene: StatelessComponent<Props> = ({
  chartSource,
  mapSource,
  mapboxToken,
}) => {
  return (
    <>
      <h1>Hygiene</h1>
      <div
        style={{
          height: '50vh',
          minHeight: '500px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <ClusteredMap
          source={mapSource}
          latitude={17.65}
          longitude={-4.5}
          zoom={4.5}
          width="100%"
          height="100%"
          mapboxToken={mapboxToken}
        />
      </div>
      <div style={{ marginBottom: '40px' }}>
        <p>&nbsp;</p>
      </div>
      <h2>Overview of data by region</h2>
      <div
        style={{
          height: '50vh',
          minHeight: '500px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <GroupBarChart
          source={chartSource}
          keys={['PMH', 'Puits', 'SAEP']}
          indexBy="Region"
          margin={{ top: 25, right: 0, bottom: 100, left: 55 }}
          maxValue={100}
          axisBottom={{
            legend: 'Region',
            legendPosition: 'middle',
            legendOffset: 60,
            tickRotation: -40,
          }}
          axisLeft={{
            legend: 'Percentage',
            legendPosition: 'middle',
            legendOffset: -50,
            format: formatPercentage,
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'top',
              direction: 'row',
              itemWidth: 85,
              itemHeight: 10,
              translateY: -25,
            },
          ]}
        />
      </div>
      <p>
        This graph gives an overview of the main indicators by region used by
        the DNH. Namely: functionality rate, access rate and equipment rate. For
        more information, see the data and graphics section.
      </p>
    </>
  )
}

export const formatPercentage: TickFormatter = (value) => value + '%'

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      chartSource: API_PATH + '/functionality-rate-by-region',
      mapSource: API_PATH + '/site-points.geojson',
      mapboxToken: MAPBOX_TOKEN,
    },
  }
}

export default Hygiene
