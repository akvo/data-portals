import { StatelessComponent } from 'react'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'

type PageMenu = {
  key: string
  label: string
}

const menus: PageMenu[] = [
  { key: 'water-access', label: 'Water Access' },
  { key: 'water-quality', label: 'Water Quality' },
  { key: 'sanitation', label: 'Sanitation' },
  { key: 'hygiene', label: 'Hygiene' },
  { key: 'guide', label: 'Guide' },
]

const Navigation: StatelessComponent = () => {
  const router = useRouter()
  const activeMenu = router.pathname.replace(/^\//, '')

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[activeMenu]}>
      {menus.map(({ key, label }) => (
        <Menu.Item key={key}>
          <Link href={`/${key}`}>
            <a>{label}</a>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default Navigation
