import firebase from "firebase"
import "firebase/firestore"
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBKBZdYMIQLElDMTSpNjhnZnLAPJZHdaB4",
  authDomain: "devtter-1be58.firebaseapp.com",
  projectId: "devtter-1be58",
  storageBucket: "devtter-1be58.appspot.com",
  messagingSenderId: "205274350334",
  appId: "1:205274350334:web:61d66eb3216e0fbf195baf",
  measurementId: "G-NLR38DHS94",
}

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

export const fetchLastedDevits = () => {
  return db
    .collection("devitts")
    .orderBy("createAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createAt } = data
        // ...doc.data(),
        // createAt: doc.createAt,
        return {
          ...data,
          id,
          createAt: +createAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`)
  const task = ref.put(file)
  return task
}
