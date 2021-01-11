export type FeaturePoint = {
  latitude: number
  longitude: number
  [name: string]: any
}

export type HoverFeature = {
  feature?: { [key: string]: any }
  x: number
  y: number
}
