import fetch, { RequestInfo, RequestInit } from 'node-fetch'

export default async function fetcher<JSON = any>(
  url: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(url, init)
  return res.json()
}
