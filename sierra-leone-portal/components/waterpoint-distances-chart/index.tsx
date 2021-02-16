import { StatelessComponent } from 'react'
import { Col } from 'antd'
import Chart from './Chart'

const Component: StatelessComponent = () => {
  return (
    <>
      <Col span={12} offset={6}>
        <div className="card">
          <h3>Distance of the households to the closests water point</h3>
          <div className="vis">
            <Chart />
          </div>
        </div>
      </Col>
    </>
  )
}

export default Component
