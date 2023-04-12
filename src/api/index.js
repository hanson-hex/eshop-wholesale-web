import request from "@/router/axios";

// 绑定商户
export function merchantBind(data) {
  return request({
    url: `/payment/merchant/bind`,
    method: "post",
    data,
  });
}
// 根据商户编码获取手机号码并发送手机号码
export function findPhoneByMerchant(data) {
  return request({
    url: `/payment/merchant/findPhoneByMerchant`,
    method: "get",
    params: data,
  });
}

// 获取省份列表
export function regionProvince() {
  return request({
    url: `/shop/region/province`,
    method: "get",
  });
}
// 获取市列表
export function regionCity(data) {
  return request({
    url: `/admin/region/city/${data}`,
    method: "get",
  });
}
// 获取区列表
export function regionArea(data) {
  return request({
    url: `/admin/region/area/${data}`,
    method: "get",
  });
}
// 供应商分页查询
export function yccbPage(data) {
  return request({
    url: `/product/supplier/yccb/page`,
    method: "get",
    params: data,
  });
}
// 新增供应商
export function yccbSupplierAdd(data) {
  return request({
    url: `/product/supplier`,
    method: "post",
    data,
  });
}
// 修改供应商
export function yccbSupplierEdit(data) {
  return request({
    url: `/product/supplier`,
    method: "put",
    data,
  });
}
// 医药公司查询
export function yygsPage(data) {
  return request({
    url: `/product/supplier/yygs/page`,
    method: "get",
    params: data,
  });
}

// 上下架供应商/医药公司
export function supplierUp(data) {
  return request({
    url: `/product/supplier/up`,
    method: "put",
    data,
  });
}

