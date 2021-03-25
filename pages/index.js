import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import styles from '../styles/pages/Home.module.css'
import Github from '../components/icons/Github'
import { useCallback, useState } from 'react'
import {loginWithGithub} from '../firebase/firebase'


export default function Home() {

  const [color, setColor] = useState(false)

  const mouseEnter = useCallback(() => setColor(true), [setColor])
  const mouseLeave = useCallback(() => setColor(false), [setColor])

  const handleClick = () => {
    loginWithGithub().then(user => console.info(user)).catch(err => console.info(err))
  }

  return (
    <AppLayout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.img_container}>
            <img className={styles.img} src='https://imagenes-pages.s3-sa-east-1.amazonaws.com/Gorusuke-Logo+2.png' alt="Logo" />
          </div>
          <h1 className={styles.title}>Devtter</h1>
          <h2 className={styles.subtitle}>Talk about development <br/> with developers</h2>
          <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <Button onClick={handleClick}>
              Login with Github
              <Github color={color}/>
            </Button>
          </div>
        </main>
      </div>
    </AppLayout>
  )
}
