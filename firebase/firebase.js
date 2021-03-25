import firebase from "firebase"
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

// firebase.initializeApp(firebaseConfig)

export default firebase

const mapUserFromFirebase = (user) => {
  console.info(user)
  const { displayName, email, photoURL } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
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
