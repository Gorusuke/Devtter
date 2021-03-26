import Head from "next/head"
import styles from "./Layout.module.css"

const AppLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  )
}

export default AppLayout
