const {getFileBase64} = require('./Base64')

const filesData = [
  [
    {
      'controlId': '647321200279bf9fdb479429',
      'value': '文本'
    },
    {
      'value': '测试上传',
      'controlId': '647321200279bf9fdb47942b',
      'editType': 1,
      'valueType': 2,
      'controlFiles': [{
        baseFile: getFileBase64(),
        fileName: 'git.png'
      }]
    }
  ]
]

module.exports = filesData
