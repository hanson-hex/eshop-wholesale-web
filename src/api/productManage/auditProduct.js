import request from '@/utils/request'

// 获取审核中的列表
export function getcheckList(data) {
  return request({
    url: '/product/goodsbase/checking/page',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: data
  })
}

// 根据商品id获取商品信息
export function getDetail(data) {
  return request({
    url: '/product/goodsbase',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: data
  })
}
// 编辑新增商品信息
export function editGoods(data) {
  return request({
    url: '/product/goodsbase',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

// 新增商品信息
export function addGoods(data) {
  return request({
    url: '/product/goodsbase',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

// 获取单位字典
export function getunitList(data) {
  return request({
    url: '/product/stock/unit',
    method: 'get',
    params: data
  })
}
