import Devit from "../../components/Devit"

const DevitPage = (props) => {
  console.info(props)
  return (
    <>
      <Devit {...props} />
    </>
  )
}

export default DevitPage

DevitPage.getInitialProps = (context) => {
  const { query, res } = context
  const { id } = query

  return fetch(`http://localhost:3000/api/devitts/${id}`).then((response) => {
    if (response.ok) return response.json()
    if (res) {
      res.writeHead(301, { Location: "/home" }).end()
    }
  })
}
