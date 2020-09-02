import { StatelessComponent } from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Button } from 'antd'
import { TickFormatter } from '@nivo/axes'
import { API_URL } from '../config'
import GroupBarChart from '../components/GroupBarChart'

type Props = {
  sourceUrl: string
}

const Home: StatelessComponent<Props> = ({ sourceUrl }) => {
  return (
    <>
      <h1>Data portal WASH Mali</h1>
      <p>
        In this portal X, Y, Z. Please see the menu above for insights and data
        visualisations <strong>per WASH theme</strong>, or go immediately to the{' '}
        <strong>raw data</strong>:
      </p>
      <p>
        <Link href="/data">
          <Button type="primary">View raw data</Button>
        </Link>
      </p>

      <h2>Overview of data by region</h2>
      <p>
        The graph below gives an overview of the main indicators by region used
        by the DNH. Namely: functionality rate, access rate and equipment rate.
        For more information, see the data and graphics section.
      </p>
      <div
        style={{
          height: '50vh',
          minHeight: '500px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <GroupBarChart
          source={sourceUrl}
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
    </>
  )
}

export const formatPercentage: TickFormatter = (value) => value + '%'

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      sourceUrl: API_URL + '/functionality-rate-by-region',
    },
  }
}

export default Home
