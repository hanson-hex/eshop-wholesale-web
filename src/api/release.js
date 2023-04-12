import request from '@/utils/request'
import { Message } from 'element-ui'

// 获取医药公司列表
export function getList() {
  return request({
    url: '/shop/shop/yygs/list',
    method: 'get'
  })
}

// 获取可执行任务
export function getmatchTask(data) {
  return request({
    url: '/drug/matchTask/get',
    method: 'get',
    params: data
  })
}

// 执行数据导入
export function productDataImport(data) {
  return request({
    url: `/drug/matchData/productDataImport?taskId=${data}`,
    method: 'post'
  })
}
// 匹配数据确认
export function MatchDataConfirm(data) {
  return request({
    url: '/drug/matchData/matchDataConfirm',
    method: 'put',
    data
  })
}

// 执行匹配
export function runMatch(data) {
  return request({
    url: '/drug/matchTask/runMatch',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    params: data
  })
}

// 匹配数据分页
export function matchDataPage(data) {
  return request({
    url: '/drug/matchData/matchDataPage',
    method: 'get',
    params: data
  })
}

// 不匹配数据分页
export function unMatchDataPage(data) {
  return request({
    url: '/drug/matchTask/unMatchDataPage',
    method: 'get',
    params: data
  })
}

// 新增导入任务
export function fileImport(data) {
  return request({
    url: '/drug/matchTask/fileImport',
    method: 'post',
    data
  })
}

// 失败数据导出
export function fileExport(data) {
  return request({
    url: '/drug/matchTask/fileExport',
    method: 'get',
    responseType: 'blob',
    params: data
  }).then(response => {
    // 处理返回的文件流
    const blob = response
    if (blob && blob.size === 0) {
      Message.warning('内容为空，无法下载')
      return
    }
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    // link.download = fileName;
    document.body.appendChild(link)
    link.click()
    window.setTimeout(function() {
      URL.revokeObjectURL(blob)
      document.body.removeChild(link)
    }, 0)
  })
}

// 文件导入模板下载
export function fileTemplate() {
  return request({
    url: '/drug/matchTask/fileTemplate',
    method: 'get',
    responseType: 'blob'
  }).then(response => {
    // 处理返回的文件流
    const blob = response
    if (blob && blob.size === 0) {
      Message.warning('内容为空，无法下载')
      return
    }
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = '模板'
    document.body.appendChild(link)
    link.click()
    window.setTimeout(function() {
      URL.revokeObjectURL(blob)
      document.body.removeChild(link)
    }, 0)
  })
}

// 目标匹配数据查询
export function targetDataPage(data) {
  return request({
    url: `/drug/matchData/targetDataPage?nationalCode=${data}`,
    method: 'get'
  })
}
