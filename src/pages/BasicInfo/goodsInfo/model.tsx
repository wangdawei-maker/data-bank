import { Effect, Reducer } from 'umi';

export type goodsInfo = {
  namespace: 'goodsInfo';
  state: any;
  effects: {

  };
  reducers: {
    save: Reducer;
  };
};
const goodsInfo: goodsInfo = {
  namespace: 'goodsInfo',
  state: {
    addgoddsTable: [],
  },
  effects: {

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
export default goodsInfo;
