import styles from "./Avatar.module.css"

const index = ({ alt, src, text }) => {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={src} alt={alt} />
      {text && <strong>{text || alt}</strong>}
    </div>
  )
}

export default index
