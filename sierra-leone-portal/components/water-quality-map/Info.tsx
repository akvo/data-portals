import { StatelessComponent } from 'react'

const Info: StatelessComponent = () => {
  return (
    <>
      <h4>Water Quality map</h4>
      <p>
        This map shows the water quality risk levels based on E. coli and MPN
        per 100 ml. (red is very high risk, green is low risk). Additional
        information shows the risk qualification, the MPN level and the E. coli
        upper 95% confidence level.
      </p>
    </>
  )
}

export default Info
