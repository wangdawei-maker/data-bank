import request from '@/utils/request';

// 获取销售平台信息
export function getSaleSite(data: Record<string, any>) {
  return request('/wdc-warehouse-service/inventory-adjustment/detail/50', {
    method: 'POST',
    data,
  });
}