import request from '@/utils/request'

// 新增供应商
// export function yccbSupplierAdd(data) {
//   return request({
//     url: `/product/supplier`,
//     method: "post",
//     data
//   });
// }

// 商铺审核
export function auditCompanyEdit(data) {
  return request({
    url: `/shop/shop/audit`,
    method: "put",
    data
  });
}

// 根据状态商铺列表查询
export function auditCompanyList(data) {
  return request({
    url: `/shop/shop/page`,
    method: "get",
    params: data
  });
}

// 商铺详情查询
export function auditCompanyDetail(id) {
  return request({
    url: `/shop/shop/details/${id}`,
    method: "get"
  });
}

// 机构列表查询
export function deptTree() {
  return request({
    // url: `/admin/dept/tree`,
    // url: 'admin/organization/organizationtree',
    url: 'shop/organization/organizationtree',
    method: "get"
  });
}

// 商品审核查询
export function goodsCheckPages(data) {
  return request({
    url: '/product/goodsbase/check/page',
    method: "get",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: data
  });
}

// 商品审批确认
export function goodsCheckSure(data) {
  return request({
    url: '/product/goodsbase/check/enter',
    method: "put",
    data
  });
}
