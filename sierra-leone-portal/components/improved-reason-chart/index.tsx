import { StatelessComponent } from 'react'
import { Col } from 'antd'
import Chart from './Chart'

const Component: StatelessComponent = () => {
  return (
    <>
      <Col span={11} offset={9}>
        <div className="card">
          <div className="vis">
            <Chart />
          </div>
        </div>
      </Col>
    </>
  )
}

export default Component
