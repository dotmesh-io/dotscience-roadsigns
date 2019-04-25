'use strict'

const express = require('express')
const ecstatic = require('ecstatic')
const httpProxy = require('http-proxy')

if(!process.env.TENSORFLOW_HOST) {
  console.error(`TENSORFLOW_HOST environment required`)
  process.exit(1)  
}

var tf = process.env.TENSORFLOW_HOST
var mpx = process.env.MODEL_PROXY_HOST

const App = () => {

  const proxy = httpProxy.createProxyServer({
    
  })

  proxy.on('error', (err, req, res) => {
    console.log('Proxy server error: \n', err);
    res.status(500).end(err.message)
  })

  // the HTTP server
  const app = express()

  app.use('/api', (req, res, next) => {
    proxy.web(req, res, { target: `${mpx}/api` })
  })

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