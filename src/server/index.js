const express = require('express')
const cors = require('cors')
const { resolve } = require('path')
const expressStaticGzip = require('express-static-gzip')

const app = express()

const PORT = 3003
app.disable('x-powered-by')
app.use(cors())

// Paths
const projectRoot = resolve('./')
const buildFolder = resolve(projectRoot, 'build')
const distFolder = resolve(projectRoot, 'dist')

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', expressStaticGzip('build', {
    enableBrotli: true,
    orderPreference: ['br']
}))

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require('../../webpack.config.js')

  const compiler = webpack(webpackConfig)
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: false
    })
  )  
  app.use(require('webpack-hot-middleware')(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 1000
  }))
}

// Main route
app.get('/*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(buildFolder + '/index.html')
  } else {
    res.sendFile(distFolder + '/index.html')
  }
})

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.setHeader('Content-Type', 'text/plain')
  res.status(500).send(err.stack)
}

app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Started on port ${PORT}`)
)
