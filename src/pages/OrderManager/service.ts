import request from "@/utils/request";
// 订单分页接口
export function getList(data: Record<string, any>) {
    return request('/candy/orderBack/getOrderInfoBack', {
      method: 'POST',
      data,
      requestType:'form'
    });
  }