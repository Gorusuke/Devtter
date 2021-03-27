import { useEffect, useState } from "react"
import AppLayout from "../../components/AppLayout"
import Devit from "../../components/Devit"
import useUser from "../../hooks/useUser"
import styles from "./Home.module.css"
import { fetchLastedDevits } from "../../firebase/firebase"

const Home = () => {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLastedDevits().then((devit) => setTimeline(devit))
    // .then(setTimeline) // Tambien se puede hacer asi
  }, [user])

  return (
    <AppLayout>
      <header className={styles.header}>
        <h2 className={styles.title}>Inicio</h2>
      </header>
      <section className={styles.section}>
        {timeline.map((devit) => (
          <Devit
            avatar={devit.avatar}
            content={devit.content}
            createAt={devit.createAt}
            id={devit.id}
            key={devit.id}
            userId={devit.userId}
            userName={devit.userName}
          />
        ))}
      </section>
      <footer className={styles.footer}>
        <nav className={styles.nav}>Hola</nav>
      </footer>
    </AppLayout>
  )
}

export default Home
