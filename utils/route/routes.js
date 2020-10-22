module.exports = (async () => {
  const fs = require('fs')
  const path = require('path')
  const url = require('url')

  const extnameToMimeListFilePath = './utils/route/mime.json'
  const extnameToMimeList = JSON.parse((await new Promise((resolve, reject) => {
    fs.readFile(extnameToMimeListFilePath, (err, data) => {
      if(err) {
        reject(err)
        return
      }
  
      resolve(data)
      return
    })
  })).toString())

  return {
    static(req, res, staticFolderPath) {
      const query = url.parse(req.url).query
      const pathname = url.parse(req.url).pathname === '/' ? '/index.html' : url.parse(req.url).pathname
      const mime = extnameToMimeList[path.extname(pathname)]
  
      fs.readFile(`${staticFolderPath}${pathname}`, (err, data) => {
        if(err) {
          res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
          res.end('您所访问的页面不存在')
          return
        }
      
        res.writeHead(200, { 'Content-Type': `${mime}` })
        res.write(data)
        res.end()
        return
      })
      return
    }
  }
})()