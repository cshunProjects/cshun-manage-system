import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { realAccountLogin, realAccountCheckPermission } from '../services/api';
import { setAuthorityLevel, setAuthorityToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(realAccountLogin, payload);
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: responseOfMe,
      // });
      // Login successfully
      // if (response.status === 'ok') {
      if (!response.error) {
        yield setAuthorityToken(response.token);
        const responseOfMe = yield call(realAccountCheckPermission);
        yield put({
          type: 'changeLoginStatus',
          payload: responseOfMe,
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthorityLevel(payload.adminLevel);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
