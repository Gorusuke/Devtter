import Avatar from "../Avatar"
import styles from "./Devit.module.css"

const Devit = ({ username, avatar, message, id }) => {
  return (
    <article className={styles.article}>
      <Avatar src={avatar} alt={username} />
      <div className={styles.container}>
        <strong className={styles.username}>{username}</strong>
        <p className={styles.message}>{message}</p>
      </div>
    </article>
  )
}

export default Devit
