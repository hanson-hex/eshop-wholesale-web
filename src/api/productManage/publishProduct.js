import request from '@/utils/request'

// 获取免审商品列表
export function getNotcheckList(data) {
  return request({
    url: '/product/goodsbase/notcheck/page',
    method: 'get',
    params: data
  })
}

// 加入仓库
export function addSku(data) {
  return request({
    url: '/product/stock/sku/add',
    method: 'post',
    data
  })
}

// 获取sku自营商品定价
export function support(data) {
  return request({
    url: '/product/stock/sku/support',
    method: 'get',
    params: data
  })
}

