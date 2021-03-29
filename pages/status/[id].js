import Devit from "../../components/Devit"

const DevitPage = (props) => {
  // console.info(props)
  return (
    <>
      <Devit {...props} />
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
