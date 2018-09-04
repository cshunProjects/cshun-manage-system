import { queryUserList } from '../services/api';

export default {
  namespace: 'cshunUser',

  state: {
    list: [11, 22],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [11,22],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [33,44],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
