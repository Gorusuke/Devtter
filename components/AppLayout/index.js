import Head from 'next/head'

const AppLayout = ({children}) => {
  return (
    <>
      <Head>
        <title>Devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {children}
      </div>
    </>
  )
}

export default AppLayout
