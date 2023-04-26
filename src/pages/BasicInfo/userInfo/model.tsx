import { Effect, Reducer } from 'umi';

export type userInfo = {
  namespace: 'userInfo';
  state: any;
  effects: {

  };
  reducers: {
    save: Reducer;
  };
};
const userInfo: userInfo = {
  namespace: 'userInfo',
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
export default userInfo;
