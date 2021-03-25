import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import styles from '../styles/pages/Home.module.css'
import Github from '../components/icons/Github'
import { useCallback, useEffect, useState } from 'react'
import {loginWithGithub, authStateChange} from '../firebase/firebase'


export default function Home() {

  const [color, setColor] = useState(false)
  const [user, setUser] = useState(undefined)


  useEffect(() => {
    authStateChange(setUser)
  }, [])

  const mouseEnter = useCallback(() => setColor(true), [setColor])
  const mouseLeave = useCallback(() => setColor(false), [setColor])
  

  const handleClick = () => {
    loginWithGithub().then(user => {
      console.info(user)
      const {avatar, username, email} = user
      setUser({
        avatar,
        username, 
        email
      })

    }).catch(err => console.info(err))
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
            {
              user === null && 
                <Button onClick={handleClick}>
                  Login with Github
                  <Github color={color}/>
                </Button>
            }
            {
              user && user.avatar && 
              <div>
                <img width='120px' src={user.avatar}/>
                <strong>{user.username}</strong>
              </div>
            }
            
          </div>
        </main>
      </div>
    </AppLayout>
  )
}
