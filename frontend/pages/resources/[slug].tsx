import { StatelessComponent } from 'react'
import { Row, Col, Alert, Spin, Button } from 'antd'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown/with-html'
import { DateTime } from 'luxon'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import { RESOURCES_API_URL, Resource } from '../../libs/resources'

const ResourcePage: StatelessComponent = () => {
  const router = useRouter()
  const { slug } = router.query
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

  const resource: Resource = data.find((it: Resource) => it.slug === slug)

  return (
    <Row>
      <Col span={16} offset={4} style={{ paddingBottom: '5em' }}>
        <h2>{resource.title}</h2>
        <p>{DateTime.fromISO(resource.date).toFormat('dd/LL/yyyy')}</p>
        <ReactMarkdown source={resource.content} allowDangerousHtml />
        <div>
          <dl>
            <dt>
              <strong>Author:</strong>
            </dt>
            <dd>{resource.author}</dd>
            <dt>
              <strong>Location:</strong>
            </dt>
            <dd>{resource.locations.join(',')}</dd>
            <dt>
              <strong>Category:</strong>
            </dt>
            <dd>{resource.categories.join(',')}</dd>
            <dt>
              <strong>Type</strong>
            </dt>
            <dd>{resource.types.join(',')}</dd>
          </dl>
        </div>
        <div>
          {resource.files.map((file, i) => (
            <div key={i}>
              <Button href={file}>
                {file.substring(file.lastIndexOf('/') + 1)}
              </Button>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  )
}

export default ResourcePage
