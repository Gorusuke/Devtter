import Link from "next/link"
import Devit from "../../components/Devit"
import Header from "../../components/Header"
import ArrowLeft from "../../components/icons/ArrowLeft"

const DevitPage = (props) => {
  // console.info(props)
  return (
    <>
      {/* <Header></Header> */}
      <Devit {...props} />
      <Link href="/home">
        {/* <a><ArrowLeft /></a> */}
        <a
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          Volver a Inicio
        </a>
      </Link>
    </>
  )
}

export default DevitPage

export const getServerSideProps = async (context) => {
  // params, req, res, query
  const { params, res } = context
  const { id } = params

  const response = await fetch(`http://localhost:3000/api/devitts/${id}`)
  if (response.ok) {
    const props = await response.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: "/home" }).end()
  }
}
