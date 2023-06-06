const {AppKey, Sign, WorksheetId} = require('../config')
const http = require('./http')
const {getFileBase64} = require('../Server/Base64')

// 获取列表 POST
function getTheList (val) {
  return http({
    url: 'getFilterRows',
    method: 'post',
    data: {
      appKey: AppKey,
      sign: Sign,
      ...val
    }
  })
}

// 删除行记录 POST
function deleteRow (val) {
  return http({
    url: 'deleteRow',
    method: 'post',
    data: {
      appKey: AppKey,
      sign: Sign,
      ...val
    }
  })
}

// 批量新建行记录 POST
function bulkRowRecords (data) {
  return http({
    url: 'addRows',
    method: 'post',
    data: {
      appKey: AppKey,
      sign: Sign,
      worksheetId: WorksheetId,
      triggerWorkflow: false,
      rows: [[
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
      ],
    },
  })
}

module.exports = {
  getTheList,
  deleteRow,
  bulkRowRecords
}

