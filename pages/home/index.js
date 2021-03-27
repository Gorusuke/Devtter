import { useEffect, useState } from "react"
import AppLayout from "../../components/AppLayout"
import Devit from "../../components/Devit"
import useUser from "../../hooks/useUser"
import styles from "./Home.module.css"

const Home = () => {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetch("http://localhost:3000/api/statuses/home_timeline")
        .then((res) => res.json())
        .then((res) => setTimeline(res))
    // .then(setTimeline) // Tambien se puede hacer asi
  }, [user])

  return (
    <AppLayout>
      <header className={styles.header}>
        <h2 className={styles.title}>Inicio</h2>
      </header>
      <section className={styles.section}>
        {timeline.map((devit, i) => (
          <Devit
            key={i}
            avatar={devit.avatar}
            username={devit.username}
            message={devit.message}
            id={devit.id}
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
