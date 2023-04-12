import request from '@/utils/request'

// 查询列表
export function getShopPayRecord(data) {
  return request({
    url: `/payment/payeeRecord/getShopPayRecord`,
    method: "get",
    params: data
  });
}

// 手工上传发票
export function manual(data) {
  return request({
    url: "/order/invoice/manual",
    method: "post",
    contentType: 'blob',
    data
  });
}

// 获取销方发票
export function getPage(data) {
  return request({
    url: "/invoice/sellerInfo/get",
    method: "get",
    params: data,
  });
}

// 获取发票
export function updateCon(data) {
  return request({
    url: "/invoice/sellerInfo/update",
    method: "post",
    data,
  });
}

export function saveCon(data) {
  return request({
    url: "/invoice/sellerInfo/save",
    method: "post",
    data,
  });
}
// 获取购方发票
export function getbuyInfo(data) {
  return request({
    url: "/invoice/buyInfo/get",
    method: "get",
    params: data,
  });
}
// 购方发票修改
export function editbuyInfo(data) {
  return request({
    url: "/invoice/buyInfo/update",
    method: "post",
    data,
  });
}
// 卖家开出的发票分页查询 销方
export function sellerPage(data) {
  return request({
    url: "/invoice/invoiceRecord/sellerPage",
    method: "get",
    params: data,
  });
}
// 买家收到的发票分页查询 买方
export function buyerPage(data) {
  return request({
    url: "/invoice/invoiceRecord/buyerPage",
    method: "get",
    params: data,
  });
}
// 发票枚举列表
export function getContentType(data) {
  return request({
    url: "/invoice/invoiceRecord/getContentType",
    method: "get",
    params: data,
  });
}
// 发票枚举列表
export function purchaseDetail(data) {
  return request({
    url: "/order/order/purchase/code/" + data,
    method: "get"
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

// 购买方发票抬头
export function getInvoiceHeader(data) {
  return request({
    url: `/invoice/buyInfo/get`,
    method: "get",
    params: data
  });
}

// 买方抬头信息保存
export function buyInfoSave(data) {
  return request({
    url: `/invoice/buyInfo/save`,
    method: "post",
    data,
  });
}

// 买方抬头信息更新
export function buyInfoUupdate(data) {
  return request({
    url: `/invoice/buyInfo/update`,
    method: "post",
    data,
  });
}

export function MockLogin(data) {
  return request({
    url: `/vue-admin-template/user/login`,
    method: "post",
    data,
  });
}

