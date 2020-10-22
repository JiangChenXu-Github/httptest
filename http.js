const http = require('http')

const hostname = '192.168.1.3'
const port = 3000

const server = http.createServer((req, res) => {
  console.log(req.url)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  res.write('yo') //分块传输
  res.end('<h>你好啊</h>')
})
 
server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}`)
})