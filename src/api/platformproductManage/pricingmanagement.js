import request from "@/utils/request";
// 分页查询
export function goodsregionpricerelationpage(data) {
  return request({
    url: `/product/goodsregionpricerelation/page`,
    method: "get",
    params: data,
  });
}

// 删除商品区域定价
export function delgoodsregionpricerelation(id) {
  return request({
    url: `/product/goodsregionpricerelation/${id}`,
    method: "delete",
  });
}

// 自营商品分页查询
export function selfgoodsbase(data) {
  return request({
    url: `/product/goodsbase/self/page`,
    method: "get",
    params: data,
  });
}

// 查询区域定价详情
export function getgoodsregionpricerelation(id) {
  return request({
    url: `/product/goodsregionpricerelation/${id}`,
    method: "get",
  });
}

// 编辑商品区域定价
export function editgoodsregionpricerelation(data) {
  return request({
    url: `/product/goodsregionpricerelation`,
    method: "put",
    data,
  });
}

// 新增商品区域定价
export function addgoodsregionpricerelation(data) {
  return request({
    url: `/product/goodsregionpricerelation`,
    method: "post",
    data,
  });
}

// 获取省组织列表
export function provincetree() {
  return request({
    url: `/shop/organization/provincetree`,
    method: "get",
  });
}

// 查询禁用区域定价组织ID集合
export function regionids(goodsId) {
  return request({
    url: `/product/goodsregionpricerelation/regionids/${goodsId}`,
    method: "get",
  });
}
