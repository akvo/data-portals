import { StatelessComponent } from 'react'

const Footer: StatelessComponent = () => {
  return (
    <div className="layout-footer layout-center">
      <h1 className="partnerTl">Partenaires</h1>
      <div className="partnersLg">
        <div className="partnerImg">
          <a href="#">
            <img src="/AkvoLogo2.svg" alt="" className="grayscale" />
          </a>
        </div>
      </div>
      <p className="copyRights">@2020 Some rights reserved</p>
    </div>
  )
}

export default Footer
