import request from '@/utils/request'
// b2b转账
export function saleAccounts(data) {
  return request({
    url: '/order/order/sale/accounts/code',
    method: 'post',
    data
  })
}
// b2b转账确认支付
export function accountsEnter(data) {
  return request({
    url: '/order/order/sale/accounts/enter',
    method: 'post',
    data
  })
}
