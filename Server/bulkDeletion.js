const {getTheList, deleteRow} = require('../api/xiaoShuo')
const colors = require('colors-console')

init(101)

// 批量删除行记录
async function init (num) {
  let total = Math.ceil(num / 100) || 0
  let counter = 0

  // 定义递归函数
  function bulkTasks () {
    deleteTheRowRecord()
    counter++

    // 判断是否达到执行次数上限
    if (counter < total) {
      setTimeout(bulkTasks, 3000)
    } else {
      console.log(colors('green', `共${total}次，每次间隔3秒`))
    }
  }

  // 开始执行递归打印
  bulkTasks()
}

async function deleteTheRowRecord () {
  let allData = await getList()
  let join = allData.join(',')
  deleteTheRow(join)
}

// 获取列表 POST
async function getList () {
  try {
    const data = {
      worksheetId: '647321200279bf9fdb479428',
      viewId: '646db2c44b798e85aaf41d77',
      pageSize: 100,
      pageIndex: 1,
    }
    const listData = await getTheList(data)
    return listData.data.rows.map(obj => obj.rowid)
  } catch (error) {
    console.error('Failed to get list data:', error)
  }
}

// 删除行记录 POST
async function deleteTheRow (allRowId) {
  try {
    const data = {
      worksheetId: '647321200279bf9fdb479428',
      rowId: allRowId || '',
      triggerWorkflow: false,
    }
    await deleteRow(data)
  } catch (error) {
    console.error('Failed to delete row:', error)
  }
}
