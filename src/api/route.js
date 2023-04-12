import request from '@/utils/request'

export function getRouteList(params) {
  return request({
    url: '/vue-admin-template/route',
    method: 'get',
    params
  })
}
