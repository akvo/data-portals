import { StatelessComponent } from 'react'

const Info: StatelessComponent = () => {
  return (
    <>
      <h4>Map of the data samples</h4>
      <p>
        In Sierra Leone, less than 40% of households have access to clean, safe
        drinking water. Faecal contamination, in particular, poses a serious
        threat to the health of Sierra Leoneans, spreading water-borne diseases
        such as Cholera. A lack of large-scale, reliable data on water quality
        makes it increasingly difficult for governments to effectively ad- dress
        this problem. Under the Sustainable development goals (SDG), target
        number 6 sets an ambition of universal access to clean water and
        sanitation for all. WHO/UNICEF Joint Monitoring Programme (JMP)
        developed a set of core questions for monitoring water, sanitation and
        hygiene at a household level. In line with JMP vision, to accelerate
        progress towards universal and sustainable access to water and
        sanitation to underserved populations in the developing world, this
        report evaluates and describes the progress made at the household level,
        access to safe drinking water, sanitation facilities and access to
        handwashing in Sierra Leone. Preliminary results from the data collected
        in measuring the progress indicate that:
      </p>
      <ul>
        <li>
          At least 57% of all households in Sierra Leone have no water or access
          to drinking water using unimproved water sources.
        </li>
        <li>
          Only 6% of the total population can access safely managed water.
        </li>
        <li>
          32% of all households either open defacte or have unimproved
          sanitation facilities and an additional 45% have access to basic
          sanitation facilities.
        </li>
        <li>
          Almost 9 in 10 households (87%) lack a hand washing facility in their
          premises.
        </li>
        <li>
          81% of all households that dont have handwashing facilities are at a
          higher risk of their drinking water being contaminated.
        </li>
      </ul>
      <p>
        The map on the left shows the two data sources presented in this portal:
      </p>
      <ul>
        <li>household data of 2427 Sierra Leonean households (grey points)</li>
        <li>
          water point data of 1100 water points that were placed by UNICEF
          (yellow points).
        </li>
      </ul>
    </>
  )
}

export default Info
