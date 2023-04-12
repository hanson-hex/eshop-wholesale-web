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

// 新增商品分类
export function goodsclass(data) {
  return request({
    url: '/product/goodsclass',
    method: 'post',
    data
  })
}

