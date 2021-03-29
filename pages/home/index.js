import { useEffect, useState } from "react"
import Devit from "../../components/Devit"
import useUser from "../../hooks/useUser"
import styles from "./Home.module.css"
import { listenLastestDevitt, githubSignOut } from "../../firebase/firebase"
import Link from "next/link"
import Head from "next/head"
import Create from "../../components/icons/Create"
import Homes from "../../components/icons/Homes"
import Button from "../../components/Button"
import Header from "../../components/Header"
import Spinner from "../../components/Spinner"

const Home = () => {
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useUser()

  useEffect(() => {
    setLoading(true)
    let unsubscribe
    if (user) {
      unsubscribe = listenLastestDevitt((newDevitts) => {
        setTimeline(newDevitts)
        setLoading(false)
      })
    }

    return () => unsubscribe && unsubscribe()
    // user && fetchLastedDevits().then((devit) => setTimeline(devit))
    // .then(setTimeline) // Tambien se puede hacer asi
  }, [user])

  return (
    <>
      <Head>
        <title>Home || Devtter</title>
      </Head>
      {loading ? (
        <Spinner spinner2 />
      ) : (
        <>
          <Header>
            <h2 className={styles.title}>Inicio</h2>
            <div className={styles.button_container}>
              <Button button2 onClick={() => githubSignOut()}>
                Sign Out
              </Button>
            </div>
          </Header>
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
                img={devit.img}
              />
            ))}
          </section>
          <nav className={styles.nav}>
            <Link href="/home">
              <a>
                <Homes />
              </a>
            </Link>
            <Link href="/compose/tweet">
              <a>
                <Create />
              </a>
            </Link>
          </nav>
        </>
      )}
    </>
  )
}

export default Home
