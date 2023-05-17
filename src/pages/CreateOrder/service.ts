import request from '@/utils/request';

// 创建订单接口
export function createOrder(data: Record<string, any>) {
  return request('/candy/databank/createOrder', {
    method: 'POST',
    data,
  });
}
//获取平台和销售模式 
export function sourceEnums(data: Record<string, any>) {
  return request('/candy/base/source-enums', {
    method: 'get',
    params: data,
  });
}
//根据站点获取用户列表 
export function getUserInfoBySite(data: Record<string, any>) {
  return request('/candy/user/getUserInfoBySite', {
    method: 'post',
    data,
    requestType:'form'
  });
}
//获取所有用户列表 
export function getUserInfo(data: Record<string, any>) {
  return request('/candy/user/getUserInfo', {
    method: 'post',
    data,
    requestType:'form'
  });
}
//获取df模式的发货仓 
export function getDfDeliveryStore(data: Record<string, any>) {
  return request('/candy/base/getDfDeliveryStore', {
    method: 'get',
    params: data,
  });
}
//获取df模式的配送物流公司
export function getDfDeliveryCompany(data: Record<string, any>) {
  return request('/candy/base/getDfDeliveryCompany', {
    method: 'get',
    params: data,
  });
}
//获取订单币种选项列表 
export function getCurrencyTypes(data: Record<string, any>) {
  return request('/candy/base/getCurrencyTypes', {
    method: 'get',
    params: data,
  });
}
//条件查询店铺信息
export function getShopInfoBySelective(data: Record<string, any>) {
  return request('/candy/shop/getShopInfoBySelective', {
    method: 'post',
    data,
    requestType:'form'
  });
}
//新增店铺
export function addShop(data: Record<string, any>) {
  return request('/candy/shop/addShop', {
    method: 'post',
    data,
  });
}
//获取店铺信息
export function getShopInfo(data: Record<string, any>) {
  return request('/candy/shop/getShopInfo', {
    method: 'post',
    data,
    requestType:'form'
  });
}
//添加用户
export function addUser(data: Record<string, any>) {
  return request('/candy/user/addUser', {
    method: 'post',
    data,
  });
}
//获取国家简称
export function getNationInfo(data: Record<string, any>) {
  return request('/candy/user/getNationInfo', {
    method: 'get',
    params: data,
  });
}
//新增商品
export function addItem(data: Record<string, any>) {
  return request('/candy/item/addItem', {
    method: 'post',
    data,
  });
}
//获取商品信息
export function getItemInfo(data: Record<string, any>) {
  return request('/candy/item/getItemInfo', {
    method: 'post',
    data,
    requestType:'form'
  });
}
//获取平台站点信息
export function getPlatformSite(data: Record<string, any>) {
  return request('/candy/base/getPlatformSite', {
    method: 'get',
    params: data,
  });
}
//获取订单的所有状态
export function getOrderStatusInfo(data: Record<string, any>) {
  return request('/candy/base/getOrderStatusInfo', {
    method: 'get',
    params: data,
  });
}