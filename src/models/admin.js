import * as adminService from '../services/admin';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';

export default {
  namespace: 'admin',
  state: {
    isAuth: true,
    userId: '',
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
        const { data: { count, rowid, role, userName = username } } = yield call(
          adminService.login,
          {
            username,
            password,
          }
        );
        if (!!count) {
          yield put({
            type: 'save',
            payload: {
              userId: rowid,
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
    *createNewArticle({ payload: { values } }, { call, put }) {
      try {
        const data = yield call(adminService.createArticle, values);
        console.log(data);
        // yield put({ type: 'save', payload: { articles } });
      } catch (e) {
        notification.error({
          message: 'Error occurs',
          description: 'Server is offline',
        });
      }
      yield put({ type: 'newArticle', payload: {} });
    },
    *newArticle({ payload: { newArticle = false, forceSubmit = false } }, { put }) {
      yield put({
        type: 'save',
        payload: {
          newArticle,
          forceSubmit,
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
