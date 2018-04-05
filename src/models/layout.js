export default {
  namespace: 'layout',
  state: {
    collapsed: true
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *toggleSider({ payload: { collapsed } }, { put }) {
      yield put({ type: 'save', payload: { collapsed } });
    }
  },
  subscriptions: {
    
  },
};
