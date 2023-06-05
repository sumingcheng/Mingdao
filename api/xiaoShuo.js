const {AppKey, Sign} = require('../config')
const http = require('./http')

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

module.exports = {
  getTheList,
  deleteRow
}

