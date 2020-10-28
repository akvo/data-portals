import { StatelessComponent, useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

const load = () => NProgress.start()
const stop = () => NProgress.done()

const TopProgressBar: StatelessComponent = () => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', load)
    router.events.on('routeChangeComplete', stop)
    router.events.on('routeChangeError', stop)
  }, [])

  return <></>
}

export default TopProgressBar
