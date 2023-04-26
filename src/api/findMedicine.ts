import request from '@/utils/request';
import { SeekDrugParams } from './types/findMedicine';

// 寻药申请列表
export function seekDrugApplyList(data: SeekDrugParams) {
  return request({
    url: '/seekDrug/my/apply/page',
    headers: {
      isToken: false,
    },
    method: 'post',
    data: data,
  });
}
