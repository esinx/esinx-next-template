const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const port = parseInt(process.env.PORT, 10) || 5000
const env = process.env.NODE_ENV
const dev = env !== 'production'

const main = async () => {
	try {
		const app = next({
			dir: '.',
			dev,
		})
		const handle = app.getRequestHandler()
		await app.prepare()
		const server = express()
		// proxy to backend
		if (process.env.BACKEND_BASE_URL) {
			const proxy = createProxyMiddleware('/api', {
				target: process.env.BACKEND_BASE_URL,
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/', // remove base path
				},
			})
			server.use('/api', proxy)
		}
		// Default catch-all handler to allow Next.js to handle all other routes
		server.all('*', (req, res) => handle(req, res))
		server.listen(port, (err) => {
			if (err) throw err
			console.log(`[Next] 🚀 Listening on :${port}`)
		})
	} catch (error) {
		console.error(error)
	}
}

main()
