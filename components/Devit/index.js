import Avatar from "../Avatar"
import styles from "./Devit.module.css"
import useTimeAgo from "../../hooks/useTimeAgo"

const Devit = ({ userName, avatar, content, id, userId, createAt, image }) => {
  const timeAgo = useTimeAgo(createAt)

  return (
    <article className={styles.article}>
      <Avatar src={avatar} alt={userName} />
      <div className={styles.container}>
        <header>
          <strong className={styles.username}>{userName}</strong>
          <span className={styles.date}>{timeAgo}</span>
        </header>
        <p className={styles.message}>{content}</p>
        {image && <img src={image} />}
      </div>
    </article>
  )
}

export default Devit
