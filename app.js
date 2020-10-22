(async () => {
  const http = require('http');
  const routes = await require('./utils/route/routes.js')
  
  const port = 3000
  const hostname = '192.168.1.3'
  
  const server = http.createServer((req, res) => {
    routes.static(req, res, './static')
    console.log(req.method)
    return
  })
  
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
  })
})().catch((err) => {
  console.log(err)
})
