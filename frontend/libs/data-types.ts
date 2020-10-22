export type FeaturePoint = {
  latitude: number
  longitude: number
  [name: string]: any
}

export type DatasourceProps = {
  source: string
  [name: string]: any
}

export type Waterpoint = {
  longitude: number
  latitude: number
  region: string
  cercle: string
  commune: string
  village: string
  waterpointType: string
  isPublic: boolean
  functionality: string
  date: string
  photo: string
}
