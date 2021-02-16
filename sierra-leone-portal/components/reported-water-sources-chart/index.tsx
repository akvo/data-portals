import { StatelessComponent } from 'react'
import { Col } from 'antd'
import Chart from './Chart'

const Component: StatelessComponent = () => {
  return (
    <>
      <Col span={12} offset={6}>
        <div className="card">
          <h3>Water Sources as reported by the households</h3>
          <div className="vis">
            <Chart />
          </div>
        </div>
      </Col>
    </>
  )
}

export default Component
