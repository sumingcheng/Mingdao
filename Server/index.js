const {bulkRowRecords} = require('../api/xiaoShuo')
const {FilesData} = require('./filesData')
const fs = require('fs')
const path = require('path')
const {print} = require('../utils')
const colors = require('colors-console')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 提示用户输入命令
rl.question('是否进行批量上传（y/n）：', (answer) => {
  // 根据用户输入的命令进行下一步操作
  if (answer === 'y') {
    console.log(colors('green', '开始批量上传'))
    uploadTheFile()
    // 在这里写下一步操作的代码
  } else {
    console.log(colors('red', '已取消批量上传'))
  }
  // 关闭输入流
  rl.close()
})

async function uploadTheFile () {
  // 获取文件夹内 filename 与 base64 和 total
  const folderPath = path.resolve(__dirname, '../../upload')
  let total = getFileCount(folderPath)
  // 根据总数上传文件
  for (let i = 0; i < total; i++) {
    let uploadFiles = []
    let {fileName, base64} = getNameBase64(folderPath, i)
    // 构造上传数据
    let file = new FilesData(fileName, base64)
    uploadFiles.push(file.filesData)
    print(uploadFiles)

    let res = await bulkUploads(uploadFiles)
  }
  console.log(colors('green', `上传完成，共上传 ${total} 个文件`))
}


async function bulkUploads (filesData) {
  return await bulkRowRecords(filesData)
}

function getNameBase64 (filePath, index) {
  try {
    // 读取文件夹中的所有文件名
    const fileNames = fs.readdirSync(filePath)
    if (index >= 0 && fileNames.length) {
      const fileName = fileNames[index]
      const fileContent = fs.readFileSync(`${filePath}/${fileName}`)
      // 将文件内容转换为 Base64 编码
      const base64 = fileContent.toString('base64')

      return {
        fileName,
        base64,
      }
    } else {
      new Error('索引超出范围')
    }
  } catch (error) {
    console.error('无法读取文件:', error)
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



