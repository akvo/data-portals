import { StatelessComponent } from 'react'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Row, Col, Button } from 'antd'
import ReactMarkdown from 'react-markdown/with-html'
import { DateTime } from 'luxon'
import { RESOURCES_ENDPOINT, Resource } from '../../libs/resources'

type Props = {
  resource: Resource
}

const ResourcePage: StatelessComponent<Props> = ({ resource }) => {
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

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params as Params
  const res = await fetch(RESOURCES_ENDPOINT)
  const resources = await res.json()
  const resource = resources.find(
    (it: Resource) => it.slug === decodeURIComponent(slug)
  )

  return {
    props: {
      resource,
    },
  }
}

export default ResourcePage
