import { Effect, Reducer } from 'umi';

export type shoopInfo = {
  namespace: 'shoopInfo';
  state: any;
  effects: {

  };
  reducers: {
    save: Reducer;
  };
};
const shoopInfo: shoopInfo = {
  namespace: 'shoopInfo',
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
export default shoopInfo;
