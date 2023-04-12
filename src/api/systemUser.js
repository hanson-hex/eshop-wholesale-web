import request from '@/utils/request'

// user

export function fetchList(query) {
  return request({
    // url: '/admin/user/page',
    url: '/member/manage/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    // url: '/admin/user',
    url: '/member/info/create',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: obj
  })
}

export function isExsit(params) {
  return request({
    url: '/admin/user/check/exsit',
    method: 'get',
    params: params
  })
}
