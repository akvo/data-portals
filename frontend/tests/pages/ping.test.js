import React from 'react'
import { render } from '@testing-library/react'
import Ping, { getServerSideProps } from '../../pages/ping'
import { server, rest } from '../mocks/server'
import { INTERNAL_API_HOST } from '../../config'

describe('Ping page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Ping ping="pong!" />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('should call backend endpoint', async () => {
    server.use(
      rest.get(INTERNAL_API_HOST + '/ping', (_, res, ctx) => {
        return res(ctx.json({ ping: 'pong!' }))
      })
    )
    const response = await getServerSideProps()
    expect(response).toEqual({ props: { ping: 'pong!' } })
  })
})
