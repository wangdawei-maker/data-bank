import { Effect, Reducer } from 'umi';
import {
  createOrder,
  sourceEnums,
  getUserInfoBySite,
  getUserInfo,
  getDfDeliveryStore,
  getDfDeliveryCompany,
  getCurrencyTypes,
  addShop,
  getShopInfo,
  addUser,
  getNationInfo,
  addItem,
  getItemInfo,
  getPlatformSite,
  getOrderStatusInfo
} from './service';
export type CreateOrder = {
  namespace: 'CreateOrder';
  state: any;
  effects: {
    asyncCreateOrder: Effect;
    asyncSourceEnums: Effect;
    asyncGetUserInfoBySite: Effect;
    asyncGetUserInfo: Effect;
    asyncGetDfDeliveryStore: Effect;
    asyncGetDfDeliveryCompany: Effect;
    asyncGetCurrencyTypes: Effect;
    asyncAddShop: Effect;
    asyncGetShopInfo: Effect;
    asyncAddUser:Effect;
    asyncGetNationInfo:Effect;
    asyncAddItem:Effect;
    asyncGetItemInfo:Effect;
    asyncGetPlatformSite:Effect
    asyncGetOrderStatusInfo:Effect
  };
  reducers: {
    save: Reducer;
  };
};
const CreateOrder: CreateOrder = {
  namespace: 'CreateOrder',
  state: {
    addgoddsTable: [],
  },
  effects: {
    //创建订单
    *asyncCreateOrder(action, { call }) {
      try {
        const result = yield call(createOrder, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取平台和销售模式
    *asyncSourceEnums(action, { call }) {
      try {
        const result = yield call(sourceEnums, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //根据站点获取用户列表
    *asyncGetUserInfoBySite(action, { call }) {
      try {
        const result = yield call(getUserInfoBySite, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取所有用户列表 
    *asyncGetUserInfo(action, { call }) {
      try {
        const result = yield call(getUserInfo, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取df模式的发货仓 
    *asyncGetDfDeliveryStore(action, { call }) {
      try {
        const result = yield call(getDfDeliveryStore, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取df模式的配送物流公司
    *asyncGetDfDeliveryCompany(action, { call }) {
      try {
        const result = yield call(getDfDeliveryCompany, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取订单币种选项列表
    *asyncGetCurrencyTypes(action, { call }) {
      try {
        const result = yield call(getCurrencyTypes, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //新增店铺
    *asyncAddShop(action, { call }) {
      try {
        const result = yield call(addShop, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取店铺信息
    *asyncGetShopInfo(action, { call }) {
      try {
        const result = yield call(getShopInfo, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //新增商品
    *asyncAddItem(action, { call }) {
      try {
        const result = yield call(addItem, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //添加用户
    *asyncAddUser(action, { call }) {
      try {
        const result = yield call(addUser, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取商品信息
    *asyncGetItemInfo(action, { call }) {
      try {
        const result = yield call(getItemInfo, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取国家简称
    *asyncGetNationInfo(action, { call }) {
      try {
        const result = yield call(getNationInfo, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取订单的所有状态
    *asyncGetOrderStatusInfo(action, { call }) {
      try {
        const result = yield call(getOrderStatusInfo, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    //获取平台站点信息
    *asyncGetPlatformSite(action, { call }) {
      try {
        const result = yield call(getPlatformSite, action.payload);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default CreateOrder;
