import { StatelessComponent, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Row, Col, Card, Tag } from 'antd'
import Link from 'next/link'
import { DateTime } from 'luxon'
import {
  RESOURCES_ENDPOINT,
  Resource,
  regions,
  documentTypes,
  getTypeColor,
  categories,
  formatContent,
} from '../../libs/resources'

type Props = {
  data: Resource[]
}

const Resources: StatelessComponent<Props> = ({ data }) => {
  const [regionFilter, setRegionFilter] = useState('')
  const [documentTypeFilter, setDocumentTypeFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const view = data
    .filter((r: Resource) =>
      regionFilter && !r.locations.includes(regionFilter) ? false : true
    )
    .filter((r: Resource) =>
      documentTypeFilter && !r.types.includes(documentTypeFilter) ? false : true
    )
    .filter((r: Resource) =>
      categoryFilter && !r.categories.includes(categoryFilter) ? false : true
    )

  return (
    <Row  className="resourceList">
      <Col span={3} offset={4} className="filterBar">
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
      <Col span={12} offset={1}  style={{ paddingBottom: '5rem' }}>
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
      </Col>
    </Row>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(RESOURCES_ENDPOINT)
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}

export default Resources
