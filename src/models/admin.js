import * as adminService from '../services/admin';

export default {
  namespace: 'admin',
  state: {
    isAuth: false,
    username: '',
    role: '',
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *login({ payload: { username, password } }, { call, put }) {
      const { data: { count, role, userName = username } } = yield call(adminService.login, {
        username,
        password,
      });
      if (!!count) {
        yield put({
          type: 'save',
          payload: {
            username: userName,
            role,
            isAuth: true,
          }
        })
      }
    }
  },
  subscriptions: {
    
  },
};
