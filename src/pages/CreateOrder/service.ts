import request from '@/utils/request';

// 创建订单接口
export function createOrder(data: Record<string, any>) {
  return request('/databank/createOrder', {
    method: 'POST',
    data,
  });
}
//获取平台和销售模式 
export function sourceEnums(data: Record<string, any>) {
  return request('/databank/source-enums', {
    method: 'get',
    params: data,
  });
}
//根据站点获取用户列表 
export function getUserInfoBySite(data: Record<string, any>) {
  return request('/databank/getUserInfoBySite', {
    method: 'post',
    data,
  });
}
//获取所有用户列表 
export function getUserInfo(data: Record<string, any>) {
  return request('/databank/getUserInfo', {
    method: 'post',
    data,
  });
}
//获取df模式的发货仓 
export function getDfDeliveryStore(data: Record<string, any>) {
  return request('/base/getDfDeliveryStore', {
    method: 'get',
    params: data,
  });
}
//获取df模式的配送物流公司
export function getDfDeliveryCompany(data: Record<string, any>) {
  return request('/base/getDfDeliveryCompany', {
    method: 'get',
    params: data,
  });
}
//获取订单币种选项列表 
export function getCurrencyTypes(data: Record<string, any>) {
  return request('/base/getCurrencyTypes', {
    method: 'get',
    params: data,
  });
}
//新增店铺
export function addShop(data: Record<string, any>) {
  return request('/shop/addShop', {
    method: 'post',
    data,
  });
}
//获取店铺信息
export function getShopInfo(data: Record<string, any>) {
  return request('/shop/getShopInfo', {
    method: 'post',
    data,
  });
}