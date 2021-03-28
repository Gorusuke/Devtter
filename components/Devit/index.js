import Avatar from "../Avatar"
import styles from "./Devit.module.css"
import useTimeAgo from "../../hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"

const Devit = ({ userName, avatar, content, id, userId, createAt, img }) => {
  const timeAgo = useTimeAgo(createAt)
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <article className={styles.article} onClick={handleClick}>
      <Avatar src={avatar} alt={userName} />
      <div className={styles.container}>
        <header>
          <strong className={styles.username}>{userName}</strong>
          <Link href={`/status/${id}`}>
            <a>
              <time className={styles.date}>{timeAgo}</time>
            </a>
          </Link>
        </header>
        <p className={styles.message}>{content}</p>
        {img && <img src={img} />}
      </div>
    </article>
  )
}

export default Devit
