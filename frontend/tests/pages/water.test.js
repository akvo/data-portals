import React from 'react'
import { render } from '@testing-library/react'
import Water, { getServerSideProps } from '../../pages/water'
import { server, rest } from '../mocks/server'
import { API_PATH } from '../../config'

describe('Water page', () => {
  const fakeGeojson = {
    type: 'FeatureCollection',
    features: [],
  }

  it('matches snapshot', () => {
    const sourceUrl = API_PATH + '/site-points.geojson'

    server.use(
      rest.get(sourceUrl, (_, res, ctx) => {
        return res(ctx.json(fakeGeojson))
      })
    )

    const { asFragment } = render(<Water apiUrl={sourceUrl} />, {})

    expect(asFragment()).toMatchSnapshot()
  })

  test('getServerSideProps', async () => {
    const respone = await getServerSideProps()

    expect(respone.props).toHaveProperty('sourceUrl')
    expect(respone.props).toHaveProperty('mapboxToken')
  })
})
