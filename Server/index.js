const {bulkRowRecords} = require('../api/xiaoShuo')
const filesData = require('./filesData')

init()

function init () {
  bulkUploads()
}

async function bulkUploads () {
  await bulkRowRecords(filesData)
}

