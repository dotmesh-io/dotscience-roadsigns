'use strict'

const express = require('express')
const ecstatic = require('ecstatic')
const httpProxy = require('http-proxy')


var tf = `http://ds-model.dotscience.net`

if(process.env.TENSORFLOW_HOST) {
  // console.error(`TENSORFLOW_HOST environment required`)
  // process.exit(1)
  tf = process.env.TENSORFLOW_HOST
}

const App = () => {

  const proxy = httpProxy.createProxyServer({
    
  })

  proxy.on('error', (err, req, res) => {
    console.log('Proxy server error: \n', err);
    res.status(500).end(err.message)
  })

  // the HTTP server
  const app = express()

  app.use('/v1', (req, res, next) => {
    proxy.web(req, res, { target: `${tf}/v1` })
  })

  app.use(ecstatic({
    root: `${__dirname}/www`,
  }))

  app.use((req, res, next) => {
    res.status(404)
    res.end(`url ${req.url} not found`)
  })

  app.use((err, req, res, next) => {
    res.status(500)
    res.json(err.toString())
  })

  return app
}

module.exports = App