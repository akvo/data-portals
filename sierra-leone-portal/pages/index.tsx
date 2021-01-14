import { StatelessComponent } from 'react'
import { Row, Col } from 'antd'

const Index: StatelessComponent = () => {
  return (
    <>
      <Row className="welcome dataLight fullHeight" id="welcome">
        <Col span={8} offset={3}>
          <div className="welcome__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">
                Welcome to <span>Sierra Leone</span> WASH portal.
              </span>
            </h1>
          </div>
        </Col>
      </Row>
      <Row />
    </>
  )
}

export default Index
