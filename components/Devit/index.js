import Avatar from "../Avatar"
import styles from "./Devit.module.css"
import { formatRelative } from "date-fns"

const Devit = ({ userName, avatar, content, id, userId, createAt }) => {
  return (
    <article className={styles.article}>
      <Avatar src={avatar} alt={userName} />
      <div className={styles.container}>
        <header>
          <strong className={styles.username}>{userName}</strong>
          <span className={styles.date}>
            {formatRelative(new Date(createAt.seconds * 1000), new Date())}
          </span>
        </header>
        <p className={styles.message}>{content}</p>
      </div>
    </article>
  )
}

export default Devit
