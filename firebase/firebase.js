import firebase from 'firebase';
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBKBZdYMIQLElDMTSpNjhnZnLAPJZHdaB4",
  authDomain: "devtter-1be58.firebaseapp.com",
  projectId: "devtter-1be58",
  storageBucket: "devtter-1be58.appspot.com",
  messagingSenderId: "205274350334",
  appId: "1:205274350334:web:61d66eb3216e0fbf195baf",
  measurementId: "G-NLR38DHS94"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// firebase.initializeApp(firebaseConfig)

export default firebase


export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}