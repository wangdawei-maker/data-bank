import { Effect, Reducer } from 'umi';
import {getList} from './service'
export type orderManager = {
  namespace: 'orderManager';
  state: any;
  effects: {
    asyncGetList: Effect;
  };
  reducers: {
    save: Reducer;
  };
};

const orderManager: orderManager = {
  namespace: 'orderManager',
  state: {
    addgoddsTable: [],
  },
  effects: {
    //订单列表
    *asyncGetList(action, { call }) {
      try {
        const result = yield call(getList, action.payload);
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
export default orderManager;
