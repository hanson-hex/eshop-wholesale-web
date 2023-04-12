import request from '@/utils/request'

// 商品一级分类列表
export function goodsclassOne() {
    return request({
        url: '/product/goodsclass/one',
        method: 'get'
    })
}

// 商品二级分类列表
export function goodsclassTwo(id) {
    return request({
        url: '/product/goodsclass/' + id,
        method: 'get'
    })
}

// 免审商品查询
export function notcheck(params) {
    return request({
        url: '/product/goodsbase/notcheck/page',
        method: 'get',
        params: params
    })
}

// 查询基础库的更新状态
export function checkRefresh() {
    return request({
        url: '/drug/dataImport/getSynchronizedStatus',
        method: 'get'
    })
}
// 基础库更新状态
export function getbaseDrug() {
    return request({
        url: '/drug/dataImport/synchronizedData',
        method: 'get'
    })
}