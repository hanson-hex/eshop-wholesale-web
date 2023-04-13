import request from "@/utils/request";

// 店铺上的商品
export function shopGoodlist(data) {
    return request({
        url: "/product/goodsbase/shop/goods/list",
        method: "get",
        params: data,
    });
}
// 销量排行
export function salesTop(data) {
    return request({
        url: "/product/goodsbase/shop/goods/sales/top",
        method: "get",
        params: data,
    });
}

// 查询分类
export function getGoodClass(data) {
    return request({
        url: "/product/goodsbase/shop/goodsclass/list",
        method: "GET",
        params: data,
    });
}
// 查询商铺得分
export function getshopGrades(data) {
    return request({
        url: `/shop/shop/shopGrades/${data.shopId}`,
        method: "GET",
        params: data,
    });
}

// 查询商铺得分
export function getcertificate(data) {
    return request({
        url: `/shop/shop/certificate/${data.shopId}`,
        method: "GET",
        params: data,
    });
}

//资质下载
// 查询商铺得分
export function download(data) {
    return request({
        url: `/shop/shopcertify/download/${data.shopId}`,
        method: "get",
        responseType: "blob",
    });
}

export function details(data) {
    return request({
        url: `/shop/shop/details/${data.shopId}`,
        method: "get",
        params: data,
    });
}