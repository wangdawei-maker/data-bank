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
