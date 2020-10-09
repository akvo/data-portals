import React from 'react'
import {
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react'
import Home, { formatPercentage, getServerSideProps } from '../../pages/index'
import { server, rest } from '../mocks/server'
import { API_PATH } from '../../config'

describe('Home page', () => {
  const fakeData = {
    Region: 'Foo',
    PMH: 1,
    Puits: 1,
    SAEP: 1,
  }

  it('matches snapshot', async () => {
    const sourceUrl = API_PATH + '/functionality-rate-by-region'
    server.use(
      rest.get(sourceUrl, (_, res, ctx) => {
        return res(ctx.json([fakeData]))
      })
    )

    const { asFragment } = render(<Home sourceUrl={sourceUrl} />, {})

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    expect(asFragment()).toMatchSnapshot()
  })

  test('getServerSideProps', async () => {
    const respone = await getServerSideProps()

    expect(respone.props).toHaveProperty('sourceUrl')
  })
})

test('formatPercentage', () => {
  const result = formatPercentage(100)
  expect(result).toEqual('100%')
})
