import { StatelessComponent } from 'react'

const Info: StatelessComponent = () => {
  return (
    <>
      <h4>Sanitation map</h4>
      <p>
        This map shows three levels of sanitation: improved, unimproved and{' '}
        <em>open defecation</em>, as blue, light grey and green respectively.
        The additional info shows the type of facility, where it flushes to and
        whether the facility is shared.
      </p>
    </>
  )
}

export default Info
