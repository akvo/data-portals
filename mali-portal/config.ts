export const INTERNAL_API_HOST = 'http://localhost:9000'

export const PUBLIC_API_HOST =
  process.env.NEXT_PUBLIC_API_HOST || INTERNAL_API_HOST

export const API_PATH = '/api/v1'

export const INTERNAL_API_URL = INTERNAL_API_HOST + API_PATH

export const PUBLIC_API_URL = PUBLIC_API_HOST + API_PATH

// export const API_URL = PUBLIC_API_HOST + API_PATH

export const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWt2by16dWhkaWwiLCJhIjoiY2tmNmsxNW0xMDV5aTJ1bzlwZXE2MDFxayJ9.89TSvagEvAqIg1XXSSwWMA'

export const DEFAULT_MAP_VIEWPORT = {
  latitude: 17.65,
  longitude: -4.15,
  zoom: 4.4,
}
