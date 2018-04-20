import * as adminService from '../services/admin';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';

export default {
  namespace: 'admin',
  state: {
    isAuth: true,
    username: '',
    role: '',
    error: '',
    articles: [],
    creatingArticle: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *login({ payload: { username, password } }, { call, put }) {
      try {
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
            },
          });
          yield put(routerRedux.push('/admin/articles'));
        }
      } catch (e) {
        notification.error({
          message: 'Error occurs',
          description: 'Server is offline',
        });
      }
    },
    *loadArticles({ payload }, { call, put }) {
      try {
        const { data: articles } = yield call(adminService.fetchArticles);
        yield put({ type: 'save', payload: { articles } });
      } catch (e) {
        notification.error({
          message: 'Error occurs',
          description: 'Server is offline',
        });
      }
    },
    *newArticle({ payload: { newArticle } }, { put }) {
      yield put({
        type: 'save',
        payload: {
          newArticle,
        },
      });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/articles') {
          dispatch({ type: 'loadArticles' });
        }
        if (pathname === '/admin/articles/create') {
          dispatch({ type: 'newArticle', payload: { newArticle: true } });
        }
      });
    },
  },
};
