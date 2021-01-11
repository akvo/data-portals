import { INTERNAL_API_URL } from '../config'
import { truncate } from './utils'

export type Resource = {
  id: number
  author: string
  content: string
  date: string
  title: string
  slug: string
  categories: string[]
  files: string[]
  locations: string[]
  types: string[]
}

export const RESOURCES_API_URL = `${INTERNAL_API_URL}/mali/resources`

export const regions = [
  'Bamako',
  'Gao',
  'Kayes',
  'Kidal',
  'Koulikoro',
  'Mali',
  'Mopti',
  'Segou',
  'Sikasso',
  'Taoudeni',
  'Tombouctou',
]

export const documentTypes = [
  { label: 'CSV', color: '#108ee9' },
  { label: 'PDF', color: '#777777' },
  { label: 'PPT', color: '#52bca3' },
  { label: 'Word', color: '#e58606' },
]

export const getTypeColor = (label: string): string => {
  const type = documentTypes.find((item) => item.label === label)
  return !type ? '#ffffff' : type.color
}

export const categories = [
  'Brochure',
  'Plan operationnel',
  'Presentation',
  'Rapport',
  'Strategie',
]

export const formatContent = (content: string): string => {
  const excerpt = content?.split('\n')[0]
  return !content ? '' : truncate(excerpt, 110)
}
