import { StatelessComponent } from 'react'
import { Collapse } from 'antd'
import { Row, Col } from 'antd'

const { Panel } = Collapse

const Guide: StatelessComponent = () => {
  return (
    <>
    <Row  className="guideSection">
    <Col span={16} offset={4}>
      <strong>How does the portal work?</strong>
      <p>
        There are four WASH themes with corresponding subpages: Water, Water
        quality, Sanitation and Hygiene. On each subpage, there is a summary of
        widely used indicators and accompanying data visualisations. Next to
        each data visualisation, there is a question mark. Upon clicking the
        symbol, a text box will show with meta data and additional information
        on the methodology.
      </p>
      <p>
        Below we answered a number of{' '}
        <strong>Frequently Asked Questions</strong> to ease the use of this
        portal.{' '}
      </p>
      </Col>
      </Row>
    <Row  className="faqSection">
    <Col span={16} offset={4}>
      <h2>Frequently Asked Questions</h2>
      <Collapse>
        <Panel header="How can I contribute to the portal?" key="1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam
            id diam maecenas ultricies mi eget. Feugiat in ante metus dictum.
            Tempor commodo ullamcorper a lacus vestibulum sed arcu. Eleifend
            donec pretium vulputate sapien nec sagittis aliquam. Et ligula
            ullamcorper malesuada proin libero nunc consequat interdum varius.
            Sed vulputate odio ut enim blandit volutpat. Dictum fusce ut
            placerat orci nulla. Adipiscing tristique risus nec feugiat in
            fermentum posuere urna. Ut tristique et egestas quis ipsum
            suspendisse ultrices gravida.
          </p>
        </Panel>

        <Panel header="Is the data portal GDPDR compliant?" key="2">
          <p>
            Orci porta non pulvinar neque laoreet suspendisse. Hendrerit dolor
            magna eget est lorem ipsum dolor sit. Enim neque volutpat ac
            tincidunt vitae semper quis. Porta non pulvinar neque laoreet
            suspendisse. Integer quis auctor elit sed vulputate mi. Odio morbi
            quis commodo odio aenean sed. Condimentum vitae sapien pellentesque
            habitant morbi tristique. Eget est lorem ipsum dolor sit amet
            consectetur adipiscing elit. Lorem sed risus ultricies tristique
            nulla aliquet. Tincidunt tortor aliquam nulla facilisi cras
            fermentum odio. Posuere ac ut consequat semper viverra nam libero
            justo. Felis imperdiet proin fermentum leo vel orci porta.
          </p>
        </Panel>

        <Panel header="How can I find data with geo locations?" key="3">
          <p>
            Faucibus a pellentesque sit amet porttitor. Viverra nibh cras
            pulvinar mattis. Volutpat commodo sed egestas egestas fringilla
            phasellus faucibus. Sem nulla pharetra diam sit amet nisl. Sed augue
            lacus viverra vitae congue eu. In aliquam sem fringilla ut. Eget
            nullam non nisi est sit amet facilisis magna. Id nibh tortor id
            aliquet lectus proin. Volutpat ac tincidunt vitae semper. Vitae
            ultricies leo integer malesuada nunc vel. Vitae ultricies leo
            integer malesuada nunc vel. Pellentesque nec nam aliquam sem et.
          </p>
        </Panel>

        <Panel
          header="Can I download and use the data visualisations for own reports?"
          key="4"
        >
          <p>
            Proin fermentum leo vel orci porta non. Viverra vitae congue eu
            consequat ac. Proin fermentum leo vel orci porta non pulvinar.
            Curabitur gravida arcu ac tortor dignissim convallis. Cras pulvinar
            mattis nunc sed blandit libero volutpat sed. Parturient montes
            nascetur ridiculus mus mauris vitae ultricies leo integer. Id diam
            vel quam elementum pulvinar etiam non. Dui accumsan sit amet nulla
            facilisi morbi tempus iaculis urna. Tincidunt lobortis feugiat
            vivamus at augue eget arcu dictum varius. Lorem donec massa sapien
            faucibus et molestie ac. Semper auctor neque vitae tempus quam
            pellentesque nec nam.
          </p>
        </Panel>

        <Panel header="How often are data updated?" key="5">
          <p>
            Adipiscing bibendum est ultricies integer. Integer quis auctor elit
            sed vulputate. Lobortis feugiat vivamus at augue eget arcu dictum
            varius. Nisl purus in mollis nunc sed id semper risus in. Aliquam
            sem et tortor consequat id porta nibh. Faucibus scelerisque eleifend
            donec pretium vulputate sapien nec. Arcu vitae elementum curabitur
            vitae. Imperdiet massa tincidunt nunc pulvinar sapien et ligula.
            Lorem sed risus ultricies tristique nulla aliquet enim. Ut tortor
            pretium viverra suspendisse potenti. Aliquam purus sit amet luctus
            venenatis lectus magna fringilla. Nunc sed augue lacus viverra vitae
            congue eu consequat. Ut tristique et egestas quis ipsum suspendisse
            ultrices. Quisque sagittis purus sit amet volutpat consequat mauris
            nunc congue. In hendrerit gravida rutrum quisque.
          </p>
        </Panel>
      </Collapse>
      </Col>
      </Row>
    </>
  )
}

export default Guide
