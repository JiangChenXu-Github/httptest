// 1. fs.stat 检测文件还是目录
// 2. fs.mkdir 创建目录
// 3. fs.writeFile 创建写入文件
// 4. fs.appendFile 追加文件
// 5. fs.readFile 读取文件
// 6. fs.readdir 读取目录
// 7. fs.rename 重命名
// 8. fs.rmdir 删除目录
// 9. fs.unlink 删除文件
// 10. fs.createReadStream 创建读取流
// 11. fs.createWriteStream 创建写入流

const fs = require('fs')
const stat = (path) => {
  const promise = new Promise((resolve, reject) => {
    fs.stat(path, (err, data) => {
      if(err) {
        reject(err)
        return
      }
      resolve(data)
      return
    })
  })
  return promise
}

const mkdir = (path) => {
  const promise = new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if(err) {
        reject(err)
        return
      }
      resolve()
      return
    })
  })
  return promise
}

const writeFile = (path, info) => {
  const promise = new Promise((resolve, reject) => {
    fs.writeFile(path, info, (err) => {
      if(err) {
        reject(err)
        return
      }
      resolve()
      return
    })
  })
  return promise
}

const appendFile = (path, info) => {
  const promise = new Promise((resolve, reject) => {
    fs.appendFile(path, info, (err) => {
      if(err) {
        reject(err)
        return
      }
      resolve()
      return
    })
  })
  return promise
}

const readFile = (path) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(path, info, (err, data) => {
      if(err) {
        reject(err)
        return
      }
      resolve(data)
      return
    })
  })
  return promise
}

const readdir = (path) => {
  const promise = new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if(err) {
        reject(err)
        return
      }
      resolve(data)
      return
    })
  })
  return promise
}

const rename = (oldPath, newPath) => {
  const promise = new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if(err) {
        reject(err)
        return
      }
      resolve()
      return
    })
  })
  return promise
}

const rmdir = (path) => {
  const promise = new Promise((resolve, reject) => {
    fs.rmdir(path, (err) => {
      if(err) {
        reject(err)
        return
      }
      resolve()
      return
    })
  })
  return promise
}

const unlink = (path) => {
  const promise = new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if(err) {
        reject(err)
        return
      }
      resolve()
      return
    })
  })
  return promise
}

const rmAll = async (path) => {
  try {
    const statRes = await stat(path)

    if(statRes.isFile()) {
      await unlink(path)
    }else if(statRes.isDirectory()) {
      const readdirData = await readdir(path)

      if(readdirData.length === 0) {
        await rmdir(path)
      }else {
        const promises = readdirData.map((item) => {
          return rmAll(path + '/' + item)
        })
        await Promise.all(promises)
        await rmdir(path)
      }
    }else {
      throw new Error('未知路径类型')
    }

    return
  } catch (err) {
    console.log(err)
  }

}

mkdir('./happy')
rmAll('./happy')


const readStream = fs.createReadStream('./read.txt')
const writeStream = fs.createWriteStream('./write.txt')
let count = 0

readStream.on('data', (data) => {
  writeStream.write(data)
  count += 1
})

readStream.on('end', () => {
  writeStream.end()
  console.log(count)
  console.log('读取完成')
})

readStream.on('error', (err) => {
  console.log(err)
})

writeStream.on('finish', () => {
  console.log('写入完成')
})

const readStreamPipe = fs.createReadStream('./RADWIMPS - 首都危機.mp3')
const writeStreamPipe = fs.createWriteStream('./writeRADWIMPS - 首都危機.mp3')
readStreamPipe.pipe(writeStreamPipe)

module.exports = {
  stat,
  mkdir,
  writeFile,
  appendFile,
  readFile,
  readdir,
  rename,
  rmdir,
  unlink,
  rmAll,
}