import { StatelessComponent, useEffect, useRef, useState } from 'react'
import { Row, Col } from 'antd'
import { getBestAnchorGivenScrollLocation } from '../libs/scroll'
import WaterPointsMapSection from '../components/root/WaterPointsMapSection'

const Home: StatelessComponent = () => {
  const sections = useRef<{ [key: string]: any }>()
  const [currentAnchor, setCurrentAnchor] = useState('')
  const handleScroll = () => {
    let anchor: any = getBestAnchorGivenScrollLocation(sections.current, 0)
    if (anchor === undefined) anchor = 'welcome'
    if (anchor !== currentAnchor) {
      setCurrentAnchor(anchor)
    }
  }
  useEffect(() => {
    sections.current = {
      map03: document.getElementById('welcome'),
      welcome: document.getElementById('map03'),
      dataTable: document.getElementById('dataTable'),
    }
    document.addEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <nav className="sideNav">
        <ul>
          <li className={currentAnchor === 'welcome' ? 'current' : ''}>
            <a href="#welcome">Welcome</a>
          </li>
          <li className={currentAnchor === 'map03' ? 'current' : ''}>
            <a href="#map03">map 03</a>
          </li>
          <li className={currentAnchor === 'dataTable' ? 'current' : ''}>
            <a href="#dataTable">Data table</a>
          </li>
          <li>
            <a href="#map03" className="backUp">
              Back up
            </a>
          </li>
        </ul>
      </nav>
      <Row className="welcome dataLight fullHeight" id="welcome">
        <Col span={8} offset={3}>
          <div className="welcome__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">
                Bienvenue sur le site des services EAH du <span>Mali</span>.
              </span>
            </h1>
          </div>
        </Col>
        <Col span={7} offset={1} className="infoContainer">
          <p className="paragraph">
              Bienvenue dans les données sur l'eau, l'assainissement et l'hygiène en milieu rural au Mali (EAH)
             portail. Ce portail fournit des informations sur les points d'eau ruraux au Mali. Les données ont été collectées lors de leur inventaire national de 2016 à 2018.
          </p>
          <p className="paragraph">
            Ce portail est mis en place pour fournir des informations sur les status les plus récents des services WaSH dans les différentes régions du Mali. le
            L'inventaire national était axé sur la qualité de l'eau et de l'eau, donc il n'y a pas de données disponibles sur l'assainissement et l'hygiène. Les informations sur l'eau et la qualité de l'eau se trouvent dans les onglets respectifs. Si vous êtes
             intéressé par le fichier de données brutes, veuillez consulter l'onglet Données et pour plus d'informations sur ce portail, et d'autres portails EAH de pays, veuillez consulter l'onglet Guide.
          </p>
        </Col>
      </Row>
      <Row className="map fullHeight" id="map03">
        <WaterPointsMapSection />
      </Row>
      <Row className="dataSample" id="dataTable">
        <Row className="infoTxt">
          <Col span={20} offset={2}>
            <p>
              L'approvisionnement en eau courante des zones urbaines du Mali n'est pas inclus dans ces données. Surtout à Bamako, le nombre de puits ne donne pas une estimation raisonnable de l'approvisionnement en eau. Cela vaut également pour quelques-unes des autres régions et comtés. Ces comtés ont été indiqués sur les cartes. Des précautions doivent être prises lors de l'interprétation des nombres de ces comtés spécifiques. 
            </p>
          </Col>
          </Row>
        <Col span={5} offset={2} className="decoRect">
          <div>
            <h2>Caractéristiques de l'échantillon</h2>
          </div>
          <p className="paragraph">
          L'inventaire EAH du Mali de 2016-2018 était une mesure de recensement couvrant tous les points d'eau ruraux du Mali. Les réseaux d'eau courante ont été exclus de la collecte de données. Il faut garder cela à l'esprit lorsqu'on regarde les grandes villes. Le tableau de droite donne un aperçu du nombre d'opérateurs interrogés et du nombre de puits à partir desquels des informations ont été collectées.
          </p>
        </Col>
        <Col span={14} offset={1}>
          <table className="sampleTable">
            <thead>
              <tr>
                <th>District</th>
                <th>Year of collection</th>
                <th>Number of operators</th>
                <th>Number of wells</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bamako</td>
                <td>2018</td>
                <td>620</td>
                <td>461</td>
              </tr>
              <tr>
                <td>Gao</td>
                <td>2018</td>
                <td>1128</td>
                <td>2437</td>
              </tr>
              <tr>
                <td>Kayes</td>
                <td>2016</td>
                <td>894</td>
                <td>7252</td>
              </tr>
              <tr>
                <td>Kidal</td>
                <td>2018</td>
                <td>55</td>
                <td>491</td>
              </tr>
              <tr>
                <td>Koulikoro</td>
                <td>2018</td>
                <td>3172</td>
                <td>8275</td>
              </tr>
              <tr>
                <td>Mopti</td>
                <td>2016</td>
                <td>975</td>
                <td>6583</td>
              </tr>
              <tr>
                <td>Segou</td>
                <td>2016</td>
                <td>2793</td>
                <td>7563</td>
              </tr>
              <tr>
                <td>Sikasso</td>
                <td>2016</td>
                <td>2532</td>
                <td>6274</td>
              </tr>
              <tr>
                <td>Tombouctou</td>
                <td>2018</td>
                <td>500</td>
                <td>3503</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  )
}

export default Home
