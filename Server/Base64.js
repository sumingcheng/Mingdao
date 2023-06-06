const fs = require('fs')
const path = require('path')

function getFileBase64 () {
  let filePath = path.resolve(__dirname, '../file/git.png')
  // 读取文件内容
  const fileContent = fs.readFileSync(filePath)
  // 将文件内容转换为 Base64 编码
  return fileContent.toString('base64')
}

module.exports = {
  getFileBase64
}
