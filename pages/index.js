import AppLayout from '../components/AppLayout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <AppLayout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.img_container}>
            <img className={styles.img} src='https://imagenes-pages.s3-sa-east-1.amazonaws.com/Gorusuke-Logo+2.png' alt="Logo" />
          </div>
          <h1 className={styles.title}>Devtter</h1>
          <h2 className={styles.subtitle}>Talk about development <br/> with developers</h2>
        </main>
      </div>
    </AppLayout>
  )
}
