import request from '@/utils/request'
// 手工上传发票
export function manual(data) {
  return request({
    url: "/order/invoice/manual",
    method: "post",
    contentType: 'blob',
    data
  });
}

// 待开票订单查询
export function busiPage(data) {
  return request({
    url: "/order/invoice/busi/page",
    method: "get",
    params: data,
  });
}

// 打印发票
export function print(data) {
  return request({
    url: "/order/invoice/print",
    method: "post",
    data
  });
}

// 获取订单商品详情

export function goodorderDetail(orderId) {
  return request({
    url: `/order/order/purchase/detail/${orderId}`,
    method: "get"
  });
}
