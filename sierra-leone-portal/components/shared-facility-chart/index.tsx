import { StatelessComponent } from 'react'
import { Col } from 'antd'
import Info from './Info'
import Chart from './Chart'

const Component: StatelessComponent = () => {
  return (
    <>
      <Col span={4} offset={4}>
        <Info />
      </Col>
      <Col span={11} offset={1}>
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
