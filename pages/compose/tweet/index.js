import { useState } from "react"
import AppLayout from "../../../components/AppLayout"
import Button from "../../../components/Button"
import useUser from "../../../hooks/useUser"
import styles from "./Tweet.module.css"
import { addDevit } from "../../../firebase/firebase"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const ComposeTweet = () => {
  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)

  const handleMessage = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.info(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            placeholder="¿Que esta pasando?"
            value={message}
            onChange={handleMessage}
          ></textarea>
          <div className={styles.button_container}>
            <Button disabled={isButtonDisabled} button2>
              Devittear
            </Button>
          </div>
        </form>
      </AppLayout>
    </>
  )
}

export default ComposeTweet
