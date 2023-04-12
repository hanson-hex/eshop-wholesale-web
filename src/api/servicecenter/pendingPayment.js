import request from '@/utils/request'
// 获取订单商品详情
export function goodorderDetail(orderId) {
  return request({
    url: `/order/order/purchase/detail/${orderId}`,
    method: 'get'
  })
}

// 支付订单
export function payPurchase(data) {
  return request({
    url: '/order/order/purchase/pay/' + data,
    method: 'get'
  })
}

// 查询所有订单的
export function buyPageList(data) {
  return request({
    url: `/order/order/purchase/mepur/page`,
    method: 'get',
    params: data
  })
}

// 取消订单
export function cancelPurchase(data) {
  return request({
    url: '/order/order/purchase/cancel/' + data,
    method: 'get'

  })
}

// 订单退款
export function returnPurchase(data) {
  return request({
    url: '/order/order/sale/return/' + data,
    method: 'get'
  })
}

// 获取订单支付状态
export function payResult(data) {
  return request({
    url: `/order/order/purchase/pay/result/${data}`,
    method: 'get'
  })
}

// 发票抬头
export function getInvoiceHeader(data) {
  return request({
    url: `/invoice/buyInfo/get`,
    method: 'get',
    params: data
  })
}

// 确定申请开票
export function riseOpen(data) {
  return request({
    url: `/order/invoice/rise/open`,
    method: 'post',
    data
  })
}

// 通过id查询
export function getPurchaseDetail(data) {
  return request({
    url: '/order/order/purchase/' + data,
    method: 'get'

  })
}
// 快递查询
export function getKuaidi(data) {
  return request({
    url: `/order/kuaidi/page`,
    method: 'get',
    params: data
  })
}

// 获取快递信息
export function expressStep(data) {
  return request({
    url: '/order/express/step',
    method: 'get',
    params: data
  })
}

// 销售:快递信息填入
export function saleKuaidi(data) {
  return request({
    url: `/order/order/sale/kuaidi`,
    method: 'post',
    data
  })
}

// 给对应的商户开票
export function surePrint(data) {
  return request({
    url: `/order/invoice/print`,
    method: 'post',
    data
  })
}
