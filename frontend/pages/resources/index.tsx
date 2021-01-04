import { StatelessComponent, useState } from 'react'
import { Row, Col, Card, Spin, Alert, Tag } from 'antd'
import Link from 'next/link'
import { DateTime } from 'luxon'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import {
  RESOURCES_API_URL,
  Resource,
  regions,
  documentTypes,
  getTypeColor,
  categories,
  formatContent,
} from '../../libs/resources'

type ListProps = {
  region: string
  documentType: string
  category: string
}

const ResourceList: StatelessComponent<ListProps> = ({
  region,
  documentType,
  category,
}) => {
  const { data, error } = useSWR(RESOURCES_API_URL, fetcher)

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed loading data."
        type="error"
        showIcon
      />
    )
  }
  if (!data) {
    return <Spin tip="Loading..." />
  }

  const view = data
    .filter((r: Resource) =>
      region && !r.locations.includes(region) ? false : true
    )
    .filter((r: Resource) =>
      documentType && !r.types.includes(documentType) ? false : true
    )
    .filter((r: Resource) =>
      category && !r.categories.includes(category) ? false : true
    )

  return (
    <>
      {view.map((item: Resource) => (
        <Card key={item.id}>
          <h4>
            <Link href={`/resources/${encodeURIComponent(item.slug)}`}>
              <a>{item.title}</a>
            </Link>
          </h4>
          <p>{DateTime.fromISO(item.date).toFormat('yyyy')}</p>
          <p>{formatContent(item.content)}</p>
          <div>
            {item.types.map((type, i) => (
              <Tag key={i} color={getTypeColor(type)}>
                {type}
              </Tag>
            ))}
          </div>
        </Card>
      ))}
    </>
  )
}

const Resources: StatelessComponent = () => {
  const [regionFilter, setRegionFilter] = useState('')
  const [documentTypeFilter, setDocumentTypeFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  return (
    <Row>
      <Col span={4} offset={4}>
        <div>
          <div>
            <strong>Région</strong>
          </div>
          <div>
            <select onChange={(e) => setRegionFilter(e.currentTarget.value)}>
              <option value="">Not Selected</option>
              {regions.map((region, i) => (
                <option value={region} key={i}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div>
            <strong>Type de document</strong>
          </div>
          <div>
            <select
              onChange={(e) => setDocumentTypeFilter(e.currentTarget.value)}
            >
              <option value="">Not Selected</option>
              {documentTypes.map((type, i) => (
                <option value={type.label} key={i}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div>
            <strong>Category</strong>
          </div>
          <div>
            <select onChange={(e) => setCategoryFilter(e.currentTarget.value)}>
              <option value="">Not Selected</option>
              {categories.map((category, i) => (
                <option value={category} key={i}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Col>
      <Col span={12} style={{ paddingBottom: '5rem' }}>
        <ResourceList
          region={regionFilter}
          documentType={documentTypeFilter}
          category={categoryFilter}
        />
      </Col>
    </Row>
  )
}

export default Resources
