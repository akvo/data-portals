import { StatelessComponent } from 'react'
import { Collapse } from 'antd'
import { Row, Col } from 'antd'

const { Panel } = Collapse

const Guide: StatelessComponent = () => {
  return (
    <>
    <Row  className="guideSection">
    <Col span={16} offset={4}>
      <strong>Comment fonctionne le portail?</strong>
      <p>
      Il existe quatre thèmes EAH avec des sous-pages correspondantes: Eau, 
         qualité de l'eau, assainissement et hygiène. Sur chaque sous-page, il y a un résumé des
         indicateurs largement utilisés et visualisations de données associées. À côté de
         chaque visualisation de données, il y a un point d'interrogation. En cliquant sur le
         symbole, une zone de texte s'affiche avec des métadonnées et des informations supplémentaires
         sur la méthodologie.
      </p>
      <p>
      Ci-dessous, nous avons répondu à un certain nombre de {''}
         <strong> Questions fréquemment posées </strong> pour faciliter l'utilisation de ce
         portail. {''}
      </p>
      </Col>
      </Row>
    <Row  className="faqSection">
    <Col span={16} offset={4}>
      <h2>Questions fréquemment posées</h2>
      <Collapse>
        <Panel header="Comment puis-je contribuer au portail?" key="1">
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

        <Panel header = "Le portail de données GDPDR est-il conforme?" key="2">
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

        <Panel header="Comment puis-je trouver des données avec des emplacements géographiques?" key="3">
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
          header="Puis-je télécharger et utiliser les visualisations de données pour mes propres rapports?"
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

        <Panel header="À quelle fréquence les données sont-elles mises à jour?" key="5">
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
