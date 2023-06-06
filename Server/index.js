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
rl.question('是否进行批量上传（y/n）：', async (answer) => {
  // 根据用户输入的命令进行下一步操作
  if (answer === 'y') {
    console.log(colors('green', '开始批量上传'))
    await uploadTheFiles()
  } else {
    console.log(colors('red', '已取消批量上传'))
  }
  // 关闭输入流
  rl.close()
})

async function uploadTheFiles () {
  // 获取文件夹内的文件名和对应的 Base64 值
  const folderPath = path.resolve(__dirname, '../../upload')
  const filesData = getFilesData(folderPath)

  // 根据总数上传文件
  const total = filesData.length

  for (let i = 0; i < total; i++) {
    const fileData = filesData[i]
    // 逐个上传文件
    try {
      await bulkUploads([fileData])
      console.log(colors('bright', `文件上传成功: ${fileData[0].value}`))
    } catch (error) {
      console.error('文件上传失败:', error)
    }
  }

  console.log(colors('bright', `上传完成，共上传 ${total} 个文件`))
}

async function bulkUploads (filesData) {
  return await bulkRowRecords(filesData)
}

function getFilesData (folderPath) {
  try {
    const fileNames = fs.readdirSync(folderPath)
    return fileNames.map((fileName) => {
      const filePath = path.join(folderPath, fileName)
      const fileContent = fs.readFileSync(filePath)
      const base64 = fileContent.toString('base64')
      return new FilesData(fileName, base64).filesData
    })
  } catch (error) {
    console.error('无法读取文件:', error)
    return []
  }
}
