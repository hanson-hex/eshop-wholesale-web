import request from '@/utils/request'

// 税务分类编码管理查询
export function goodStaxList(params) {
  return request({
    url: '/product/goodstaxclass/page',
    method: 'get',
    params: params
  })
}

// 获取分类最近五条数据
export function getRecently() {
  return request({
    url: '/product/goodsbase/recently',
    method: 'get'
  })
}

// 上传图片接口
export function uploadImg(params) {
  return request({
    url: '/product/goodsbase/upload',
    method: 'post',
    data: params
  })
}
