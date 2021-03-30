import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

export default firebase

const mapUserFromFirebase = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const authStateChange = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebase(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
  // .then(user => mapUserFromFirebase(user))
  // .then(mapUserFromFirebase) // Esta es otra forma de devolver la funcion ya que el valor es el mismo
}

export const githubSignOut = async () => {
  try {
    await firebase.auth().signOut()
  } catch (error) {
    console.info(error)
  }
}

export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return db.collection("devitts").add({
    avatar,
    content,
    userId,
    userName,
    img,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

const mapDevittFromFirebase = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createAt } = data
  return {
    ...data,
    id,
    createAt: +createAt.toDate(),
  }
}

export const listenLastestDevitt = (callback) => {
  return db
    .collection("devitts")
    .orderBy("createAt", "desc")
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevitt = docs.map((doc) => mapDevittFromFirebase(doc))
      callback(newDevitt)
    })
}

// export const fetchLastedDevits = () => {
//   return db
//     .collection("devitts")
//     .orderBy("createAt", "desc")
//     .get()
//     .then(({ docs }) => {
//       return docs.map((doc) => mapDevittFromFirebase(doc))
//     })
// }

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`)
  const task = ref.put(file)
  return task
}
