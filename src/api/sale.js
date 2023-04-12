import request from '@/utils/request'

// 出售中的商品
export function getgoodsbase(data) {
  return request({
    url: '/product/goodsbase/sale/page',
    method: 'get',
    params: data
  })
}
// 批量下架
export function batchSoldout(data) {
  return request({
    url: '/product/sku/batchSoldout',
    method: 'put',
    data
  })
}

// 单条下架
export function soldout(data) {
  return request({
    url: '/product/stock/batchSoldout',
    method: 'put',
    data
  })
}
