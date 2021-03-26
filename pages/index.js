import AppLayout from "../components/AppLayout"
import Button from "../components/Button"
import Github from "../components/icons/Github"
import { useCallback, useEffect, useState } from "react"
import { loginWithGithub, authStateChange } from "../firebase/firebase"
import Avatar from "../components/Avatar"
import styles from "../styles/pages/Index.module.css"
import Logo from "../components/icons/Logo"

export default function Home() {
  const [color, setColor] = useState(false)
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    authStateChange(setUser)
  }, [])

  const mouseEnter = useCallback(() => setColor(true), [setColor])
  const mouseLeave = useCallback(() => setColor(false), [setColor])

  const handleClick = () => {
    loginWithGithub()
      .then((user) => {
        const { avatar, username, email } = user
        setUser({
          avatar,
          username,
          email,
        })
      })
      .catch((err) => console.info(err))
  }

  return (
    <AppLayout>
      <div className={styles.container}>
        <Logo width="80px" />
        <h1 className={styles.title}>Devtter</h1>
        <h2 className={styles.subtitle}>
          Talk about development <br /> with developers
        </h2>
        <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
          {user === null && (
            <Button onClick={handleClick}>
              Login with Github
              <Github color={color} />
            </Button>
          )}
          {user && user.avatar && (
            <div>
              <Avatar
                src={user.avatar}
                alt={user.username}
                text={user.username}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
