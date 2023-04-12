import request from '@/utils/request'
// import { getStore } from '@/util/store'
// const user = getStore({ name: 'userInfo' })

// 购物车的勾选
export function goodesCheck(data) {
  return request({
    url: '/order/cart/check',
    method: 'post',
    data
  })
}

// 查询订单的支付二维码

export function getqrCode(data) {
  return request({
    url: `/order/purchase/pay/${data}`,
    method: 'get'
  })
}

// 修改购物车中商品数量
export function putCart(data) {
  return request({
    url: '/order/cart',
    method: 'put',
    params: data
  })
}
// 新增购物车商品（购物车页面用）
export function postCart(data) {
  // data.uuid = user.user_info && user.user_info.uid
  return request({
    url: '/order/cart',
    method: 'post',
    data
  })
}
// 新增购物车商品（商品车页面用）
export function addCart(data) {
  // data.uuid = user.user_info && user.user_info.uid
  return request({
    url: '/order/cart/uc',
    method: 'post',
    data
  })
}
// 通过id查询
export function getCart(data) {
  return request({
    url: '/order/cart',
    method: 'get',
    params: data
  })
}
// 删除购物车产品
export function delCart(data) {
  return request({
    url: '/order/cart/batchDelete',
    method: 'post',
    data
  })
}
// 根据用户id获取购物车信息分页查询
export function getPage(data) {
  return request({
    url: '/order/cart/page',
    method: 'get',
    params: data
  })
}
// 修改快速购买商品数量
export function refreshGoodsQuick(data) {
  return request({
    url: '/order/cart/ucq',
    method: 'post',
    data
  })
}

// 确认订单中的商品列表
export function goodesList(data) {
  return request({
    url: '/product/goodsbase/quick/refresh',
    method: 'post',
    data
  })
}

// 根据用户查询收货信息
export function address(data) {
  return request({
    url: '/order/order/sale/adress',
    method: 'get',
    params: data
  })
}

// 新增采购订单
export function addPurchase(data) {
  return request({
    url: '/order/order/purchase',
    method: 'post',
    data
  })
}
