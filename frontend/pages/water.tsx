import { StatelessComponent } from 'react'
import { GetServerSideProps } from 'next'
import { API_URL, MAPBOX_TOKEN } from '../config'
import UnclusteredMap from '../components/UnclusteredMap'

type Props = {
  sourceUrl: string
  mapboxToken: string
}

const Water: StatelessComponent<Props> = ({ sourceUrl, mapboxToken }) => {
  return (
    <>
      <h1>Water</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mi sit amet mauris
        commodo quis imperdiet massa. Nulla posuere sollicitudin aliquam
        ultrices sagittis orci a scelerisque purus. Adipiscing elit pellentesque
        habitant morbi. Ultricies mi eget mauris pharetra et. Elit pellentesque
        habitant morbi tristique senectus. Non quam lacus suspendisse faucibus.
        Orci dapibus ultrices in iaculis nunc sed. Ac tortor dignissim convallis
        aenean. Ut sem viverra aliquet eget sit amet tellus cras. Lorem donec
        massa sapien faucibus et molestie. Sapien faucibus et molestie ac
        feugiat sed lectus vestibulum mattis. Cursus vitae congue mauris rhoncus
        aenean. Sit amet mattis vulputate enim nulla. Egestas quis ipsum
        suspendisse ultrices. Nisi quis eleifend quam adipiscing vitae proin.
        Morbi blandit cursus risus at. Fames ac turpis egestas maecenas pharetra
        convallis posuere morbi. Eu turpis egestas pretium aenean pharetra
        magna.
      </p>

      <p>
        Purus ut faucibus pulvinar elementum integer enim neque volutpat.
        Blandit volutpat maecenas volutpat blandit aliquam etiam. Morbi
        tristique senectus et netus et malesuada. Rhoncus dolor purus non enim
        praesent elementum. Tellus rutrum tellus pellentesque eu tincidunt
        tortor aliquam nulla facilisi. Urna nec tincidunt praesent semper
        feugiat nibh sed pulvinar. Ultrices sagittis orci a scelerisque purus
        semper. Neque aliquam vestibulum morbi blandit cursus risus at ultrices.
        Eget sit amet tellus cras adipiscing enim eu. In aliquam sem fringilla
        ut. At elementum eu facilisis sed odio.
      </p>

      <div
        style={{
          height: '50vh',
          minHeight: '500px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <UnclusteredMap
          source={sourceUrl}
          latitude={17.65}
          longitude={-4.5}
          zoom={4.5}
          width="100%"
          height="100%"
          mapboxToken={mapboxToken}
        />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      sourceUrl: API_URL + '/site-points.geojson',
      mapboxToken: MAPBOX_TOKEN,
    },
  }
}

export default Water
