import { StatelessComponent } from 'react'
import { GetServerSideProps } from 'next'
import { API_URL, MAPBOX_TOKEN } from '../config'
import ClusteredMap from '../components/ClusteredMap'

type Props = {
  sourceUrl: string
  mapboxToken: string
}

const WaterQuality: StatelessComponent<Props> = ({
  sourceUrl,
  mapboxToken,
}) => {
  return (
    <>
      <h1>Water quality</h1>
      <p>
        Ullamcorper dignissim cras tincidunt lobortis. Est lorem ipsum dolor sit
        amet consectetur adipiscing. Tempor commodo ullamcorper a lacus. Morbi
        tristique senectus et netus et. Posuere ac ut consequat semper viverra
        nam libero. Massa vitae tortor condimentum lacinia quis vel eros donec
        ac. Ultricies integer quis auctor elit sed vulputate mi sit amet. Vitae
        congue eu consequat ac felis. Vestibulum rhoncus est pellentesque elit
        ullamcorper dignissim cras. Tortor at risus viverra adipiscing. Neque
        volutpat ac tincidunt vitae semper quis lectus nulla at. Urna id
        volutpat lacus laoreet non. Venenatis tellus in metus vulputate eu.
      </p>

      <p>
        Sapien pellentesque habitant morbi tristique senectus. Senectus et netus
        et malesuada fames ac turpis. Dignissim diam quis enim lobortis
        scelerisque. Praesent elementum facilisis leo vel fringilla est
        ullamcorper. Pellentesque elit eget gravida cum sociis natoque penatibus
        et magnis. Facilisis gravida neque convallis a cras semper auctor neque
        vitae. Netus et malesuada fames ac. Tortor condimentum lacinia quis vel
        eros. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum.
        Urna molestie at elementum eu facilisis sed odio morbi. Urna et pharetra
        pharetra massa massa. Nec ultrices dui sapien eget mi proin sed. Aenean
        sed adipiscing diam donec adipiscing tristique risus nec feugiat.
        Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Dolor sit
        amet consectetur adipiscing. Amet commodo nulla facilisi nullam vehicula
        ipsum a arcu. Eu augue ut lectus arcu bibendum at varius vel pharetra.
        Sed adipiscing diam donec adipiscing tristique risus nec.
      </p>

      <div
        style={{
          height: '50vh',
          minHeight: '500px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <ClusteredMap
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

export default WaterQuality
