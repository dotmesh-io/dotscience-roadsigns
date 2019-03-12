const App = require('./app')
const app = App()

const port = process.env.PORT || 80

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
