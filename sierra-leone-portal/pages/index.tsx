import { FunctionComponent } from 'react'
import { Row, Col } from 'antd'
import zipObject from 'lodash.zipobject'
import DataSamplesMap from '../components/data-samples-map'
import { Table, ColumnDef } from '../components/simple-table'
import useScrollspy from '../libs/use-scrollspy'

const getTitle = ({ title }: { title: string }) => title

const householdsSurveyedColumns: ColumnDef[] = [
  { title: 'Region' },
  { title: 'District' },
  { title: 'value', align: 'right' },
]
const householdsSurveyedData = [
  ['North', 'Bombali', 103],
  ['North', 'Bonthe', 285],
  ['North', 'Tonkolili', 139],
  ['North', 'Koinadugu', 463],
  ['East', 'Kenema', 120],
  ['South', 'Moyamba', 150],
  ['South', 'Pujehun', 74],
  ['South', 'Bo', 111],
  ['South', 'Bonthe', 735],
  ['West', 'Western Rural', 60],
  ['North West', 'Kailahun', 168],
  ['North West', 'Kenema', 45],
  ['North West', 'Kono', 28],
].map((row) => zipObject(householdsSurveyedColumns.map(getTitle), row))

const watersourceLevelColumns: ColumnDef[] = [
  { title: 'Household Water Source Level (JMP)' },
  { title: 'East', align: 'right' },
  { title: 'North West', align: 'right' },
  { title: 'North', align: 'right' },
  { title: 'West', align: 'right' },
  { title: 'South', align: 'right' },
]
const watersourceLevelData = [
  ['Improved', 68, 412, 11, 110, 464],
  ['Surface water', 39, 369, 4, 83, 298],
  ['Unimproved', 14, 209, 45, 48, 308],
].map((row) => zipObject(watersourceLevelColumns.map(getTitle), row))

const waterpointsSurveyedColumns: ColumnDef[] = [
  { title: 'Province' },
  { title: 'District' },
  { title: 'Value', align: 'right' },
]
const waterpointsSurveyedData = [
  ['North', 'Bombali', 27],
  ['North', 'Koinadugu', 26],
  ['North', 'Tonkolili', 28],
  ['East', 'Kenema', 39],
  ['South', 'Bo', 17],
  ['South', 'Bonthe', 12],
  ['South', 'Moyamba', 34],
  ['South', 'Pujehun', 18],
  ['West', 'Western Area Rur', 18],
  ['North West', 'Kambia', 32],
  ['North West', 'Karene', 5],
  ['North West', 'Port Loko', 33],
].map((row) => zipObject(waterpointsSurveyedColumns.map(getTitle), row))

const facilitiesSurveyedData = {
  'Community water points': 82,
  PHUs: 96,
  Schools: 109,
}

const Index: FunctionComponent = () => {
  const { register, isCurrent } = useScrollspy({
    defaultSection: 'welcome',
    offset: -50,
  })
  return (
    <>
      <nav className="sideNav">
        <ul>
          <li className={isCurrent('welcome') ? 'current' : ''}>
            <a href="#welcome">Welcome</a>
          </li>
          <li className={isCurrent('map01') ? 'current' : ''}>
            <a href="#map01">map 01</a>
          </li>
          <li className={isCurrent('table01') ? 'current' : ''}>
            <a href="#table01">table 01</a>
          </li>
          <li className={isCurrent('table02') ? 'current' : ''}>
            <a href="#table02">table 02</a>
          </li>
          <li className={isCurrent('table03') ? 'current' : ''}>
            <a href="#table03">table 03</a>
          </li>
          <li className={isCurrent('table04') ? 'current' : ''}>
            <a href="#table04">table 04</a>
          </li>
          <li>
            <a href="#map01" className="backUp">
              Back up
            </a>
          </li>
        </ul>
      </nav>
      <Row className="welcome dataLight fullHeight" id="welcome" ref={register}>
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
      <Row className="map fullHeight" id="map01" ref={register}>
        <DataSamplesMap />
      </Row>
      <Row className="dataSample" id="table01" ref={register}>
        <Col span={14} offset={5}>
          <h3>Region and Districts of Households Surveyed</h3>
          <Table
            columns={householdsSurveyedColumns}
            data={householdsSurveyedData}
            className="sampleTable"
          />
        </Col>
      </Row>
      <Row className="dataSample" id="table02" ref={register}>
        <Col span={14} offset={5}>
          <h3>
            The level of the water source used by the household, according to
            JMP
          </h3>
          <Table
            columns={watersourceLevelColumns}
            data={watersourceLevelData}
            className="sampleTable"
          />
        </Col>
      </Row>
      <Row className="dataSample" id="table03" ref={register}>
        <Col span={14} offset={5}>
          <h3>UNICEF Water Points surveyed</h3>
          <Table
            columns={waterpointsSurveyedColumns}
            data={waterpointsSurveyedData}
            className="sampleTable"
          />
        </Col>
      </Row>
      <Row className="dataSample" id="table04" ref={register}>
        <Col span={14} offset={5}>
          <h3>Facilities surveyed</h3>
          <Table
            columns={Object.keys(facilitiesSurveyedData).map(
              (title) =>
                ({
                  title,
                  align: 'center',
                } as ColumnDef)
            )}
            data={[facilitiesSurveyedData]}
            className="sampleTable"
          />
        </Col>
      </Row>
    </>
  )
}

export default Index
