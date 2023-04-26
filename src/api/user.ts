import request from '@/utils/request';

// 用户信息
export function getUserDetail() {
  return request({
    url: '/info/detailed',
    headers: {
      isToken: true,
    },
    method: 'get',
  });
}
