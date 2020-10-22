const url = require('url')

const str = 'http://www.itying.com?name=zhangsan&age=20'

const parsedInfo = url.parse(str, true)

console.log(parsedInfo.query)