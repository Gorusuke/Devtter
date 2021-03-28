import { useEffect, useState } from "react"
import AppLayout from "../../../components/AppLayout"
import Button from "../../../components/Button"
import Avatar from "../../../components/Avatar"
import useUser from "../../../hooks/useUser"
import styles from "./Tweet.module.css"
import { addDevit, uploadImage } from "../../../firebase/firebase"
import { useRouter } from "next/router"
import Head from "next/head"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

const ComposeTweet = () => {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [task, setTask] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      // Estados que dicen el estado de la imagen
      let onProgress = () => {}
      let onError = () => {}
      let onComplete = () => {
        console.info("onComplete")
        // recuerpando la url del storage de firebase y guardandola en el estado
        task.snapshot.ref.getDownloadURL().then(setImageUrl)
      }
      // subiendo la imagen al storage de firebase
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleMessage = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  console.info(user)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imageUrl,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.info(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = e.dataTransfer.files[0]

    // subiendo la imagen a el storage de firebase
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  const border =
    drag === DRAG_IMAGE_STATE.DRAG_OVER
      ? "3px dashed #09f"
      : "3px solid transparent"

  return (
    <>
      <AppLayout>
        <Head>
          <title>Devit Create || Devtter</title>
        </Head>
        <section className={styles.devitt_container}>
          {user && (
            <div className={styles.avatar_container}>
              <Avatar src={user.avatar} alt={user.username} />
            </div>
          )}
          <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
              style={{ border: `${border}` }}
              className={styles.textarea}
              placeholder="¿Que esta pasando?"
              value={message}
              onChange={handleMessage}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            ></textarea>
            {imageUrl && (
              <section className={styles.image_container}>
                <button onClick={() => setImageUrl(null)}>X</button>
                <img src={imageUrl} className={styles.image} />
              </section>
            )}
            <div className={styles.button_container}>
              <Button disabled={isButtonDisabled} button2>
                Devittear
              </Button>
            </div>
          </form>
        </section>
      </AppLayout>
    </>
  )
}

export default ComposeTweet
