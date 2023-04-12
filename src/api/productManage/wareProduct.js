import request from '@/utils/request'

// 仓库中的商品列表
export function getWarebase(data) {
  return request({
    url: '/product/goodsbase/warehouse/page',
    method: 'get',
    params: data
  })
}
// 批量上架
// export function batchPutaway(data) {
//   return request({
//     url: '/product/stock/sku/batchPutaway',
//     method: 'put',
//     data
//   })
// }

// 单条上架
export function putaway(data) {
  return request({
    url: '/product/stock/batchPutaway',
    method: 'put',
    data
  })
}
