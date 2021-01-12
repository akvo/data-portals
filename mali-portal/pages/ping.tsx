import Link from 'next/link'
import fetch from 'node-fetch'
import { StatelessComponent } from 'react'
import { GetServerSideProps } from 'next'
import { API_HOST } from '../config'

type Props = {
  ping: string
}

const Ping: StatelessComponent<Props> = ({ ping }) => {
  return (
    <>
      <h1>{ping}</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(API_HOST + '/ping')
  const json = await res.json()

  return {
    props: {
      ping: json.ping,
    },
  }
}

export default Ping
