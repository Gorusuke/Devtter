import { loginWithGithub } from "../firebase/firebase"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import AppLayout from "../components/AppLayout"
import Button from "../components/Button"
import Github from "../components/icons/Github"
import Logo from "../components/icons/Logo"
import Spinner from "../components/Spinner"
import useUser from "../hooks/useUser"
import styles from "../styles/pages/Index.module.css"
// import Avatar from "../components/Avatar"

export default function Home() {
  const [color, setColor] = useState(false)
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const mouseEnter = useCallback(() => setColor(true), [setColor])
  const mouseLeave = useCallback(() => setColor(false), [setColor])

  const handleClick = () => {
    loginWithGithub().catch((err) => console.info(err))
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
          {user === undefined && <Spinner />}
        </div>
      </div>
    </AppLayout>
  )
}
