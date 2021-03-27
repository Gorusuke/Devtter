import { useEffect, useState } from "react"
import { authStateChange } from "../firebase/firebase"
import { useRouter } from "next/router"

const useUser = () => {
  const [user, setUser] = useState(undefined)
  const router = useRouter()

  useEffect(() => {
    authStateChange(setUser)
  }, [])

  useEffect(() => {
    user === null && router.push("/")
  }, [user])

  return user
}

export default useUser
