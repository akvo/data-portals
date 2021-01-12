module.exports = () => {
  const API_HOST = 'http://localhost:9000'
  const DATA_ENDPOINT = '/api/data'
  const DATA_API_ENDPOINT = API_HOST + '/api/v1'

  return {
    env: {
      API_HOST,
      DATA_ENDPOINT,
      DATA_API_ENDPOINT,
    },
    async rewrites() {
      return [
        {
          source: DATA_ENDPOINT + '/:path*',
          destination: DATA_API_ENDPOINT + '/:path*',
        },
      ]
    },
  }
}
