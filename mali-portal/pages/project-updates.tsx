import { StatelessComponent } from 'react'
import { Row, Col, List, Card, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import fetcher from '../libs/fetcher'
import { PUBLIC_API_URL } from '../config'
import { useSWRInfinite } from 'swr'
import { truncate } from '../libs/utils'

type ProjectUpdate = {
  id: number
  title: string
  text: string
  photo: string
  url: string
}

const useScrollProjectUpdates = () => {
  const LIMIT = 15
  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${PUBLIC_API_URL}/mali/project-updates?limit=${LIMIT}&page=${index + 1}`,
    fetcher
  )
  const updates: ProjectUpdate[] = data ? [].concat(...data) : []
  const isInit = !data && !error
  const isLoading =
    isInit || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT)
  const fetchNext = () => setSize(size + 1)

  return {
    data: isInit ? null : updates,
    isLoading,
    hasMore: !isReachingEnd,
    fetchNext,
  }
}

const ProjectUpdates: StatelessComponent = () => {
  const { data, isLoading, hasMore, fetchNext } = useScrollProjectUpdates()

  return (
    <>
      <Row>
        <Col span={16} offset={4}>
          <h2>Mis a jour projet</h2>
          <p>
            Ci-dessous, vous trouverez un aperçu de toutes les activités pendant
            le projet Inventaire national. Les mises à jour ont été publiées par
            le gestionnaire de projet, les responsables du tableau de bord, les
            enquêteurs, les formateurs, etc. avec l&apos;outil Akvo RSR. Akvo
            RSR est une plateforme en ligne qui vous permet de publier et de
            suivre les informations concernant ce projet. Parcourez la page pour
            lire les récits du travail exécuté.
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4}>
          {!data ? (
            <Spin tip="Loading..." />
          ) : (
            <InfiniteScroll
              dataLength={!data ? 0 : data.length}
              next={fetchNext}
              hasMore={hasMore}
              loader={<Spin spinning={!!data && isLoading} />}
            >
              <List
                dataSource={data}
                grid={{ gutter: 16, column: 3 }}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <Card
                      cover={
                        <img
                          src={
                            item.photo ||
                            'https://via.placeholder.com/200x200.png?text=+'
                          }
                          alt={'picture of ' + item.title}
                        />
                      }
                      actions={[
                        <a href={item.url} key={item.url}>
                          Read more
                        </a>,
                      ]}
                    >
                      <Card.Meta
                        title={item.title}
                        description={truncate(item.text, 110)}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProjectUpdates
