import request from "@/utils/request";

// 获取不同身份
export function getShoparea(data) {
  return request({
    url: `/shop/shoptype/list?status=${data}`,
    method: "get",
  });
}

// 获取不同的商品类型
export function getUserarea() {
  return request({
    url: "/shop/shopscope/list",
    method: "get",
  });
}

export function postShopapply(data) {
  return request({
    url: "/shop/shop/apply",
    method: "post",
    data: data,
  });
}
// 获取发票类型
export function getinvoicetypeList() {
  return request({
    url: "/shop/shop/invoicetype/list",
    method: "get",
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
// 第二步的内容提交
export function postshopSubmit(data) {
  return request({
    url: "/shop/shop/submit",
    method: "post",
    data,
  });
}

// 商户信息提交完成
export function shopFinish(data) {
  return request({
    url: `/shop/shop/finish`,
    method: "post",
    data,
  });
}
