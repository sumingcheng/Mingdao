const {bulkRowRecords} = require('../api/xiaoShuo')
const {filesData, FilesData} = require('./filesData')
const fs = require('fs')
const path = require('path')
const {print} = require('../utils')

init()

function init () {
  uploadTheFile()
}

async function uploadTheFile () {
  // 获取文件夹内 filename 与 base64 和 total
  const folderPath = path.resolve(__dirname, '../../upload')
  let uploadFiles = []
  let total = getFileCount(folderPath)
  // 根据总数上传文件
  for (let i = 0; i < 1; i++) {
    let {fileName, Base64} = getNameBase64(folderPath, i)
    // 构造上传数据
    let file = new FilesData(fileName, Base64)
    uploadFiles.push(file.filesData)
  }
  print(uploadFiles)

}

function getNameBase64 (filePath, index) {
  try {
    // 读取文件夹中的所有文件名
    const fileNames = fs.readdirSync(filePath)

    if (index >= 0 && index < fileNames.length) {
      const fileName = fileNames[index]
      const fileContent = fs.readFileSync(`${filePath}/${fileName}`)

      // 将文件内容转换为 Base64 编码
      const base64Content = fileContent.toString('base64')

      return {
        fileName,
        base64Content,
      }
    } else {
      throw new Error('Index out of range')
    }
  } catch (error) {
    console.error('Failed to read file:', error)
    return null
  }
}

function getFileCount (folderPath) {
  try {
    const files = fs.readdirSync(folderPath)
    return files.length
  } catch (error) {
    console.error('Failed to read folder:', error)
    return 0
  }
}


async function bulkUploads () {
  await bulkRowRecords(filesData)
}

