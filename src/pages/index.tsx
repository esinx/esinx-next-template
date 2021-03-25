import Head from 'next/head'
import styled from 'styled-components'

const CenterLayout = styled.div`
	display: grid;
	place-items: center;

	width: 100vw;
	height: 100vh;
`

const Home: React.FC<void> = () => (
	<>
		<Head>
			<title>NextJS Template</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<CenterLayout>
			<h1>It works!</h1>
		</CenterLayout>
	</>
)

export default Home
