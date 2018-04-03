import * as adminService from '../services/admin';

export default {
  namespace: 'admin',
  state: {
    
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    
  },
  subscriptions: {
    
  },
};
