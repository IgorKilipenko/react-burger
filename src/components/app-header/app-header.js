import styles from './app-header.module.css'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import Layout, { HeaderItem as Item } from './header-layout'

const AppHeader = () => (
  <header className={styles.header}>
    <Layout>
      <Item>
        <nav className='flex flex-row'>
          <div>Конструктор</div>
          <div>Лента заказов</div>
        </nav>
      </Item>
      <Item>
        <Logo />
      </Item>

      <Item>Личный кабинет</Item>
    </Layout>
  </header>
)

export default AppHeader
